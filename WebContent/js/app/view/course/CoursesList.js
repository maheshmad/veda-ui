Ext.define('Xedu.view.course.CoursesList', {
	extend:'Ext.Panel',
	xtype:'courses-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.CoursesStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.course.CourseEditForm',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'Courses',
				    layout:
				    {
				    	type:'hbox',
				    	pack:'right'
				    },
				    defaults:
				    {
				    	ui:'plain'
				    },
				    items:[							           
								{
									   xtype:'searchfield',
									   name:'searchcourses'
								},
								{
									xtype:'button',
									iconCls:'add',
								    handler: function (but,action,eOpts) 
								    {
								    	this.up("courses-list-panel").createNewCourse();
								    }
								}
				           ]					    
               },
               
               {
			    	xtype:'list',
            	    itemId:'courses-list-panel-id', 
			        title:'Courses',
			        scrollable: true,
			        autoDestroy:true,
			        store: {
			        	type:'courses-store'
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!'
			                  }
			              ],       
			        itemTpl: [
			                  '<div>',
			                  '			<span style="color:gray">No:</span> {recordId} ',
			                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
			                  '</div>',
			              ],        
			        listeners:
			        {
						itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped");
			           	 	Xedu.app.getController('Main').redirectTo('view/course/'+record.data.recordId+"/main");
						}
					}
               }]
		            
    },
    
    /*
     * load course
     */
    loadChapters: function(id)
    {
    	var courseDetailsForm = this;
    	
    	console.log("Loading chapters for course id ="+id);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.COURSE_API)+id,
            method: 'GET',
            progress: progressIndicator,			
            headers: { 'Content-Type': 'application/json' },				            
            success: function(response, conn, options, eOpts) 
            {
                var result = Ext.JSON.decode(response.responseText);
		    	
                /*
                 * use the json to create records.
                 */
                this.down("list").getStore().load(result.chapters);				                
		    	
            },
            failure: function(conn, response, options, eOpts) 
            {
            	Xedu.CommonUtils.checkServiceError(resp);
            }
        });
    },
    
    /*
     * show create new form popup
     */    
    createNewCourse: function()
    {    	    	    	
    	Xedu.CommonUtils.showOverlay({xtype: 'course-edit-form'},{title:"Create New Course"});    	
    }
    
    
});