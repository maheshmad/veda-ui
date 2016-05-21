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
	                    		  this.up("loginview").login();		                             		                      
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
	                    		  this.up("loginview").forgotPassword();		                             		                      
		                      }/* handler */
                       
                         }	
	                    ]
	                }
         ],
         
         listeners:{
                    	show:function(thisView)
                    	{
                    		console.log("showing login view...");                    		
                    		thisView.checkSession();
                    	}
                    }
                   
    },
        
	showMessage: function (status, msg) 
	{
	    var label = this.down('#show-msg');
	    label.setHtml(status+" - "+msg);
	    label.setHidden(false);
	},
	
	/**
	 * if the user is already logged in then refetch the user data 
	 * and set it to the app context.
	 */
	checkSession: function()
	{
		var cntrller = Xedu.app.getController('Main');	   
		if (cntrller.getLoggedInUser())
			return;
			
		var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_USER_SERVICE);
		console.log("about to check for session!!");
   	 	Ext.Viewport.mask({msg:"Checking user session..."});
   	 	Ext.Ajax.request({
	    	 url:authUrl,
	    	 method: 'GET',
	         headers: { 'Content-Type': 'application/json' },				            
	         success: function(resp, conn) 
	         {	                                    	        	 
	        	 Ext.Viewport.setMasked(false);
	        	 var response = Ext.JSON.decode(resp.responseText);	        	                                 
	             if (response.status == 'SUCCESS') 
	             {                        	              	       
	            	console.log("checking for existing user session info.....success "+response.userInfo.userId);
	            	cntrller.setLoggedInUser(response.userInfo);	
	            	if (response.sessionInfo && response.userInfo && response.userInfo.changePswd)
	             	{
	             		console.log("redirecting to change password...");
	             		cntrller.redirectTo("update/password/"+response.sessionInfo.id);
	             	}
	             	else
	             		cntrller.resumeSavedAction();	  
	             } 
	             else; 
	         },
	         failure: function() 
	         {
	        	 Ext.Viewport.setMasked(false);
//            	Xedu.CommonUtils.checkServiceError(resp);
	         }
	         
	    	 
	   });
		
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
	         success: function (form,response)
	         {	                                    
	        	 console.log("login successfull.....");
	        	 Ext.Viewport.setMasked(false);
	        	 var cntrller = Xedu.app.getController('Main');	                                    
	             if (response.status == 'SUCCESS') 
	             {                        	              	       
	             	cntrller.setLoggedInUser(response.userInfo);
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
	             		cntrller.resumeSavedAction();	             	
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
      * change password
      */
     forgotPassword: function()
     {
    	 var me = this;
         var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_FORGOT_PASSWORD_SERVICE);
        
         Ext.Msg.prompt("Reset Password",
        		 		"Please provide your account email address",
        		 		function(but,val)
        		 		{
        	 				console.log("resetting password for email ="+val);
        	 				if (but == "ok")
        	 				{
	        	 				
	        	 				Ext.Viewport.mask({msg:"Resetting your password"});
	        	 				var me = this;
	        	 		        Ext.Ajax.request(
	        	 		        {
	        	 		             url: authUrl,
	        	 		             method: 'POST',
	        	 		             params: 
	        	 		             {
	        	 		                 email:val
	        	 		             },                       
	        	 		             callback: function(opts, success, response) 
	        	 		             {	        	 		                                     	
	        	 		            	Ext.Viewport.setMasked(false);
	        	 		            	Xedu.CommonUtils.checkServiceError(response);
	        	 		            	var srvRespse = Ext.JSON.decode(response.responseText);
	        	 		            	Ext.Msg.alert(srvRespse.status,srvRespse.msg,Ext.emptyFn);
	        	 		             }
	        	 		         });
        	 				}
        	 
         				});
         
         
    	 
     
     },
     
     
     	
	 
});