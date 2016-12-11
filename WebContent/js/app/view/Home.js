Ext.define('Xedu.view.Home', 
{
    extend: 'Ext.Panel',
    xtype: 'home',
    requires:['Xedu.view.users.StudentDashBoard'],
    config: 
    {    	
    	title: 'Home',
    	fullscreen: false,
    	layout: 
    	{
    		type:'hbox',
    		pack:'center',
    		align:'stretch'
    	},
    	defaults:
    	{
    		flex:1            
        },
        items: [                                      		
            		{
            			xtype:'student-dashboard-view',
            			bodyStyle:'background-color="yellow"'
            		},
            		{
            			xtype:'panel',
            			html:'something else cool',
            			bodyStyle:'background-color="red"'
            		}
            	],
        listeners:
        {
        	show:function()
        	{
        		this.down('student-dashboard-view').show();
        	}
        }
            
    },
    /**
     * 
     */
    reloadData: function()
    {
    	var studentData = this.down('student-dashboard-view');  
    	studentData.reloadStudentDashBoard();
    }
});
