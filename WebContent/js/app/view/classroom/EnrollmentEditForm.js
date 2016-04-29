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
					'Xedu.field.DateTextField',
					'Xedu.view.users.UsersList',
					'Xedu.model.EnrollmentModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	scrollable:true, 
    	title:'Enroll a new Student',
    	
    	/**
    	 * @cfg {string} enrollmentid
    	 * this is used to capture the enrollment id
    	 */
    	enrollmentid:null,
    	/**
    	 * @cfg {string} classroomid
    	 * this is used to capture the classroom id
    	 */
    	classroomid:null,
    	/**
    	 * @cfg {string} userRecordId
    	 * this is the userid of the student to be enrolled
    	 */
    	userRecordId:null,
    	/**
    	 * @cfg {Boolean} showPreview
    	 * this should be used if preview of the enrollment record is supposed to be displayed first
    	 * Default: false
    	 * 
    	 */
    	showPreview:false,
    	
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
										    label:"Class ID",
										    placeHolder:'Please select the class',
			//							    hidden:true,							   
			                            },			                    
			                            {
										    xtype: 'textfield',
										    name : 'userRecordId',
										    itemId:'user-record-id-field-id',
										    label:"User Record Id",
										    placeHolder:'Please select the user',
										    listeners:
										    {
										    	focus: function( el, event, eOpts )
										    	{
										    		
										    		Xedu.CommonUtils.showOverlay2(
										    				{	xtype: 'users-list-panel',										    				
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
			                            },
			                            {
										    xtype: 'datetextfield',
										    name : 'enrolledOn',
										    itemId:'enrolledondate-field-id',
										    dateFormat:'Y-m-d',
										    label:"Enroll Date (YYYY-MM-DD)",
										    placeHolder:'YYYY-MM-DD',
										    value:new Date()
										    
			//							    hidden:true,							   
			                            },
			                            
			                           
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
						                    name:'enrollStatus',
						                    autoSelect:false,
						                    placeHolder:'Please select the status',
						                    options: [
						                        {text: 'ACTIVE',  value: 'ACTIVE'},
						                        {text: 'SUSPENDED', value: 'SUSPENDED'},
						                        {text: 'CLOSED', value: 'CLOSED'},
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
	 					    itemId: 'editEnrollButton',						            
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
	   		show:function(thisView)
	   		{
	   			console.log("showing enrollment edit form");
	   			thisView.setDataToForm();
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
    
    setDataToForm: function()
    {
    	this.down('#enrollmentid-field-id').setValue(this.getEnrollmentid());
    	this.down('#classroomid-field-id').setValue(this.getClassroomid());
    	if (this.getUserRecordId() != 'new')
    		this.down('#user-record-id-field-id').setValue(this.getUserRecordId());
    	
    	this.loadEnrollmentDetails();
    },
    
    /*
     * load the 
     */
    loadEnrollmentDetails: function()
    {
    	console.log("about to load enrollment info id ="+this.getEnrollmentid());
    	if (this.getEnrollmentid() == null || this.getEnrollmentid() == '')
    		return;
    	
    	me = this;
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API)+me.getEnrollmentid(),
				            method: 'GET',
				            headers: { 'Content-Type': 'application/json' },	
							progress: progressIndicator,				
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);			    		    	
				                /*
				                 * use the json to create records.
				                 */
				                var enrollmentRecord = Ext.create('Xedu.model.EnrollmentModel', result.enrollment);
				                
				                /*
				                 * set the data 
				                 */				                					                			    		    
				                me.setRecord(enrollmentRecord);
				                
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
    updateEnrollment: function()
	{
		var enrollmentForm = this;
    	var fields = enrollmentForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API);
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
//                    	enrollmentForm.reset();
                    	if (enrollmentlistpanel && enrollmentlistpanel[0])
                    		enrollmentlistpanel[0].getStore().load();
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
