Ext.define('Xedu.view.chapter.ChaptersList', {
	extend:'Ext.dataview.List',
	xtype:'courses-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.ChaptersStore',
		    'Ext.plugin.PullRefresh'
		    ],
    config: 
    {
        itemId:'chapter-list-panel-id', 
        title:'Chapters',
        /*
         * panel custom config params
         */
        courseid:null,
        
        scrollable: true,
        autoDestroy:true,        
        store: 
        {
        	type:'chapters-store'
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
				var courseId = scope.p.courseid;
           	 	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+record.data.recordId+"/topics");
			}
		}
		            
    },
    
});