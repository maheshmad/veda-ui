Ext.define('Xedu.view.slides.ContentUpload', 
{
	extend:'Ext.form.Panel',
	xtype:'content-upload',	
	requires: [		    		    		    	           
	           'Ext.field.File'
		    ],
    config: 
    {
	    title:"Upload Slides",
	    height:400,
	    topicid:null,
	    scrollable:true,
	    layout:
	    {
	    	type:'fit',
	    	pack:'start',
	    	align:'center'
	    },
	    items: [
	            {
	            	xtype:'container',
	            	itemId:'formcontainer-id',
	            	hidden:false,
	            	height:400,
			        items:[{
				            	xtype: 'fieldset',
				            	title: 'Content Upload',
				            	items: [
									{
										xtype: 'textfield',
										label: "topic id",
										name: 'topicid',
										itemId:"topicid-field"
									},
				                	{
				                    	xtype: 'filefield',
				                    	label: "Upload slides:",
				                    	name: 'slidecontent',
				                    	accept: 'pptx'
				                	}
				            	]
				        	},
				        	{
			                      xtype: 'button',
			                      itemId: 'uploadSlideButton',
			                      ui: 'confirm',
			                      text: 'Upload',
			                      width: '20%',
			                	  handler: function(but)
			                	  {
			                		  Ext.ComponentQuery.query('content-upload')[0].uploadFile();
			                	  }
			                 }]
	            },
	            {
	            	xtype:'container',
	            	itemId:'processing-container-id',
	            	hidden:true,
	            	layout:
	            	{
	            		type:'vbox',
	            		pack:'center',
	            		align:'center'	            		
	            	},
	            	items:[{
	            				xtype:'image',
	            				width:300,
	            				height:300,
	            				src:'resources/loading/processing.gif'	            				
	            			},
	            			{
	            				label:'Processing...',
	            				flex:1	
	            			}
	            	]	            	
	            }
    		]
    },
    
    setTopicid: function(topicid)
    {
    	this.topicid = topicid;
    	console.log("setting topic edit form topicid = "+topicid);
    	this.down("#topicid-field").setValue(topicid);
    },
    
    getTopicid: function()
    {
    	return this.topicid;    	
    },
    
    uploadFile: function()
    {
    	var me = this; 
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");        
        var uploadApiUrl = Xedu.Config.getUrl(Xedu.Config.SLIDE_CONTENT_UPLOAD);        
        this.submit({
			       	 	url:uploadApiUrl,
			       	 	method:'POST',
			       	 	scope:this,
			       	 	progress: progressIndicator,	
			       	 	xhr2: true,
			       	 	waitMsg: 'Uploading your file...',
			       	 	success: function(form, response) 
						{							
			       	 		Xedu.CommonUtils.checkServiceError(response);					                                     
		                    if (response.status == 'SUCCESS') 
		                    {                        	              	                                           	
			                   	 /*
			                   	  * show processing window
			                   	  */
			                   	 Ext.Msg.alert("SUCCESS","File successfully saved for processing <br> Proceeding to file processing<br /> This may take some time depending on your file size", function(){
			                   		 me.down("#processing-container-id").setHidden(false);
				                   	 me.down("#formcontainer-id").setHidden(true);
				                   	 me.processFile(response.fileid);
			                   	 });			                   	 
		                    } 
		                    else;
						},
						failure: function(form, response) 
						{							                                    
							Xedu.CommonUtils.checkServiceError(respObj);
						}                 	 
        			});
        
    },
    
    /**
     * 
     */
    processFile: function(fileid)
    {
    	var me = this;     	
        var uploadApiUrl = Xedu.Config.getUrl(Xedu.Config.SLIDE_GENERATE);   
        uploadApiUrl = uploadApiUrl.replace("{topicid}",this.getTopicid());
        uploadApiUrl = uploadApiUrl.replace("{uploadedfileid}",fileid);
        /*
         * perform request
         */
        Ext.Ajax.request({
			       	 	url:uploadApiUrl,
			       	 	method:'GET',
			       	 	scope:this,			       	 	
			       	 	xhr2: true,
			       	 	waitMsg: 'Processing your file...',
			       	 	success: function(resp, el, form) 
						{							
			       	 		var response = Ext.JSON.decode(resp.responseText);
			       	 		Xedu.CommonUtils.checkServiceError(response);					                                     
		                    if (response.status == 'SUCCESS') 
		                    {                        	              	                                           	
			                   	 /*
			                   	  * show processing window
			                   	  */
		                    	Xedu.CommonUtils.closeOverlay();
			                   	 Ext.Msg.alert("SUCCESS","File successfully processed",function()
			                   			 {
			                   		 		
			                   			 });			                   	 
		                    } 
		                    else;
		                    		                    
						},
						failure: function(resp) 
						{							                                    
							var response = Ext.JSON.decode(resp.responseText);
							Xedu.CommonUtils.checkServiceError(response);
							Xedu.CommonUtils.closeOverlay();
						}                 	 
        			});
    }
    
});