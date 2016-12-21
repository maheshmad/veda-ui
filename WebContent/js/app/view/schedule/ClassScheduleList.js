Ext.define('Xedu.view.schedule.ClassScheduleList', 
{
	extend:'Ext.Panel',
	xtype:'classroom-schedule-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.schedule.ScheduleDetailsPreview',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
        /**
		 * @private
		 * @cfg classroomid
		 * classroomid is used to load the schedule of the classroom 
		 */
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
								    	this.up("classroom-schedule-list-panel").addNewSchedule();
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
			        	autoLoad:false
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!',
			                      refreshFn:function()
			                      {
			                    	  scope.up('classroom-schedule-list-panel').loadSchedule();
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
							console.log("tapped schedule");
//			           	 	Xedu.app.getController('Main').redirectTo('view/user/'+record.data.recordId+"/main");
							scope.up('classroom-schedule-list-panel').viewScheduleInfo(record, target);
						}
					}
               }],
               listeners:
		        {
		        	show:function(thisView,opts)
		        	{        		
		        		thisView.loadSchedule();
		        	}
		        }
		            
    },
    
    /*
     * load classroom
     */
    loadSchedule: function()
    {    	
    	var thisView = this;
    	console.log("Loading schedule...");
    	thisView.setMasked({msg:"Loading schedule..."});
		var listStore = thisView.down('list').getStore();				
		listStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_SCHEDULE_SEARCH)+"?classroomid="+this.getClassroomid());
//		classroomListStore.setParams({'classroomid':this.getClassroomid()});
		listStore.load({callback : function(records, operation, success) 
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
    									eventScheduleId:record.data.id,
    									title:record.data.title,
    									centered: true,
				    					modal:true,
						                autoDestroy:true,
						                hideOnMaskTap: true,
    									width:'50%',
    									height:'85%',
    									title:"Event Details"
    								},null); 
    	
//    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.schedule.ScheduleDetailsPreview'},
//    									{
//    										title:"Edit Schedule",
//    										eventScheduleId:record.data.id,
//    										autoDestroy:true,
//    										hideOnMaskTap: true
//    									}); 
    	
    	
    },
    
    /*
     * add a new user to classroom
     */
    addNewSchedule: function()
    {
//    	Xedu.CommonUtils.showOverlay({xtype: 'Xedu.view.users.UserSelection'},{title:"Select student"});
    	var clsid = this.getClassroomid();
    	Xedu.CommonUtils.showOverlay2({
								xtype: 'schedule-details-preview',
								eventScheduleId:"",
								classroomid:clsid,
								centered: true,
								modal:true,
					            autoDestroy:true,
					            hideOnMaskTap: true,
								width:'50%',
								height:'85%'
							},null); 
    	
    },
    
    refreshStore: function()
    {
    	var listStore = this.down('list').getStore();
    	if (listStore)
    	{	
    		listStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_SCHEDULE_SEARCH)+"?classroomid="+this.getClassroomid());
    		listStore.load();	
    	}
    }
    
   
    
});