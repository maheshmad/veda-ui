Ext.define('Xedu.view.ChangePassword', 
{
    extend: 'Ext.Panel',
    xtype: "change-pswd-view",
    requires: ['Ext.form.FieldSet', 
               'Ext.form.Password',
               'Xedu.CommonUtils',
               'Ext.Label', 
               'Ext.Img'],
    config: 
    {
        title: 'Change Password',
        itemId:'change-password-form-panel-id',
        authToken:null,
        layout:
        {
        	type:'fit',
        	pack:'center',
        	align:'stretch'
        },        
        items:[
               {
            	   xtype:'formpanel', 
            	   layout:
                   {
	                   	type:'vbox',
	                   	pack:'center',
//	                   	align:'stretch'
                   },
                   scrollable:true,                   
			       items: [                   
			//                    {
			//                        xtype: 'image',
			//                        src: Ext.Viewport.getOrientation() == 'portrait' ? '../images/logo-polaris.jpg' : '../images/logo-polaris.jpg',
			//                        style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:500px;height:150px' : 'width:500px;height:150px'
			//                    },
			                    {
			                        xtype: 'label',
			                        html: '',
			                        itemId: 'msgLabel',
			                        hidden: true,
			                        hideAnimation: 'fadeOut',
			                        showAnimation: 'fadeIn',
			                        style: 'color:#990000;margin:5px 0px;'
			                    },                   
			                    {
			                        xtype: 'fieldset',
			                        title: 'Change Password',
			                        itemId:'change-password-fieldset-id',
			                        items: [                            
										{
										    xtype: 'passwordfield',
			//							    placeHolder: 'Change authorization token',
										    label: 'Auth Token',
										    itemId: 'pswd-chg-authtoken-id',
										    name: 'pswdChgAuthToken',
										    required: true
										},
			                            {
			                                xtype: 'passwordfield',
			                                placeHolder: 'Password',
			                                label: 'New Password',
			                                itemId: 'new-password-id',
			                                name: 'newpswd',
			                                required: true
			                            },
			                            {
			                                xtype: 'passwordfield',
			                                placeHolder: 'Password',
			                                label: 'Confirm Password',
			                                itemId: 'new-password-confirm-id',
			                                name: 'newpswdconfirm',
			                                required: true
			                            }
			                            
			                        ]
			                    },                    
			                    {                    	
			                    	xtype: 'panel',                        
			                        title: '',                        
			                        layout: 
			                        {
				                         pack: 'center',
				                         type: 'hbox'
			                        },
			                        items: [                         
			                         {
				                          xtype: 'button',
				                          itemId: 'chgPswdButton',
				                          hidden:false,
				                          ui: 'confirm',
				                          text: 'Change Password',
				                          width: '20%',
				                    	  handler: function(btn)
					                      {	                    		 
				                    		  this.up('change-pswd-view').changePassword();		                             		                      
					                      }/* handler */
			                       
			                         }	
				                    ]
				                }
			         ]
			         
			        
               }
            ]
    },
    
    
    setAuthToken: function(token)
    {
    	console.log("setting token = "+token); 
    	this.authToken = token;
    	this.down("#pswd-chg-authtoken-id").setValue(token);
    },
    
	showMessage: function (status, msg) 
	{
	    var label = this.down('#msgLabel');
	    label.setHtml(status+" - "+msg);
	    label.setHidden(false);
	},
	    
     /*
      * change password
      */
     changePassword: function()
     {
    	 var me = this;
    	 var chgPasswordForm = this.down('formpanel');	                             
         var authUrl = Xedu.Config.getUrl(Xedu.Config.CHG_PASSWORD_SERVICE);
         Ext.Viewport.setMasked(true);
         chgPasswordForm.submit({
			    	 url:authUrl,
			         success: function (form,response)
			         {	                                    
			        	 Ext.Viewport.setMasked(false);
			        	 var cntrller = Xedu.app.getController('Main');	                                    
			             if (response.status == 'SUCCESS') 
			             {                        	              	       			             	
			             	/*
			             	 * Go to home page 
			             	 */
			            	Ext.Msg.alert(response.status,response.msg,function()
			            			{
					            		cntrller.getMainViewNavigation().reset(); /* remove the current login screen from navigation */
						             	cntrller.redirectTo('view/Login');	
			            			});			             			             	
			             } 
			             else 
			             {	            	 
			            	 Xedu.CommonUtils.checkServiceError(response);
			            	 me.showMessage(response.status,response.msg);	             		             	
			             }
			         },
			         failure: function (form,response) 
			         {
			             Ext.Viewport.setMasked(false);
			             Xedu.CommonUtils.checkServiceError(response);
			             me.showMessage(response.status,response.msg);
			         }
			         
			    	 
			     });
    	 
     
     }             	
     	
	 
});