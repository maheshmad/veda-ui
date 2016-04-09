Ext.define('Xedu.view.Login', 
{
    extend: 'Ext.form.Panel',
    xtype: "loginview",
    requires: ['Ext.form.FieldSet', 
               'Ext.form.Password', 
               'Ext.Label', 
               'Ext.Img'],
    config: 
    {
        title: 'Login',
        itemId:'loginformpanelid',        
        layout:
        {
        	type:'vbox',
        	pack:'start',
        	align:'stretch'
        },
        items: [                   
//                    {
//                        xtype: 'image',
//                        src: Ext.Viewport.getOrientation() == 'portrait' ? '../images/logo-polaris.jpg' : '../images/logo-polaris.jpg',
//                        style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:500px;height:150px' : 'width:500px;height:150px'
//                    },
                    {
                        xtype: 'label',
                        html: 'Login failed. Please enter the correct credentials.',
                        itemId: 'signInFailedLabel',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:5px 0px;'
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Login',
                        items: [
                            {
                                xtype: 'textfield',
                                placeHolder: 'Username',
                                label: 'User Name',
                                itemId: 'userNameTextField',
                                name: 'user',
                                required: true                                
                            },
                            {
                                xtype: 'passwordfield',
                                placeHolder: 'Password',
                                label: 'Password',
                                itemId: 'passwordTextField',
                                name: 'pwd',
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
	                          itemId: 'logInButton',
	                          ui: 'confirm',
	                          text: 'Login',
	                          width: '20%',
	                          action:'login',
	                    	  handler: function(btn)
		                      {	                    		 
	                    		 var me = this;                	                             
	                             	                             
//	                             Ext.Viewport.setMasked({
//	                                 xtype: 'loadmask',
//	                                 message: 'Signing In...'
//	                             });
	                             
	                             var loginForm = Ext.ComponentQuery.query('loginview')[0];	                             
	                             var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_SERVICE);
	                             
	                             loginForm.submit({
	                            	 url:authUrl,
	                                 success: function (form,response,data1,data2)
	                                 {	                                    
	                                     var cntrller = Xedu.app.getController('Main');	                                    
	                                     if (response.status == 'SUCCESS') 
	                                     {                        	              	       
	                                     	Xedu.app.setLoggedInUser(response.sessionid);
	                                     	Ext.Viewport.setMasked(false);
	                                     	/*
	                                     	 * Go to home page 
	                                     	 */                        	                    		
	                                     	cntrller.getMainViewNavigation().reset(); /* remove the current login screen from navigation */
	                                     	cntrller.showHome();	
	                                     } 
	                                     else 
	                                     {
	                                    	 var loginView = cntrller.getLoginView();
	                                    	 loginView.showSignInFailedMessage('Invalid UserID/Password');
	                                     	 Ext.Viewport.setMasked(false);
	                                     	
	                                     }
	                                 },
	                                 failure: function (response) 
	                                 {
	                                     me.sessionToken = null;
	                                     Ext.Viewport.setMasked(false);
	                                     Xedu.app.setLoggedInUser('guest');
	                                     Ext.Msg.alert('Failed', 'Server failed to respond! Please try again or contact support!', Ext.emptyFn);
	                                 }
	                                 
	                            	 
	                             });
	                             
	                             
		                      
		                      }/* handler */
                        
                         }
                                                	
                    ]
                }
         ]
    },
        
	 showSignInFailedMessage: function (message) {
	        var label = this.down('#signInFailedLabel');
	        label.setHtml(message);
	        label.show();
	 }	
});