Ext.define('Xedu.view.classroom.ClassroomInSessionStudentsView', 
{
    extend: 'Ext.Container',
    xtype: 'classroom-in-session-students-view',
    requires:[
//              	'Xedu.view.classroom.ClassroomsList'
              ],
    config: 
    {    	
    	title: 'Classroom In Session',
    	fullscreen: false,
    	layout: 'fit',    		  
    	/**
    	 * @cfg enrollmentid
    	 */
    	enrollmentid:null,    	
    	
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [
//					{
//					    docked: 'top',
//					    xtype: 'titlebar',
//					    ui:'neutral',
//					    title:'',
//					    layout:
//					    {
//					    	pack:'right'
//					    },
//					    defaults:
//					    {
//					    	ui:'plain'
//					    },
//					    items:[							           
//									{
//										xtype:'button',
//										iconCls:'add',
//									    handler: function (but,action,eOpts) 
//									    {
//									    }
//									}
//					           ]
//					    
//					},
		            {		            															
						xtype:"slides-fullview",
						title:"Classroom Progress"
									
		            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	    			
    			thisView.loadClassroomCourseContents();    			
        	}
		}	
    },
    
   /**
    * load the course contents into slides main view
    */
    loadClassroomCourseContents: function()
    {
    	
    	
    	
    },
    
});
