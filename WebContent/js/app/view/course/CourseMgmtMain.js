Ext.define('Xedu.view.course.CourseMgmtMain', 
{
    extend: 'Ext.Container',
    xtype: 'course-mgmt-main-view',
    requires:[
              	'Xedu.view.course.CourseEditForm', 
              	'Xedu.view.chapter.ChaptersList'
              ],
    config: 
    {    	
    	title: 'Course Management',
    	fullscreen: false,
    	layout: 'hbox',    		  
    	courseid:null,    	
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
            {
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
												iconCls:'user',
											    handler: function (but,action,eOpts) 
											    {
											    	Ext.ComponentQuery.query('user-details-view')[0].createNewUserForm();
											    }
											}
							           ]
							    
							},
							{
								xtype:'course-edit-form', 
				            	flex:1
							}
						]
            },
            {
            	xtype:'tabpanel',
            	flex:4,
            	items:[							
							{
								xtype:"chapters-list-panel",
								title:"Chapters"
							},
							{
								xtype:"panel",
								title:"Enrolled Students"
							},
							{
								xtype:"panel",
								title:"Schedule"
							},
							{
								xtype:"panel",
								title:"Course Progress"
							}							
            	       
            	       ]
            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	
    			var chaptersList = thisView.down('chapters-list-panel');
    			var courseEditForm = thisView.down('course-edit-form');
    			courseEditForm.loadCourse(thisView.getCourseid());
//    			chaptersList.loadChapters();        		
        	}
		}	
    }
});
