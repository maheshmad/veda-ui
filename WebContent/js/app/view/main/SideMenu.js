Ext.define('Xedu.view.main.SideMenu', 
{
    extend: 'Ext.Menu',    
    config: 
    {       
    	items: [{
				    text: 'Home',
				    iconCls: 'home',
				    scope: this,
				    handler: function() 
				    {                     
					   Ext.Viewport.hideMenu('right');
					   var main = Xedu.app.getController('Main');
					   main.redirectTo('view/Home');
					}
			},
             {
                 text: 'Settings',
                 iconCls: 'settings',
                 scope: this,
                 handler: function() 
                 {                	 
                	 Ext.Viewport.hideMenu('right');
                	 Xedu.app.getController('Main').redirectTo('config');
                 }
             },
             {
                 text: 'Courses',
                 iconCls: 'search',
                 scope: this,
                 handler: function() 
                 {                     
                	 Ext.Viewport.hideMenu('right');
                	 Xedu.app.getController('Main').redirectTo('view/course/list');
                 }
             },
             {
                 text: 'Search',
                 iconCls: 'search',
                 scope: this,
                 handler: function() 
                 {                     
                	 Ext.Viewport.hideMenu('right');
                	 Xedu.app.getController('Main').redirectTo('view/SearchInfoFormPanel');
                 }
             },
             {
                 text: 'New Application',
                 iconCls: 'compose',
                 scope: this,
                 handler: function() {                     
                	 Ext.Viewport.hideMenu('right');
                	 Xedu.app.getController('Main').redirectTo('view/app_create_update_from_panel');
                 }
             },
             {
                 xtype: 'button',
                 text: 'Open Application',
                 iconCls: 'bookmarks',
                 scope: this,
                 handler: function() {
                     Ext.Viewport.hideMenu('right');
                     //Xedu.app.getController('Main').redirectTo('open/ApplicationCreateUpdateFormPanel');
                 }
             },
             {
                 xtype: 'button',
                 text: 'Logoff',
                 itemId: 'logOffButton',
                 align: 'right',
            	 handler: function() 
            	 {                     
                	Ext.Viewport.hideMenu('right');
                	Ext.Viewport.setMasked({
            			xtype:'loadmask',
            			message:'Please wait while we log you out.....',
            			style:'color:white'
            				
                	});	                	
                	
                	/* ajax logout */
                	var authUrl = Xedu.Configuration.getUrl(Xedu.Configuration.AUTH_REST_SERVICE);
                    Ext.Ajax.request(
                    {
                        url: authUrl,
                        method: 'post',
                        params: 
                        {
                            action:'logout'
                        },                       
                        callback: function()
                        {                        	
                        	Xedu.app.getController('Main').getMainViewNavigation().reset();
                        	Xedu.app.getController('Main').redirectTo('view/Login');
                        	Ext.Viewport.setMasked(false);                        	
                        }
                    });
                	
                	
                 }
             }
             
             
             
             
        ]
    }
});
