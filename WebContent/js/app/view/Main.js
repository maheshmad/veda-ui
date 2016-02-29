Ext.define('Xedu.view.Main', 
{
	extend:'Ext.navigation.View',
    xtype: 'mainview',
    requires:['Xedu.view.Login',
              'Ext.field.Search'],
	config:
	{
		itemId:'mainviewid',
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
			            iconCls: 'list',
			            iconMask: true,
			            align: 'right',
			            id:'mainmenubutton',
			            action:'showGlobalMenu'
			        }
			       
		        ]
	    },	    
		items: [
		        {
		            xtype:'loginview'
		        }
		    ]
	    
	}
		
});
