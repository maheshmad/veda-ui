Ext.define('Xedu.view.topic.TopicsList', {
	extend:'Ext.dataview.List',
	xtype:'topics-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.TopicsStore',
		    'Ext.plugin.PullRefresh'
		    ],
    config: 
    {
        itemId:'topics-list-panel-id', 
        title:'Topics',
        scrollable: true,
        autoDestroy:true,
        store: {
        	type:'topics-store'
        },
        plugins: [
                  {
                      xclass: 'Ext.plugin.PullRefresh',
                      pullText: 'Pull down to refresh the topics list!'
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
           	 	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+record.id+"/topics");
			}
		}
		            
    },
    
});