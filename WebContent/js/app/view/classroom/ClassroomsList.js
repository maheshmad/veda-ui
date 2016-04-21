Ext.define('Xedu.view.classroom.ClassroomsList', 
{
	extend:'Ext.Panel',
	xtype:'classrooms-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.classroom.ClassroomEditForm',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'Classrooms',
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
									   name:'searchclassrooms'
								},
								{
									xtype:'button',
									iconCls:'add',
								    handler: function (but,action,eOpts) 
								    {
								    	this.up("classrooms-list-panel").createNewClassroom();
								    }
								}
				           ]					    
               },
               
               {
			    	xtype:'list',
            	    itemId:'classrooms-list-panel-id', 
			        title:'Classrooms',
			        scrollable: true,
			        autoDestroy:true,
			        store: 
			        {
			        	type:'search-store'
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
			           	 	Xedu.app.getController('Main').redirectTo('view/classroom/'+record.data.recordId+"/main");
						}
					}
               }],
               listeners:
		        {
		        	show:function(thisView,opts)
		        	{        		
		        		thisView.loadClassrooms();
		        	}
		        }
		            
    },
    
    /*
     * load classroom
     */
    loadClassrooms: function()
    {    	
    	var thisView = this;
    	console.log("Loading chapters for classrooms");
    	thisView.setMasked({msg:"Loading classrooms..."});
		var classroomListStore = thisView.down('list').getStore();				
		classroomListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_SEARCH));
		classroomListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    }});		
    },
    
    /*
     * show create new form popup
     */    
    createNewClassroom: function()
    {    	    	    	
    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.classroom.ClassroomEditForm'},{title:"Create New Classroom"});    	
    }
    
    
});