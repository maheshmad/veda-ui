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
    	 * @cfg eventSessionId
    	 */
    	eventSessionId:null,    	
    	
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
		            },
		            {		            															
						xtype:"slides-fullview",
						title:"Classroom Progress",
						/*
						 * classroom full view is shown only in the case of 
						 * students.
						 */
						hidden:true
									
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
    	if (this.getEventSessionId() == null)
    	{
    		Ext.Msg.alert("Invalid Session!","No event session id information found!", Ext.emptyFn);    		
    		return;
    	}
    	
    	var me = this;
    	var progressIndicator = Ext.create("Ext.ProgressIndicator",{msg:'Loading event session information'});
    	Ext.Ajax.request({
							url:Xedu.Config.getUrl(Xedu.Config.EVENT_SESSION_FULL_DETAILS)+this.getEventSessionId(),
				            method: 'GET',
				            progress: progressIndicator,			
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
						    	
				                /*
				                 * use the json to create records.
				                 */
				                var eventRecord = Ext.create('Xedu.model.EventScheduleModel', result.eventSchedule);
//				                var eventRecordData = eventRecord.getData(true);
//				                
//				                if (!eventRecordData)
//				                {
//				            		Ext.Msg.alert("Invalid Session","Please go back and choose a valid session!", Ext.emptyFn);    		
//				            		return;
//				            	}
				                				                
				                /*
				        		 * load course information
				        		 */
				        		var slidesMainView = me.down('slides-main-view');
				        		slidesMainView.setCourseid(result.classroom.courseRecordId);
				        		slidesMainView.setPresenterMode(result.eventSession.presenter);
				        		slidesMainView.loadCourseChaptersList();
				        		

				        		/*
				        		 * load enrolled students
				        		 */
				        		me.loadClassroomEnrolledStudents(result.classroom.id);
						    	
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
