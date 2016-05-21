describe ("Xedu Main home page loaded", function () 
{
	var mainPanel = null;
	var sideMenuPanel = null;
	var controller = null;
  /* 
   * Setup method to be called before each Test case.
   */
  beforeEach (function ()		  
		  {
		        // Initializing the mainPanel.
		       mainPanel = Ext.create ('Xedu.view.Home');		       
		       sideMenuPanel = Ext.create ('Xedu.view.main.SideMenu');
		       controller = Ext.create ('Xedu.controller.Main');
		  }); // before each

  /* Test if View is created Successfully.*/
  it ('Main View is loaded', function () {
        expect (mainPanel != null).toBeTruthy ();
  });
  
  it ('Side Menu View is loaded', function () {
      expect (sideMenuPanel != null).toBeTruthy ();
  });

  /* Test controller is initialized successfully.*/ 
  it ('Controller shouldn’t be null', function () {
        expect (controller != null).toBeTruthy();
   });

});