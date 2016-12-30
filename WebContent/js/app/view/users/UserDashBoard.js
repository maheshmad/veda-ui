Ext.define('Xedu.view.users.UserDashBoard', 
{
    extend: 'Ext.Container',
    xtype: 'user-dashboard-view',
    requires:[
              	 	'Xedu.view.users.UserEnrolledClassesList',
              	 	'Xedu.view.schedule.UserScheduleList'
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
            },
            {            	
				xtype:"user-schedule-list-panel",				
            },
            {
            	xtype:'panel',
            	html:"<p> wow look ...lots of free space..."
            }
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	    			
    			console.log('loading dashboard...');
        		thisView.reloadDashBoard();
        	}
		}	
    },
    
    /**
     * 
     */
    reloadDashBoard: function()
    {
    	/* show enrolled classes if the user is logged in */
		if (Xedu.CommonUtils.getLoggedInUserId())
		{	
    		console.log("loading dashboard info for user = "+Xedu.CommonUtils.getLoggedInUserId().id);
			var usersEnrolledClassesList = this.down('user-enrolled-classes-list');
    		if (usersEnrolledClassesList)
    		{
    			usersEnrolledClassesList.setUserid(Xedu.CommonUtils.getLoggedInUserId().id);
    			usersEnrolledClassesList.loadEnrolledClasses();
    		}
			
			var usersScheduleList = this.down('user-schedule-list-panel');
			if (usersScheduleList)
			{
				usersScheduleList.setUserid(Xedu.CommonUtils.getLoggedInUserId().id);
				usersScheduleList.loadSchedule();
			}
			
		}
    }
});
