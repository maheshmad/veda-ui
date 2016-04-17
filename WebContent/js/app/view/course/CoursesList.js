Ext.define('Xedu.view.course.CoursesList', {
	extend:'Ext.Panel',
	xtype:'courses-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.CoursesStore',
		    'Ext.plugin.PullRefresh',
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
		            
    }
    
});