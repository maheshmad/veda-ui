Ext.define('Xedu.view.common.DebugPanel', 
{
    extend: 'Ext.Panel',
    xtype: 'debug-panel',
    requires:[
              ],
    config: 
    {    	    
    	fullscreen: false,
    	layout: 'hbox',
    	itemId:'debugpanelid',
    	autoDestroy:false,
//    	hidden: true,
        items: [           
		            {
		            	         	
					    docked: 'top',
					    xtype: 'titlebar',
					    ui:'neutral',
					    title:'Debug',
					    layout:
					    {
					    	pack:'right'
					    },
					    defaults:
					    {
					    	ui:'plain'
					    }
					    
					}                                   
		       ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			
        		console.log("showing debugging panel main");
        	}
		}	
    }
});
