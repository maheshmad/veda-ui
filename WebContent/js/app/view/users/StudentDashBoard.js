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
    			console.log('showing student dashboard...');
        		thisView.reloadStudentDashBoard();
        	}
		}	
    },
    
    reloadStudentDashBoard: function()
    {
    	/* show enrolled classes if the user is logged in */
		if (Xedu.CommonUtils.getLoggedInUserId())
		{	
    		var usersEnrolledClassesList = this.down('user-enrolled-classes-list');    			
			usersEnrolledClassesList.setUserid(Xedu.CommonUtils.getLoggedInUserId().id);
			usersEnrolledClassesList.loadEnrolledClasses();
		}
    }
});
