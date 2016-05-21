Ext.define('Xedu.view.course.CoursesList', 
{
	extend:'Ext.Panel',
	xtype:'courses-list-panel',
	requires: [		    		    		    
		    'Xedu.store.CoursesStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.course.CourseEditForm',
		    'Ext.dataview.List'],
    config: 
    {        
        /*
         * callback options
         */
        callbackScope: null,
        callbackOnSelect: null,
        closeOnSelect: true,
        layout:
        {
        	type:'vbox',
        	pack:'start'
        },
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
				   xtype:'searchfield',
				   name:'searchcourses',				 
	               placeHolder: 'search courses..',
	               align: 'center',
	               ui:'dark',
	               height:50,
				   listeners:
	               {
	                	keyup:function(el, e, eOpts )
	                	{		                		
	                		this.up('courses-list-panel').searchRecords(el.getValue());	                		
	                	}
	               }
               },
               {
			    	xtype:'list',
            	    itemId:'courses-list-panel-id', 
			        title:'Courses',
			        scrollable: true,
			        flex:1,
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
							scope.up('courses-list-panel').courseSelected(record);
						}
					}
               }]
		            
    },
    
    searchRecords: function(searchvalue)
    {    	
    	Xedu.CommonUtils.filterStore(this.down('list'),searchvalue)
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
    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.course.CourseEditForm'},{title:"Create New Course"});    	
    },
    
    /*
     * when course selected
     */    
    courseSelected: function(record)
    {
    	if (this.getCallbackOnSelect())
    	{
			this.handleCallback(record.data.id);
    	}
    	else
    	{
    		Xedu.app.getController('Main').redirectTo('view/course/'+record.data.recordId+"/main");
    	}
    },
    /*
     * handle call back
     */
    handleCallback: function(param)
    {
    	console.log("handling callback for courses... ");
    	var callbck = this.getCallbackOnSelect();
    	var scope = this.getCallbackScope();
    	if (typeof callbck == "function")
    	{
    		if (!scope)
    			console.error("Missing scope inside callbackConfig ");
    		else
    			callbck.apply(scope,[param]);
    	}
    	
    	if (this.getCloseOnSelect())
    		this.hide();
    	    	
    },
    
    
});