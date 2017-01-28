Ext.define('Xedu.view.Home', 
{
    extend: 'Ext.Panel',
    xtype: 'home',
    requires:['Xedu.view.users.StudentDashBoard',
              'Xedu.view.users.UserDashBoard'],
    config: 
    {    	
    	title: 'Home',
    	fullscreen: false,
    	layout: 
    	{
    		type:'vbox',
    		pack:'center',
    		align:'stretch'
    	},
    	defaults:
    	{
    		flex:1            
        },
        items: [    
	                {
			            xtype:'list',
			            itemId:'debugpanelid',
			            docked:'bottom',
			            height:100,
			            hidden:false,
			            emptyText: 'No Data Loaded',
	                    store: 
	                    {
	                        fields: ['dt','msg']                        
	                    },
	                    itemTpl: '<span>{dt}</span><span>{msg}</span>'
			        },
					{
						xtype:'user-dashboard-view',
						flex:1
//						bodyStyle:'background-color="yellow"'
					},
//            		{
//            			xtype:'student-dashboard-view',
//            			bodyStyle:'background-color="yellow"'
//            		},
//            		{
//            			xtype:'panel',
//            			html:'something else cool',
//            			bodyStyle:'background-color="red"'
//            		}
            	],
        listeners:
        {
        	show:function()
        	{
        		this.down('user-dashboard-view').show();
        	}
        }
            
    },
    /**
     * 
     */
    reloadData: function()
    {
    	var dashboard = this.down('user-dashboard-view');  
    	dashboard.reloadDashBoard();
    }
});
