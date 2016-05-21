Ext.Loader.setConfig({
    enabled: true,                  // Turn on Ext.Loader
    disableCaching: false           // Turn OFF cache BUSTING
});

Ext.Loader.setPath({
    'Xedu': 'app'              // Set the path for all SenchaBdd.* classes
});

Ext.application({
    
	requires: [
	           'Ext.MessageBox',
	           'Xedu.view.Main',
	           'Xedu.Config',
	           'Xedu.CommonUtils',
	           'Xedu.view.Home',
	           'Xedu.controller.Main',
	           'Xedu.field.DateTextField',
	           'Xedu.view.main.SideMenu',
	           'Ext.data.proxy.Rest' ],
	       
   controllers: ['Main'],
   
   views: [
       'Main',
       'Home'
//	           'Login'      
   ],
	
	name: 'Xedu',               // Create (but don't launch) an application    	
    // using the Launch method of Application object to execute the Jasmine
       //Test Cases
	launch: function () 
	{
		var jasmineEnv = jasmine.getEnv ();
		jasmineEnv.updateInterval = 1000;
		var htmlReporter = new jasmine.HtmlReporter ();
		jasmineEnv.addReporter (htmlReporter);
		jasmineEnv.execute ();
	} 	
   
});