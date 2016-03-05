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
        scrollable: true,
        autoDestroy:true,
        store: Ext.create('Xedu.store.ChaptersStore'),
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
           	 	Xedu.app.getController('Main').redirectTo('view/chapter/id/'+record.id);
			}
		}
		            
    },
    
});