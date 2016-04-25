Ext.define('Xedu.view.classroom.EnrollmentEditForm', 
{
    extend: 'Ext.form.Panel',
    xtype: 'enrollment-edit-form',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Ext.ProgressIndicator',
					'Xedu.model.EnrollmentModel'
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
    		type:'fit'
    	},    	
        items: [                
                {
	                xtype:'container',
	                flex:1,
	                height:'100%',
	                itemId:'enrollment-form-container-id',
	                layout:
	            	{
	            		type:'vbox',
	            		pack:'start'
	            	},   
	                items:[{
			                    xtype:'fieldset',
			                    height:200,
			                    layout:
			                    {
			                    	type:'vbox',
			                    	pack:'start'
			                    },
			                    defaults:
			                    {
			                    	labelAlign:'left',
			                    	flex:1
			                    },
			                    items:[
			                           {
										    xtype: 'textfield',
										    name : 'id',
										    itemId:'enrollmentid-field-id',
										    label:"Enroll ID"
			//							    hidden:true,							   
			                            },
			                           {
										    xtype: 'textfield',
										    name : 'classroomid',
										    itemId:'classroomid-field-id',
										    label:"Class ID"
			//							    hidden:true,							   
			                            },
			                            {
										    xtype: 'textfield',
										    name : 'userId',
										    itemId:'userid-field-id',
										    label:"User ID",
										    listeners:
										    {
										    	focus: function( el, event, eOpts )
										    	{
										    		
										    		Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.users.UserSelection'},
										    				{
										    					title:"Select student",
										    					showBy:el,
										    					width:'45%',
										    					height:'50%',
										    					callbackScope:el,
										    					callbackOnSelect: function(id)
										    					{
										    						el.setValue(id);
										    					}
										    				});
										    	}
										    }
			                            },
			                            {
										    xtype: 'textfield',
										    name : 'id',
										    itemId:'enrolledondate-field-id',
										    label:"Enroll Date"
			//							    hidden:true,							   
			                            },
//			                            {
//										    xtype: 'datepicker',
//										    name : 'enrolledOn',	
//										    label: 'Enrolled On',
//										    height:50,
////										    destroyPickerOnHide: true,		                        					                        
//					                        value: new Date(),
//					                        picker: 
//					                        {
//					                            yearFrom: 1990		
//					                        }
//			                            }
			                           
			                            ]
				   			},
//				   			{
//			                    xtype:'fieldset',
//			                    height:200,
//			                    layout:
//			                    {
//			                    	type:'vbox',
//			                    	pack:'start'
//			                    },
//			                    defaults:
//			                    {
//			                    	labelAlign:'top',
//			                    	flex:1
//			                    },
//			                    items:[			                           
//			                            {
//										    xtype: 'datepicker',
//										    name : 'startDate',	
//										    label:'Start Date',
//										    destroyPickerOnHide: true,		                        					                        
//					                        value: new Date(),
//					                        picker: 
//					                        {
//					                            yearFrom: 1990		
//					                        }
//			                            },
//			                            {
//										    xtype: 'datepicker',
//										    name : 'endDate',	
//										    label:"End Date",
//										    destroyPickerOnHide: true,		                        					                        
//					                        value: new Date(),
//					                        picker: 
//					                        {
//					                            yearFrom: 1990		
//					                        }
//			                            }
//			                           
//			                            ]
//				   			},
				   			{
			                    xtype:'fieldset',
			                    height:50,
			                    layout:
			                    {
			                    	type:'vbox',
			                    	pack:'start'
			                    },
			                    defaults:
			                    {
			                    	labelAlign:'top',
			                    	flex:1
			                    },
			                    items:[	
							   			{
						                    xtype: 'selectfield',
						                    label: 'Status',
						                    labelAlign:'left',
						                    name:'status',
						                    autoSelect:false,
						                    options: [
						                        {text: 'ACTIVE',  value: 'ACTIVE'},
						                        {text: 'SUSPENDED', value: 'SUSPENDED'},
						                        {text: 'INACTIVE', value: 'INACTIVE'},
						                    ]
						                }
							   		]
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
	 					    itemId: 'enrollUserbutton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('enrollment-edit-form').updateEnrollment();			                 						    	
	 					    }
	 					},
	 					{
	 						xtype:'button',
	 						ui:'decline',
	 						text:'Delete',
	 						hidden:true,
	 					    itemId: 'unEnrollButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('enrollment-edit-form').deleteEnrollment();			                 						    	
	 					    }
	 					}
	 			    ]
	 			}  
	   			
	   			],
	   	listeners:
	   	{
	   		show:function()
	   		{
	   			console.log("showing enrollment edit form");
	   		}
	   	}
    },
    
//    onUserIdFieldFocus: function()
//    {
//    	thisView.setCallbackScope(userSelectionPanel);						   
//		thisView.setCallbackOnSelect(userSelectionPanel.onUserSelect);	
//    },
//    
//    onUserSelect: function(id)
//    {
//    	console.log("selected user ="+id);
//    	var useridTextField = this.down('#userid-field-id'); 
//    	useridTextField.setValue(id);		
//    },
    
    
    /*
     * upload form
     */
    updateEnrollment: function()
	{
		var enrollmentForm = this;
    	var fields = enrollmentForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl +id;
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	enrollmentForm.submit(
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
                    	var enrollmentlistpanel = Ext.ComponentQuery.query("enrollments-list-panel list");
                    	enrollmentForm.reset();
                    	if (enrollmentlistpanel && enrollmentlistpanel[0])
                    		enrollmentlistpanel[0].getStore().load();
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
	deleteEnrollment: function()
    {
    	var enrollmentDetailsForm = this;
    	var fields = enrollmentDetailsForm.getFields();
    	var id = fields['id'].getValue();
    	if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Delete operation not available");
    	}
    	
    	var enrollmentName = fields['title'].getValue() +" " + fields['subTitle'].getValue();
    	
    	Ext.Msg.confirm("Delete Enrollment?", 
    				"Are you sure you want to delete the enrollment <br />id:"+id+"<br /> Name:"+enrollmentName, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			enrollmentDetailsForm.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API)+id,
			    	                            	 method:'DELETE',
			    	                            	 progress: progressIndicator,	
			    	                                 success: function (form,response,data)
			    	                                 {	                                    			    	                                     
			    	                                	 Ext.Msg.alert(response.status,response.msg);
			    	                                	 var configListPanel = Ext.ComponentQuery.query("enrollments-list-panel list");
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
