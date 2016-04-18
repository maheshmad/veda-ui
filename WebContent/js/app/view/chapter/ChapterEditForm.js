Ext.define('Xedu.view.chapter.ChapterEditForm', 
{
    extend: 'Ext.form.Panel',
    xtype: 'chapter-edit-form',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Ext.ProgressIndicator',
					'Xedu.model.ChapterModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	courseid:null,
    	scrollable:true,    	
    	layout:
    	{
    		type:'vbox'
    	},    	
        items: [                
                {
                    xtype:'fieldset',
                    flex:2,	
                    layout:
                    {
                    	type:'vbox',
                    	pack:'start'
                    },
                    defaults:
                    {
                    	labelAlign:'top'
                    },
                    items:[
                           {
							    xtype: 'textfield',
							    name : 'id',
							    label:"ID"
//							    hidden:true,							   
                            },
                            {
							    xtype: 'textfield',
							    name : 'courseid',
							    itemId:"courseid-field",
							    label:"CourseID"
//							    hidden:true,							   
                            },
                            {
							    xtype: 'textfield',
							    name : 'name',
							    label:"Name"
                            },
                            {
							    xtype: 'textfield',
							    name : 'title',	
							    label:"Title"
                            },
                            {
							    xtype: 'textfield',
							    name : 'subTitle',	
							    label:"Sub Title"
                            }
                            ]
	   			},
	   			{
	               	xtype:'fieldset',
	               	layout:'fit',
	               	flex:1,			                    	
	               	items:[
									{
									    xtype: 'textareafield',
									    label: 'Description',
									    labelAlign:'top',
									    name : 'description'
									}
												                    	       
	               	       ]
	             },
	             {
	 			    docked: 'bottom',
	 			    xtype: 'toolbar',
	 			    ui:'dark',
	 			    title:'',
	 			    layout:
	 			    {
	 			    	type:'hbox',
	 			    	pack:'center'
	 			    },
	 			    items: 
	 			    [								
	 					{
	 						xtype:'button',
	 						ui:'confirm',
	 						text:'Save',
	 					    itemId: 'saveChangesButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('chapter-edit-form').updateChapter();			                 						    	
	 					    }
	 					},
	 					{
	 						xtype:'button',
	 						ui:'decline',
	 						text:'Delete',
	 						hidden:true,
	 					    itemId: 'deleteChangesButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('chapter-edit-form').deleteChapter();			                 						    	
	 					    }
	 					}
//	 					,
//	 					{
//	 						xtype:'button',
//	 						ui:'neutral',
//	 						text:'Cancel',
//	 						hidden:false,
//	 						scope:this,
//	 					    itemId: 'cancelChangesButton',						            
//	 					    handler: function (but,action,eOpts) 
//	 					    {
////	 					    	if (this.up('chapters-list-panel'))
////	 					    		this.up('chapter-edit-form').hide();
////	 					    		
//	 					    }
//	 					}
	 			    ]
	 			}  
	   			
	   			],
	   	listeners:
	   	{
	   		show:function(thisView)
	   		{
//	   			thisView.down("#courseid-field").setValue(thisView.getCourseid());
	   		}
	   	}
    },
    
    /*
     * override set function to set the form
     */
    setCourseid: function(courseid)
    {
    	this.courseid = courseid;
    	console.log("setting in chapter edit form courseid = "+courseid);
    	this.down("#courseid-field").setValue(courseid);
    },
    
    /*
     * load chapter
     */
    loadChapter: function(id)
    {
    	var chapterDetailsForm = this;
    	var fields = chapterDetailsForm.getFields();
    	
    	console.log("Loading chapter id ="+id);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.CHAPTER_API)+id,
            method: 'GET',
            progress: progressIndicator,			
            headers: { 'Content-Type': 'application/json' },				            
            success: function(response, conn, options, eOpts) 
            {
                var result = Ext.JSON.decode(response.responseText);
		    	
                /*
                 * use the json to create records.
                 */
                var chapterRecord = Ext.create('Xedu.model.ChapterModel', result.chapter);
                /*
                 * set the data 
                 */
                chapterDetailsForm.setRecord(chapterRecord);
                chapterDetailsForm.down("#deleteChangesButton").setHidden(false);

		    	
            },
            failure: function(conn, response, options, eOpts) 
            {
            	Xedu.CommonUtils.checkServiceError(resp);
            }
        });
    },
    
    /*
     * upload form
     */
    updateChapter: function()
	{
		var chapterForm = this;
    	var fields = chapterForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.CHAPTER_API);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl +id;
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	chapterForm.submit(
		{
				url:restUrl,
       	 		method:restMethod,		
				progress: progressIndicator,				
				success: function(form, response) 
				{
					var maincntrller = Xedu.app.getController('Main');					                                    
                    Ext.Viewport.setMasked(false);
                    Xedu.CommonUtils.checkServiceError(response);					                                     
                    if (response.status == 'SUCCESS') 
                    {                        	              	                                           	
	                   	 /*
	                   	  * load the created user
	                   	  */
                    	Ext.Msg.alert("SUCCESS",response.msg);
                    	var chapterlistpanel = Ext.ComponentQuery.query("chapters-list-panel list");
                    	chapterForm.reset();
                    	if (chapterlistpanel && chapterlistpanel[0])
                    		chapterlistpanel[0].getStore().load();
                    } 
                    else;
				},
				failure: function(form, response) 
				{
                    Xedu.CommonUtils.checkServiceError(resp);
				}
		});
    	
		
	},
	
	/**
	 * delete user
	 */
    deleteChapter: function()
    {
    	var chapterDetailsForm = this;
    	var fields = chapterDetailsForm.getFields();
    	var id = fields['id'].getValue();
    	if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Delete operation not available");
    	}
    	
    	var chapterName = fields['title'].getValue() +" " + fields['subTitle'].getValue();
    	
    	Ext.Msg.confirm("Delete Chapter?", 
    				"Are you sure you want to delete the chapter <br />id:"+id+"<br /> Name:"+chapterName, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			chapterDetailsForm.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.CHAPTER_API)+id,
			    	                            	 method:'DELETE',
			    	                            	 progress: progressIndicator,	
			    	                                 success: function (form,response,data)
			    	                                 {	                                    			    	                                     
			    	                                	 Ext.Msg.alert(response.status,response.msg);
			    	                                	 var configListPanel = Ext.ComponentQuery.query("chapters-list-panel list");
		    	                                    	 if (configListPanel && configListPanel[0])
		    	                                    		 configListPanel[0].getStore().load();								                                    	 
			    	                                    
			    	                                 },
			    	                                 failure: function (el,resp,p) 
			    	                                 {			                                    			    	                                   	                                    
			    	                                     Xedu.CommonUtils.checkServiceError(resp);
			    	                                 }
			    	                                 
			    	                            	 
			    	                             });
			    		}
			    	});
    	    	
    	
    }
    
    
    
    
});
