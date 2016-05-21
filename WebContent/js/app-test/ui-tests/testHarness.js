var harness = new Siesta.Harness.Browser.SenchaTouch();

harness.configure({
    title     : 'Sencha Touch 2 samples',
    preload : [
        "../../touch/resources/css/sencha-touch.css",
        "../../touch/sencha-touch-debug.js",        
        "../../.sencha/app/microloader/development.js",
//        "../../build/production/Xedu/app.js",
    ],
    
    keepNLastResults    : 2
});

harness.start(
    {
        group         : 'Application tests',
        pageUrl       : './',
        performSetup  : false,       // This is done by the app itself
        items         : [
             'tests/100_sanity.t.js',
//             'tests/101_login.t.js',
//             'tests/102_logout.t.js'
        ]
    }
);