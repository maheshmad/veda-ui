Ext.define('Xedu.view.classroom.ClassroomInSession', 
{
    extend: 'Ext.Container',
    xtype: 'classroom-in-session-view',
    requires:[
              	'Xedu.view.classroom.EnrolledStudentsList'
//              	'Xedu.view.classroom.ClassroomsList'
              ],
    config: 
    {    	
    	title: 'Classroom In Session',
    	fullscreen: false,
    	layout: 'fit',    		  
    	classroomid:null,    	
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
		            	xtype:'tabpanel',            	
		            	items:[														
															
									{
										xtype:"slides-main-view",
										classroomSessionMode: true,
										title:"Classroom Progress"
									},
									{
										xtype:"enrolled-students-list-panel",
										title:"Enrolled Students",								
									}	
		            	       
		            	       ]
		            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	
    			/*
    			 * load enrolled students
    			 */
    			var enrolledStudentsList = thisView.down('enrolled-students-list-panel');
    			enrolledStudentsList.setClassroomid(thisView.getClassroomid());
    			enrolledStudentsList.loadEnrolledStudents();
    			/*
    			 * load class session information
    			 */
    			
    			
        	}
		}	
    }
    
    
});
