Ext.define('Xedu.view.course.CoursesList', {
	extend:'Ext.dataview.List',
	xtype:'courses-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.CoursesStore',
		    'Ext.plugin.PullRefresh'		    ],
    config: 
    {
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
           	 	Xedu.app.getController('Main').redirectTo('view/course/'+record.id+"/chapters");
			}
		}
		            
    },
    
});