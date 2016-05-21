StartTest(function(t) 
{
    console.log("testing......");
	t.diag("Sanity");

    t.ok(Ext, 'ExtJS is here');
    t.ok(Ext.Window, '.. indeed');


    t.ok(Xedu.app, 'My project is here');
    t.ok(CommonUtils, '.. commonutils ready');

    t.done();   // Optional, marks the correct exit point from the test
}) 