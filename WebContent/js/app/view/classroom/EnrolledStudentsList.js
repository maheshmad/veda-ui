Ext.define('Xedu.view.classroom.EnrolledStudentsList', 
{
	extend:'Ext.Panel',
	xtype:'enrolled-students-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.users.UserDetailsPreview',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
        classroomid:null,
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'Enrolled students',
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
								    	this.up("enrolled-students-list-panel").createNewClassroom();
								    }
								}
				           ]					    
               },
               
               {
			    	xtype:'list',
            	    itemId:'enrolled-students-list-panel-id', 
			        title:'Enrolled Students',
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
			                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
			                  '</div>',
			                  '<div>',
			                  '			<span style="color:gray">{recordSubTitle} </span> ',
			                  '</div>',
			              ],        
			        listeners:
			        {			        	
			        	itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped student");
//			           	 	Xedu.app.getController('Main').redirectTo('view/user/'+record.data.recordId+"/main");
							scope.up('enrolled-students-list-panel').viewStudentsInfo(record.data.recordId);
						}
					}
               }],
               listeners:
		        {
		        	show:function(thisView,opts)
		        	{        		
		        		thisView.loadEnrolledStudents();
		        	}
		        }
		            
    },
    
    /*
     * load classroom
     */
    loadEnrolledStudents: function()
    {    	
    	var thisView = this;
    	console.log("Loading enrolled students...");
    	thisView.setMasked({msg:"Loading classrooms..."});
		var classroomListStore = thisView.down('list').getStore();				
		classroomListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_ENROLLED_STUDENTS_SEARCH));
		classroomListStore.setParams({'classroomid':this.getClassroomid()});
		classroomListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    }});		
    },
       
    /*
     * show user details preview
     */    
    viewStudentsInfo: function(id)
    {    	    	    	
    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.users.UserDetailsPreview',userid:id},{title:"Student Info"});    	
    }
    
});