Ext.define('Xedu.view.slides.SlidesMain', 
{
    extend: 'Ext.Container',
    xtype: 'slides-main-view',
    requires:['Xedu.view.slides.SlidesList',
              'Xedu.view.slides.SlidesFullViewList'],
    config: 
    {    	
    	title: 'Class',
    	fullscreen: false,
    	layout: 'hbox',
    	topicid: null,	   
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
            {
            	xtype:'slides-list-panel', 
            	flex:1
            },
            {
            	xtype:'container',            	
            	layout: 'fit',            	
            	items:[
						{
						    docked: 'top',
						    xtype: 'titlebar',
						    ui:'light',
						    title:'test',
						    items: 
						    [
						        {
						        	xtype:'button',
						        	text: 'ALL',
						            id: 'rightButton'						        		
						        }
						        	
						    ]
						},
						{
							xtype:'slides-fullview-list',
						}
            	],
            	flex:4
            }
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{
        		if (thisView.getTopicid())
        		{
        			var slidesList = thisView.down('slides-list-panel');        			
        			slidesList.setTopicid(thisView.getTopicid());
        			slidesList.loadslideslist();
        		}
        	}
		}	
    }
});
