/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Xedu',

    requires: [
        'Ext.MessageBox',
        'Xedu.view.Main',
        'Xedu.Config',
        'Xedu.CommonUtils',
        'Xedu.view.Home',
        'Xedu.controller.Main',
        'Xedu.view.main.SideMenu',
        'Ext.data.proxy.Rest' ],
    
    controllers: ['Main'],
    
    views: [
        'Main',
//        'Login'      
    ],
    

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    /*
     * logged in user info
     */
    loggedInUser: '',     
    setLoggedInUser: function(user)
    {
    	this.loggedInUser = user;
    },
    getLoggedInUser: function()
    {
    	return this.loggedInUser;
    },
    
    /*
     * navigation action stack
     */
    actionHistoryStack:[],
    pushActionIntoHistorySack: function(action)
    {
    	this.actionHistoryStack.push(action);
    },
    popActionFromHistorySack: function()
    {
    	this.actionHistoryStack.push(action);
    },
    
    launch: function() 
    {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Xedu.view.Main'));
        
        /*
         * Initialize singleton config
         */
        var config = Xedu.Config;
        
        /*
         * set the navigation menu
         */        
        Ext.Viewport.setMenu(Ext.create('Xedu.view.main.SideMenu'), 
        {
            side: 'right',
            reveal: true
        });
        
        this.getController('Main').redirectToView('Home');
    },

    onUpdated: function() 
    {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) 
            {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
