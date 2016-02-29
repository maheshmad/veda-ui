Ext.define('Xedu.view.Home', 
{
    extend: 'Ext.Panel',
    xtype: 'home',
    requires:[],
    config: 
    {    	
    	title: 'Home',
    	fullscreen: true,
    	layout: 'vbox',
    	autoDestroy:true,
    	defaults:{
    		flex:1            
        },
        items: [           
            {
            	xtype:'container',
                layout: 'hbox',
                defaults: {
                    flex: 1
                },        
                items:[                		
                		{
                			xtype:'panel',
                			html:"<h1> This is home!!!!!!!!!</h1>"
                		}
                	]                              
            }
        ]
    }
});
