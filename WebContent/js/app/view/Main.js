Ext.define('Xedu.view.Main', 
{
	extend:'Ext.navigation.View',
    xtype: 'mainview',
    requires:['Xedu.view.Login',
              'Xedu.view.course.CoursesList',
//              'Xedu.view.common.DebugPanel',
              'Xedu.view.topic.TopicsList',
              'Xedu.view.Home',
              'Ext.field.Search'],
	config:
	{
		itemId:'mainviewid',
		fullscreen:true,
		autoDestroy:true,		
		listener:
		{
			/*
			 * to destroy element on pop 
			 */	
			pop: function(cnt, item) 
			{
			    console.log("nav pop listener");   
				Ext.Function.defer(function()
				{
			            cnt.remove(item, true);
			        }, 100);
			},
			
			show: function()
			{
				console.log("showing main navigation....check for login..");							
			}
		},
		navigationBar: 
		{
	        items: [	                
		            {
		                xtype: 'searchfield',
		                placeHolder: 'Search ..',
		                align: 'right',
		                listeners:
		                {
		                	action:function(e)
		                	{		                		
		                		var cntrller = Xedu.app.getController('Main');
		                		cntrller.redirectTo('open/'+e.getValue()); 
		                	}
		                }
		            },		           
		            {
			            xtype:'button',
		            	iconCls: 'list',
			            iconMask: true,
			            align: 'right',
			            itemId:'mainmenubutton',
			            handler:function (button)
			        	{            				            						
			            	Ext.Viewport.toggleMenu('right');							
			        	}
			        }
			       
		        ]
	    },	    
		items: [
		        {
		        	xtype:'home',
		        	title:'Home'
		        }
		    ]
	    
	}
		
});
