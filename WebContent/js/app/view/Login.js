Ext.define('Xedu.view.Login', 
{
    extend: 'Ext.form.Panel',
    xtype: "loginview",
    requires: ['Ext.form.FieldSet', 
               'Ext.form.Password',
               'Xedu.CommonUtils',
               'Ext.Label', 
               'Ext.Img'],
    config: 
    {
        title: 'Login',
        itemId:'loginformpanelid',
        initiateLogout:false,
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
                        html: '',
                        itemId: 'show-msg',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:5px 0px;'
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Login',
                        itemId:'login-fieldset',
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
                    	xtype: 'container',                        
                        layout: 
                        {
	                        pack: 'center',
	                        type: 'vbox',
	                        align:'center'	                        
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
	                    		  Ext.ComponentQuery.query('loginview')[0].login();		                             		                      
		                      }/* handler */
                        
                         },
                         {
	                          xtype: 'button',
	                          itemId: 'resetPswdButton',
	                          hidden:false,
	                          ui: 'confirm',
	                          text: 'Reset Password',
	                          width: '20%',
	                    	  handler: function(btn)
		                      {	                    		 
	                    		  Ext.ComponentQuery.query('loginview')[0].changePassword();		                             		                      
		                      }/* handler */
                       
                         }	
	                    ]
	                }
         ],
         
         listeners:[
                    {
                    	show:function(thisView)
                    	{
                    		console.log("showing login...");
                    		if (thisView.getInitiateLogout())
                    			thisView.logout();
                    	}
                    }
                    ]
    },
        
	showMessage: function (status, msg) 
	{
	    var label = this.down('#show-msg');
	    label.setHtml(status+" - "+msg);
	    label.setHidden(false);
	},
	/*
	 * login
	 */ 	     
    login: function()
    {
    	 var me = this;
    	 var loginForm = Ext.ComponentQuery.query('loginview')[0];	                             
         var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_SERVICE);
    	 
    	 loginForm.submit({
	    	 url:authUrl,
	         success: function (form,response,data1,data2)
	         {	                                    
	        	 console.log("login successfull.....");
	        	 Ext.Viewport.setMasked(false);
	        	 var cntrller = Xedu.app.getController('Main');	                                    
	             if (response.status == 'SUCCESS') 
	             {                        	              	       
	             	Xedu.app.setLoggedInUser(response.sessionid);
	             	Ext.Viewport.setMasked(false);
	             	/*
	             	 * check if password needs to be updated
	             	 */
	             	console.log("checking change password....."+response.userInfo.changePswd);
	             	if (response.sessionInfo && response.userInfo.changePswd)
	             	{
	             		console.log("redirecting to change password...");
	             		cntrller.redirectTo("update/password/"+response.sessionInfo.id);
	             	}
	             	else
	             	{
		             	/*
		             	 * Go to home page 
		             	 */                        	                    			             	
		             	cntrller.getMainViewNavigation().reset(); /* remove the current login screen from navigation */
		             	cntrller.showHome();
	             	}
	             } 
	             else 
	             {	            	 
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
     },
     /*
      * logout
      */
     logout: function()
     {
    	Xedu.app.setLoggedInUser("");    	
    	me.showMessage("","Successfully logged out");	
//    	cntrller.getMainViewNavigation().reset();
//    	
//     	Ext.Viewport.setMasked({
// 			xtype:'loadmask',
// 			message:'Please wait while we log you out.....',
// 			style:'color:white'
// 				
//     	});	                	
     	
     	/* ajax logout */
//     	var authUrl = Xedu.Configuration.getUrl(Xedu.Configuration.AUTH_REST_SERVICE);
//        Ext.Ajax.request(
//        {
//             url: authUrl,
//             method: 'post',
//             params: 
//             {
//                 action:'logout'
//             },                       
//             callback: function()
//             {                        	
//             	Xedu.app.getController('Main').getMainViewNavigation().reset();
//             	Xedu.app.getController('Main').redirectTo('view/Login');
//             	Ext.Viewport.setMasked(false);                        	
//             }
//         });
    	 
     
     },
     
     /*
      * change password
      */
     changePassword: function()
     {
    	 var cntrller = Xedu.app.getController('Main');
    	 cntrller.redirectTo('update/password/12121231212');
     
     }             	
     	
	 
});