Ext.define('Xedu.view.slides.ContentUpload', 
{
	extend:'Ext.form.Panel',
	xtype:'content-upload',	
	requires: [		    		    		    
	           'Xedu.store.SlidesListStore',
	           'Ext.field.File'
		    ],
    config: 
    {
	    title:"Upload Slides",
	    height:400,
	    items: [
	            {
	            	xtype:'container',
			        items:[{
				            	xtype: 'fieldset',
				            	title: 'Content Upload',
				            	items: [
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
	            }
    		]
    },
    
    uploadFile: function()
    {
    	var me = this;                	                             
         
//        Ext.Viewport.setMasked({
//            xtype: 'loadmask',
//            message: 'Uploading ...'
//        });
        
        var uploadApiUrl = Xedu.Config.getUrl(Xedu.Config.SLIDE_CONTENT_UPLOAD);        
        this.submit({
			       	 	url:uploadApiUrl,
			       	 	method:'POST',
			       	 	scope:this,
			       	 	waitMsg: 'Uploading your file...',
			            callback: function (response) 
			            {
			             	Ext.Viewport.setMasked(false);
			             	var contentUploadResponse = Ext.JSON.decode(response.responseText);
			             	console.log("upload response ="+contentUploadResponse);
			               
			            }                  	 
        			});
        
    }
    
});