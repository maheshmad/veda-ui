Ext.define('Xedu.view.classroom.ClassroomMgmtMain', 
{
    extend: 'Ext.Container',
    xtype: 'classroom-mgmt-main-view',
    requires:[
              	'Xedu.view.classroom.ClassroomEditForm', 
              	'Xedu.view.classroom.EnrolledStudentsList'
//              	'Xedu.view.classroom.ClassroomsList'
              ],
    config: 
    {    	
    	title: 'Classroom Management',
    	fullscreen: false,
    	layout: 'fit',    		  
    	classroomid:null,    	
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
            
            {
            	xtype:'tabpanel',
            	flex:4,
            	items:[														
							{
								title:'Classroom Info',
								xtype:'container',            	
								layout: 'fit',
								flex:1,
								items:[
							            	{
											    docked: 'top',
											    xtype: 'titlebar',
											    ui:'neutral',
											    title:'',
											    layout:
											    {
											    	pack:'right'
											    },
											    defaults:
											    {
											    	ui:'plain'
											    },
											    items:[							           
															{
																xtype:'button',
																iconCls:'add',
															    handler: function (but,action,eOpts) 
															    {
															    }
															}
											           ]
											    
											},
											{
												xtype:'classroom-edit-form', 
								            	flex:1
											}
										]
							},
							{
								xtype:"enrolled-students-list-panel",
								title:"Enrolled Students",								
							},
							{
								xtype:"panel",
								title:"Schedule"
							},
							{
								xtype:"panel",
								title:"Classroom Progress"
							}							
            	       
            	       ]
            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	
//    			var classroomsList = thisView.down('classrooms-list-panel');
    			var classroomEditForm = thisView.down('classroom-edit-form');
    			/*
    			 * load enrolled students
    			 */
    			var enrolledStudentsList = thisView.down('enrolled-students-list-panel');
    			enrolledStudentsList.setClassroomid(thisView.getClassroomid());
    			enrolledStudentsList.loadEnrolledStudents();
    			
//    			classroomsList.setClassroomid(thisView.getClassroomid())
    			classroomEditForm.loadClassroom(thisView.getClassroomid());
//    			classroomsList.loadClassrooms(thisView.getClassroomid());
//    			classroomsList.loadClassrooms();        		
        	}
		}	
    }
    
    
});
