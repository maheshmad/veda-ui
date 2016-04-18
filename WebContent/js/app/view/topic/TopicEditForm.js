Ext.define('Xedu.view.topic.TopicEditForm', 
{
    extend: 'Ext.form.Panel',
    xtype: 'topic-edit-form',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Ext.ProgressIndicator',
					'Xedu.model.TopicModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	chapterid:null,
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
							    name : 'chapterid',
							    itemId:"chapterid-field",
							    label:"ChapterID"
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
	 					    	this.up('topic-edit-form').updateTopic();			                 						    	
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
	 					    	this.up('topic-edit-form').deleteTopic();			                 						    	
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
////	 					    	if (this.up('topics-list-panel'))
////	 					    		this.up('topic-edit-form').hide();
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
//	   			thisView.down("#chapterid-field").setValue(thisView.getChapterid());
	   		}
	   	}
    },
    
    /*
     * override set function to set the form
     */
    setChapterid: function(chapterid)
    {
    	this.chapterid = chapterid;
    	console.log("setting in topic edit form chapterid = "+chapterid);
    	this.down("#chapterid-field").setValue(chapterid);
    },
    
    /*
     * load topic
     */
    loadTopic: function(id)
    {
    	var topicDetailsForm = this;
    	var fields = topicDetailsForm.getFields();
    	
    	console.log("Loading topic id ="+id);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.TOPIC_API)+id,
            method: 'GET',
            progress: progressIndicator,			
            headers: { 'Content-Type': 'application/json' },				            
            success: function(response, conn, options, eOpts) 
            {
                var result = Ext.JSON.decode(response.responseText);		    	
                /*
                 * use the json to create records.
                 */
                var topicRecord = Ext.create('Xedu.model.TopicModel', result.topic);
                /*
                 * set the data 
                 */
                topicDetailsForm.setRecord(topicRecord);
                topicDetailsForm.down("#deleteChangesButton").setHidden(false);

		    	
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
    updateTopic: function()
	{
		var topicForm = this;
    	var fields = topicForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.TOPIC_API);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl +id;
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	topicForm.submit(
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
                    	var topiclistpanel = Ext.ComponentQuery.query("topics-list-panel list");
                    	topicForm.reset();
                    	if (topiclistpanel && topiclistpanel[0])
                    		topiclistpanel[0].getStore().load();
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
    deleteTopic: function()
    {
    	var topicDetailsForm = this;
    	var fields = topicDetailsForm.getFields();
    	var id = fields['id'].getValue();
    	if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Delete operation not available");
    	}
    	
    	var topicName = fields['title'].getValue() +" " + fields['subTitle'].getValue();
    	
    	Ext.Msg.confirm("Delete Topic?", 
    				"Are you sure you want to delete the topic <br />id:"+id+"<br /> Name:"+topicName, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			topicDetailsForm.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.TOPIC_API)+id,
			    	                            	 method:'DELETE',
			    	                            	 progress: progressIndicator,	
			    	                                 success: function (form,response,data)
			    	                                 {	                                    			    	                                     
			    	                                	 Ext.Msg.alert(response.status,response.msg);
			    	                                	 var configListPanel = Ext.ComponentQuery.query("topics-list-panel list");
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
