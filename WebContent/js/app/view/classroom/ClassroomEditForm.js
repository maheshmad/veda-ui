Ext.define('Xedu.view.classroom.ClassroomEditForm', 
{
    extend: 'Ext.form.Panel',
    xtype: 'classroom-edit-form',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Ext.ProgressIndicator',
					'Xedu.model.ClassroomModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
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
	 					    	this.up('classroom-edit-form').updateClassroom();			                 						    	
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
	 					    	this.up('classroom-edit-form').deleteClassroom();			                 						    	
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
////	 					    	if (this.up('classrooms-list-panel'))
////	 					    		this.up('classroom-edit-form').hide();
////	 					    		
//	 					    }
//	 					}
	 			    ]
	 			}  
	   			
	   			],
	   	listeners:
	   	{
	   		show:function()
	   		{
	   			
	   		}
	   	}
    },
    
    /*
     * load classroom
     */
    loadClassroom: function(id)
    {
    	var classroomDetailsForm = this;
    	var fields = classroomDetailsForm.getFields();
    	
    	console.log("Loading classroom id ="+id);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API)+id,
            method: 'GET',
            progress: progressIndicator,			
            headers: { 'Content-Type': 'application/json' },				            
            success: function(response, conn, options, eOpts) 
            {
                var result = Ext.JSON.decode(response.responseText);
		    	
                /*
                 * use the json to create records.
                 */
                var classroomRecord = Ext.create('Xedu.model.ClassroomModel', result.classroom);
                /*
                 * set the data 
                 */
                classroomDetailsForm.setRecord(classroomRecord);
                classroomDetailsForm.down("#deleteChangesButton").setHidden(false);

		    	
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
    updateClassroom: function()
	{
		var classroomForm = this;
    	var fields = classroomForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl +id;
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	classroomForm.submit(
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
                    	var classroomlistpanel = Ext.ComponentQuery.query("classrooms-list-panel list");
                    	classroomForm.reset();
                    	if (classroomlistpanel && classroomlistpanel[0])
                    		classroomlistpanel[0].getStore().load();
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
    deleteClassroom: function()
    {
    	var classroomDetailsForm = this;
    	var fields = classroomDetailsForm.getFields();
    	var id = fields['id'].getValue();
    	if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Delete operation not available");
    	}
    	
    	var classroomName = fields['title'].getValue() +" " + fields['subTitle'].getValue();
    	
    	Ext.Msg.confirm("Delete Classroom?", 
    				"Are you sure you want to delete the classroom <br />id:"+id+"<br /> Name:"+classroomName, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			classroomDetailsForm.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API)+id,
			    	                            	 method:'DELETE',
			    	                            	 progress: progressIndicator,	
			    	                                 success: function (form,response,data)
			    	                                 {	                                    			    	                                     
			    	                                	 Ext.Msg.alert(response.status,response.msg);
			    	                                	 var configListPanel = Ext.ComponentQuery.query("classrooms-list-panel list");
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
