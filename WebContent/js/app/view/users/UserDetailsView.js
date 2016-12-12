Ext.define('Xedu.view.users.UserDetailsView', 
{
    extend: 'Ext.TabPanel',
    xtype: 'user-details-view',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Xedu.view.users.UserEnrolledClassesList',
					'Xedu.model.UserModel',					
					'Xedu.model.UserImageInfoModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	plain:true,
    	ui:'neutral',
    	scrollable:true,
    	userid:null,
//    	layout:
//    	{
//    		type:'fit'
//    	},
    	defaults:
    	{
    		styleHtmlContent: true          
        },
        items: [
                
//			{
//			    docked: 'top',
//			    xtype: 'titlebar',
//			    ui:'neutral',
//			    title:'',
//			    layout:
//			    {
//			    	pack:'right'
//			    },
//			    defaults:
//			    {
//			    	ui:'plain'
//			    },
//			    items: 
//			    [								
//			        	
//			    ]
//			},
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
//			    defaults:
//			    {
//			    	ui:'plain'
//			    },
			    items: 
			    [								
					{
						xtype:'button',
						ui:'confirm',
						text:'Save',
					    itemId: 'saveChangesButton',						            
					    handler: function (but,action,eOpts) 
					    {
					    	Ext.ComponentQuery.query('user-details-view')[0].submitNewUser();			                 						    	
					    }
					},
					{
						xtype:'button',
						ui:'decline',
						text:'Delete',
					    itemId: 'deleteChangesButton',						            
					    handler: function (but,action,eOpts) 
					    {
					    	Ext.ComponentQuery.query('user-details-view')[0].deleteUser();			                 						    	
					    }
					}
			    ]
			},
			{
					xtype:'user-enrolled-classes-list',
					title:'Enrolled Classes'
			},
            {				
					xtype:'panel',
					title:"user details",
					layout:
	                {
		                   	type:'fit',
//		                   	pack:'center',
//		                   	align:'center'
	                },
	                scrollable : true,
//	                {
//	                    direction     : 'vertical',
//	                    directionLock : true
//	                },	                  
					items:[{				
				            	xtype:'formpanel',
				            	title:'Personal Details',            	
				            	itemId:'user-personal-info-details-form',
				            	scrollable : true,
//				                {
//				                    direction     : 'vertical',
//				                    directionLock : true
//				                },	
				            	layout: 
				            	{
				            		type:'vbox',
//				            		align:'stretch',
//				            		pack:'start'
				            	},            	
				            	items:[
										{
											xtype: 'fieldset',
										    title: 'User Login',
										    instructions: 'User ',
										    layout:'fit',
										    items: [
												        {
												            xtype: 'textfield',
												            name : 'id',
												            label: 'id',						            
												        },
												        {
												            xtype: 'textfield',
												            name : 'userId',
												            label: 'User ID'
												        },
												        {
												            xtype: 'textfield',
												            name : 'emailId',
												            label: 'Email ID'
												        },
												        {
										                    xtype: 'selectfield',
										                    label: 'Role',
										                    name:'userrole',
										                    autoSelect:false,
										                    options: [
										                        {text: 'ADMIN',  value: 'ADMIN'},
										                        {text: 'PARENT', value: 'PARENT'},
										                        {text: 'STUDENT', value: 'STUDENT'},
										                        {text: 'PRINCIPAL', value: 'PRINCIPAL'},
										                        {text: 'TEACHER', value: 'TEACHER'}
										                    ]
										                },
										                {
												            xtype: 'textfield',
												            label : 'Last Updated By',
												            name: 'updatedBy'
												        },
				//								        {
				//								            xtype: 'textfield',
				//								            label : 'Last Updated On',
				//								            name: 'lastUpdatedDateTime'
				//								        },
												        {
										                    xtype: 'datepickerfield',
										                    label : 'Last Updated On',
										                    name: 'lastUpdatedDateTime'
										                }
												        
												        
												    ]
										},
										{
											xtype: 'fieldset',
								            title: 'About You',
								            layout:'fit',
								            instructions: 'User name/dob',
								            items: [
								                {
								                    xtype: 'textfield',
								                    name : 'firstName',
								                    label: 'First Name'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'middleName',
								                    label: 'Middle Name'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'lastName',
								                    label: 'Last Name'
								                }
								                
								                
								            ]
										},
										{
											xtype: 'fieldset',
								            title: 'Address',
								            layout:'fit',
								            instructions: 'User contact address',
								            items: [
								                {
								                    xtype: 'textfield',
								                    name : 'addressLine1',
								                    label: 'Street Line 1 '
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'addressLine2',
								                    label: 'Street Line 2 '
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'city',
								                    label: 'City'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'state',
								                    label: 'State'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'country',
								                    label: 'Country'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'postalcode',
								                    label: 'Postal Code'
								                }
								                
								            ]
										},
										{
											xtype: 'fieldset',
								            title: 'Contact Info',
								            layout:'fit',
								            instructions: 'Contact Info',
								            items: [
								                {
								                    xtype: 'textfield',
								                    name : 'cellphone',
								                    label: 'Cell phone '
								                },
								                {
									                xtype: 'togglefield',
									                name: 'okToText',
									                label: 'Recieve Text Alerts?'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'landlinephone',
								                    label: 'Land phone'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'officephone',
								                    label: 'Office phone'
								                },
								                {
								                    xtype: 'textfield',
								                    name : 'officephoneExt',
								                    label: 'Office phone Ext'
								                }
								              
								            ]
										}
										
							]
						}
					]            	
            }
            
        ]
        
    },
    
    /**
     * load user details 
     * 
     */
    loadUserDetails: function(id)
    {
    	var userDetailsFormPanel = this.down("formpanel");
    	var userDetailsHeaderFormPanel = Ext.ComponentQuery.query('user-details-header-view')[0];
    	var userEnrolledClassesPanel = this.down('user-enrolled-classes-list');
    	    	
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.USER_SERVICE)+"/"+id,
				            method: 'GET',
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
			    		    	
				                /*
				                 * use the json to create records.
				                 */
				                var userRecord = Ext.create('Xedu.model.UserModel', result.user);
				                var userImageInfoRecord = Ext.create('Xedu.model.UserImageInfoModel', result.profileImageInfo);				                
				                /*
				                 * set the data 
				                 */
				                userDetailsFormPanel.setRecord(userRecord);		
				                /* enrolled classes */
				                userEnrolledClassesPanel.setUserid(result.user.id);
				                userEnrolledClassesPanel.loadEnrolledClasses();
				                /* header panel */
				                if (userDetailsHeaderFormPanel)
				                {
				                	userDetailsHeaderFormPanel.setUserImageInfoDetails(result.profileImageInfo);
				                	userDetailsHeaderFormPanel.setUserDetails(userRecord);				                	
				                }
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
				        });
    	
  
    	
    },
    
    /**
     * 
     * create new user form
     */
    createNewUserForm: function()
    {
    	var userDetailsFormPanel = this.down("formpanel");
    	userDetailsFormPanel.reset();
    	var userDetailsHeaderPanel = this.up("user-mgmt-main-view").down("user-details-header-view").clearPanel();    	
    	
    },
    
    /**
     * 
     * submit new user
     * 
     */
    submitNewUser: function()
    {
    	var userDetailsFrom = Ext.ComponentQuery.query('#user-personal-info-details-form')[0];	
    	var fields = userDetailsFrom.getFields();
    	var me = this;
    	var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.USER_SERVICE);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl + "/" +id;
    	}
    	Ext.Viewport.mask({msg:"Updating user...Please wait!"});	
    	userDetailsFrom.submit({
                            	 url:restUrl,
                            	 method:restMethod,
                                 success: function (form,response,data)
                                 {	                                    
                                     var maincntrller = Xedu.app.getController('Main');					                                    
                                     Ext.Viewport.setMasked(false);
                                     Xedu.CommonUtils.checkServiceError(response);					                                     
                                     if (response.status == 'SUCCESS') 
                                     {                        	              	       
                                    	 Ext.Msg.alert('Success', response.msg, Ext.emptyFn);
                                    	 var configListPanel = Ext.ComponentQuery.query("users-list-panel");
                                    	 if (configListPanel && configListPanel[0])
                                    		 configListPanel[0].getStore().load();
                                    	 /*
                                    	  * load the created user
                                    	  */
                                    	 me.loadUserDetails(response.user.id);
                                     } 
                                     else;
                                 },
                                 failure: function (el,resp,p) 
                                 {			                                    
                                     Ext.Viewport.setMasked(false);			                                     
                                     Xedu.CommonUtils.checkServiceError(resp);
                                 }
                                 
                            	 
                             });
    },
    
    /*
     * 
     * delete user
     */
    deleteUser: function()
    {
    	var userDetailsFrom = Ext.ComponentQuery.query('#user-personal-info-details-form')[0];
    	var fields = userDetailsFrom.getFields();
    	var id = fields['id'].getValue();
    	var fullname = fields['firstName'].getValue() +" " + fields['lastName'].getValue();
    	
    	Ext.Msg.confirm("Delete User?", 
    				"Are you sure you want to delete record <br />id:"+id+"<br /> Name:"+fullname, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			Ext.Viewport.mask({msg:"Deleting user...Please wait!"});	
			    	    	userDetailsFrom.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.USER_SERVICE)+"/"+id,
			    	                            	 method:'DELETE',
			    	                                 success: function (form,response,data)
			    	                                 {	                                    
			    	                                     var maincntrller = Xedu.app.getController('Main');					                                    
			    	                                     Ext.Viewport.setMasked(false);
			    	                                     Xedu.CommonUtils.checkServiceError(response);					                                     
			    	                                                          	              	       
		    	                                    	 Ext.Msg.alert(response.status, response.msg, Ext.emptyFn);
		    	                                    	 var configListPanel = Ext.ComponentQuery.query("users-list-panel");
		    	                                    	 if (configListPanel && configListPanel[0])
		    	                                    		 configListPanel[0].getStore().load();								                                    	 
			    	                                    
			    	                                 },
			    	                                 failure: function (el,resp,p) 
			    	                                 {			                                    
			    	                                     Ext.Viewport.setMasked(false);			                                     
			    	                                     Xedu.CommonUtils.checkServiceError(resp);
			    	                                 }
			    	                                 
			    	                            	 
			    	                             });
			    		}
			    	});
    	    	
    	
    }
    
    
});
