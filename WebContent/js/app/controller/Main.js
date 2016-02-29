Ext.define('Xedu.controller.Main',
{
	extend: 'Ext.app.Controller',
	requires:['Xedu.Config'],	
	config:
	{					
			before:
			{	
				showView:'authenticate'
			},
			refs:
			{											
				mainViewNavigation:'mainview',			
				loginView: 'loginview',										
			},
			routes:
			{
				'view/:id':'showView',
				'open/:applid':'openApplicationView',
				'edit/:applid':'editApplicationInfo',
				'search/name/:param':'showSearchResults'
			}
									
	},
	
	/**
	 * 
	 * check user login before 
	 * processing the request.
	 */
	authenticate: function(action) 
	{
		//alert(Xedu.app.getLoggedInUser());
        /*
         * if the user is not logged in , it will stay on the login page otherwise the action will
         * resume
         */
		console.log(" checking user info....");
		if (Xedu.app.getLoggedInUser() != '')		        
        	action.resume();
        else
        	this.showLogin(action);
    },
    
    /*
     * show Login page
     */
    showLogin: function()
    {
    	console.log(" showing login screen....");
    	this.showView('Login');
    },
    
    /*
     * showing home
     */
    showHome: function()
    {		    			    	            	
    	console.log(" TO DO show home");    	      		    	
    },
    
    /*
     * 
     * 
     */
	showView: function(toview)
	{
		console.log("about to render "+toview);
		var viewClass = 'Xedu.view.'+toview;
		var navtoview = Ext.ComponentQuery.query(toview);
		if (navtoview != null && navtoview[0] != null)
			navtoview[0].destroy();
		navtoview = Ext.create(viewClass);
		
		this.getMainViewNavigation().push(navtoview);        		        			
	},
	/*
	 * redirect is similar to showView except for the fact that
	 * it will pop the existing view so that there is no back button
	 * also, this will not hit the before filter . 
	 */
	redirectToView: function(toview)
	{
		var viewClass = 'Xedu.view.'+toview;
		console.log('redirecting to view '+viewClass);
		var navtoview = Ext.get(viewClass);
		if (navtoview == null)
			navtoview = Ext.create(viewClass);
		else;
		this.getMainViewNavigation().pop();
		this.getMainViewNavigation().push(navtoview);        		        			
	},
	showGlobalMenu: function (button)
	{            				            						
		Ext.Viewport.toggleMenu('right');
		
	},
	redirectToUrl: function(el,record)
	{
		var toUrl = record.get('navUrl');        		
		this.redirectTo(toUrl);        		
		Ext.Viewport.toggleMenu('right');
	},        	        	
	/*
	 * logging off
	 */
	onSignOffCommand: function () 
	{
	        var me = this;
	        var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_REST_SERVICE);
	        Ext.Ajax.request({
	            url: authUrl,
	            method: 'POST',
	            params: 
	            {
	                sessionToken: me.sessionToken
	            },
	            success: function (response) 
	            {        	            	
	            	var navtoviews = Ext.ComponentQuery.query('homecard');		    	
			    	if (navtoviews != null && navtoviews[0] != null)
			    	{
			    		console.log("removing home view from navigation");        			    		
    			    	this.getMainViewNavigation().pop(navtoviews[0],true);
    			    	this.getMainViewNavigation().reset();
			    	}
			    	else;        			    	
			    	     
	            },
	            failure: function (response) {

	                // TODO: You need to handle this condition.
	            }
	        });

	        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
	}
	
});			
