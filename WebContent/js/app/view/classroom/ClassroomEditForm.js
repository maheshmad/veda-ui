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
    	 /* 
    	  * previewonly show in a non editable 
    	  * dataview format
    	  */
    	previewOnly:true,
    	layout:
    	{
    		type:'vbox',
    		pack:'start'
    	},    	
        items: [
                {                	
	               	xtype:'dataview',
	               	itemId:'preview-classroom-details-id',
	               	autoDestroy:true,
	               	hidden:true,
	               	flex:1,
	               	store:
	               	{
	               		model:'Xedu.model.ClassroomModel',
	               	},	               	
	                itemTpl: ['<h1><b>id:</b> {lastName},{id}</h1>',
	                          '<p><b>course id :</b> {courseRecordId}</p>',
	                          '<p><b>name :</b> {name}</p>',
	                          '<p><b>title :</b> {title}</p>',
	                          '<p><b>subTitle :</b> {subTitle}</p>',
	                          '<p><b>description :</b> {description}</p>'	                                              
	                          ]                        		    	   			
                },
                {
	                xtype:'container',
	                flex:1,
	                itemId:'classroom-form-container-id',
	                layout:
	            	{
	            		type:'vbox'
	            	},   
	                items:[{
			                    xtype:'fieldset',
			                    height:	170,		                    
			                    layout:
			                    {
			                    	type:'vbox',
			                    	pack:'start'
			                    },
			                    defaults:
			                    {
//			                    	labelAlign:'left',
			                    	height:50,
			                    },
			                    items:[
			                           {
										    xtype: 'textfield',
										    name : 'id',
										    label:"ID",
										    hidden:true,							   
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
				               	height:60,	                    	
				               	items:[
						               	    {
											    xtype: 'textfield',
											    name : 'courseRecordId',
											    itemId:'course-record-id-field-id',
											    label:"Course Id",
											    placeHolder:'Please select course',
											    listeners:
											    {
											    	focus: function( el, event, eOpts )
											    	{
											    		
											    		Xedu.CommonUtils.showOverlay2(
											    				{	xtype: 'courses-list-panel',										    				
											    					title:"Select student",
											    					width:'35%',
											    					height:'50%',
											    					modal:true,
													                autoDestroy:true,
													                hideOnMaskTap: true,
											    					callbackScope:el,
											    					callbackOnSelect: function(id)
											    					{
											    						el.setValue(id);										    						
											    					}
											    				},el);
											    	}
											    }
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
				             }]
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
							ui:'decline',
							text:'Edit',
						    itemId: 'editFormButton',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('classroom-edit-form').togglePreviewAndEdit(true);			                 						    	
						    }
						},
						{
							xtype:'button',
							ui:'light',
							text:'Cancel Edit',
						    itemId: 'cancelEditFormButton',	
						    hidden:true,
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('classroom-edit-form').togglePreviewAndEdit(false);			                 						    	
						    }
						},
	 					{
	 						xtype:'button',
	 						ui:'confirm',
	 						text:'Save',
	 					    itemId: 'saveChangesButton',
	 					    hidden:true,
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
     * show preview details only
     */
    togglePreviewAndEdit: function(showEdit)
    {
    	console.log("showing only preview ="+this.getPreviewOnly());
    	if (!showEdit)
    	{    		
    		this.down('#preview-classroom-details-id').setHidden(false);
    		this.down('#classroom-form-container-id').setHidden(true);
    		this.down('#cancelEditFormButton').setHidden(true);
    		this.down('#editFormButton').setHidden(false);
    		this.down('#saveChangesButton').setHidden(true);
//    		this.down('toolbar').setHidden(true);    		
    	}
    	else
    	{
    		this.down('#preview-classroom-details-id').setHidden(true);
    		this.down('#classroom-form-container-id').setHidden(false);
    		this.down('#cancelEditFormButton').setHidden(false);
    		this.down('#editFormButton').setHidden(true);
    		this.down('#saveChangesButton').setHidden(false);
//    		this.down('toolbar').setHidden(false);
    	}
    },
    
    /*
     * load classroom
     */
    loadClassroom: function(id)
    {
    	var classroomDetailsForm = this;
    	var fields = classroomDetailsForm.getFields();
    	var previewPanel = this.down('dataview');
    	    	
    	this.togglePreviewAndEdit();
    	
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
                /*
                 * set data to preview panel
                 */
                previewPanel.setRecord(classroomRecord);
		    	
            },
            failure: function(conn, response, options, eOpts) 
            {
            	Xedu.CommonUtils.checkServiceError(response);
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
//                    	classroomForm.reset();
                    	if (classroomlistpanel && classroomlistpanel[0])
                    		classroomlistpanel[0].getStore().load();
                    } 
                    else;
				},
				failure: function(form, response) 
				{
                    Xedu.CommonUtils.checkServiceError(response);
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
