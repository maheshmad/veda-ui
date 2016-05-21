Ext.define('Xedu.view.schedule.ClassScheduleList', 
{
	extend:'Ext.Panel',
	xtype:'classroom-schedule-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.users.UserSelection',
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
				    title:'Classroom Schedule',
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
								    	this.up("classroom-schedule-list-panel").addNewUser();
								    }
								}
				           ]					    
               },
               
               {
			    	xtype:'list',
            	    itemId:'classroom-schedule-list-panel-id', 
			        title:'Classroom Schedule',
			        scrollable: true,
			        autoDestroy:true,
			        store: 
			        {
			        	type:'search-store',
			        	autoLoad:false,
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!',
			                      refreshFn:function()
			                      {
			                    	  scope.up('classroom-schedule-list-panel').loadEnrolledStudents();
			                      }
			                  }
			              ],
			        itemTpl: [			                 
			                  '		<div>',
			                  '			<div>',
			                  '				<span style="color:gray">Title: </span>{recordTitle}, ',			        
			                  '				<span style="color:gray">{recordSubTitle} </span> ',
			                  '			</div>',
			                  '		</div>'			                  			                  			                  
			              ],        
			        listeners:
			        {			        	
			        	itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped student");
//			           	 	Xedu.app.getController('Main').redirectTo('view/user/'+record.data.recordId+"/main");
							scope.up('classroom-schedule-list-panel').viewScheduleInfo(record, target);
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
		classroomListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_ENROLLED_STUDENTS_SEARCH)+"?classroomid="+this.getClassroomid());		
//		classroomListStore.setParams({'classroomid':this.getClassroomid()});
		classroomListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);			                    	
			                    }});		
    },
       
    /*
     * show user details preview
     */    
    viewScheduleInfo: function(record,target)
    {    	    	    	
    	Xedu.CommonUtils.showOverlay2({
    									xtype: 'schedule-details-preview',
    									scheduleid:record.data.id,
    									title:record.data.title,
				    					modal:true,
						                autoDestroy:true,
						                hideOnMaskTap: true,
    									width:'50%',
    									height:'65%',
    									title:"Schedule Info"
    								},target);    	
    },
    
    /*
     * add a new user to classroom
     */
    addNewUser: function()
    {
//    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.users.UserSelection'},{title:"Select student"});
    	Xedu.app.getController('Main').redirectTo('view/schedule/user/new/classroom/'+this.getClassroomid());
    }
    
});