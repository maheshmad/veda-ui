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
        	pack:'center',
        	align:'stretch'
        },
        items: [
                    //{
                    //    xtype: 'image',
                    //    src: Ext.Viewport.getOrientation() == 'portrait' ? '../images/logo-polaris.jpg' : '../images/logo-polaris.jpg',
                    //    style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:500px;height:150px' : 'width:500px;height:150px'
                    //},
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
                        layout: {
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
	                             	                             
	                             Ext.Viewport.setMasked({
	                                 xtype: 'loadmask',
	                                 message: 'Signing In...'
	                             });

	                             var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_SERVICE);
	                             Ext.Ajax.request({
	                                 url: authUrl,
	                                 method: 'post',
	                                 form:'loginformpanelid',
	                                 success: function (response) 
	                                 {
	                                     var loginResponse = Ext.JSON.decode(response.responseText);
	                                     var cntrller = this.BCSUI.app.getController('Main');
	                                     var loginView = cntrller.getLoginView();
	                                     if (loginResponse.auth == 'SUCCESS') 
	                                     {                        	              	       
	                                     	BCSUI.app.setLoggedInUser(loginResponse.authenticatedUser);
	                                     	loginView.setMasked(false);
	                                     	/*
	                                     	 * Go to home page 
	                                     	 */                        	                    		
	                                     	cntrller.getMainViewNavigation().reset(); /* remove the current login screen from navigation */
	                                     	cntrller.showHome();	
	                                     } 
	                                     else 
	                                     {
	                                     	loginView.showSignInFailedMessage('Invalid UserID/Password');
	                                     	loginView.setMasked(false);
	                                     	
	                                     }
	                                 },
	                                 failure: function (response) 
	                                 {
	                                     me.sessionToken = null;
	                                     alert('Server failed to respond! Please contact support!');
	                                 },
	                                 callback: function()
	                                 {
	                                	 Ext.Viewport.setMasked(false);
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