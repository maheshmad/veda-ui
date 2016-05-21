Ext.define('Xedu.view.users.StudentDashBoard', 
{
    extend: 'Ext.Container',
    xtype: 'student-dashboard-view',
    requires:[
              	 	'Xedu.view.users.UserEnrolledClassesList'
              ],
    config: 
    {    	
    	title: 'My DashBoard',
    	fullscreen: false,
    	layout: 
    	{
    		type:'hbox',
    		pack:'start',
    		align:'stretch'
    	},
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           					
            {            	
				xtype:"user-enrolled-classes-list",
				
            }            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	
    			var usersEnrolledClassesList = thisView.down('user-enrolled-classes-list');    			
    			usersEnrolledClassesList.setUserid(Xedu.CommonUtils.getLoggedInUserId().id);
    			usersEnrolledClassesList.loadEnrolledClasses();  
//    			usersEnrolledClassesList.show();
        	}
		}	
    }
});
