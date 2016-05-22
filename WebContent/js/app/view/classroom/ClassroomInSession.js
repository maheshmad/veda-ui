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
    			thisView.loadClassroomCourseContents();    			
        	}
		}	
    },
    
   /**
    * load the course contents into slides main view
    */
    loadClassroomCourseContents: function()
    {
    	if (this.getEnrollmentid() == null)
    	{
    		Ext.Msg.alert("Invalid Operation!","No enrollment information found!", Ext.emptyFn);    		
    		return;
    	}
    	var me = this;
//    	var progressIndicator = Ext.create("Ext.ProgressIndicator",{msg:'Loading enrollment information'});
    	Ext.Ajax.request({
							url:Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API)+this.getEnrollmentid(),
				            method: 'GET',
//				            progress: progressIndicator,			
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
						    	
				                /*
				                 * use the json to create records.
				                 */
				                var enrollmentRecord = Ext.create('Xedu.model.EnrollmentModel', result.enrollment);
				                var enrollData = enrollmentRecord.getData(true);
				            	/*
				        		 * load course information
				        		 */
				        		var slidesMainView = me.down('slides-main-view');
				        		slidesMainView.setCourseid(enrollData.classroom.courseRecordId);
				        		slidesMainView.loadCourseChaptersList();
				        		/*
				        		 * load enrolled students
				        		 */
				        		me.loadClassroomEnrolledStudents(enrollData.classroomid);
						    	
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
        				});
    	
    	
    },
    /**
     * load the enrolled students
     */
     loadClassroomEnrolledStudents: function(classroomid)
     {
    	 /*
		 * load enrolled students
		 */
		var enrolledStudentsList = this.down('enrolled-students-list-panel');
		enrolledStudentsList.setClassroomid(classroomid);
		enrolledStudentsList.loadEnrolledStudents();
     },
    
    
});
