/**
 * 
 * This view will be used to show the current schedule of the user ordered by date/time
 * 
 * 
 */
Ext.define('Xedu.view.schedule.UserScheduleList', 
{
	extend:'Ext.Panel',
	xtype:'user-schedule-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.users.AllowedActionsMenu',
		    'Xedu.view.schedule.ScheduleDetailsPreview',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
        /**
		 * @private
		 * @cfg userid
         * userid of the student 
         */
        userid:null,
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'User Schedule',
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
//								{
//									xtype:'button',
//									iconCls:'add',
//								    handler: function (but,action,eOpts) 
//								    {
//								    	this.up("user-schedule-list-panel").addNewSchedule();
//								    }
//								}
				           ]					    
               },               
               {
			    	xtype:'list',
            	    itemId:'user-schedule-list-panel-id', 
			        title:'My Schedule',
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
			                    	  scope.up('user-schedule-list-panel').loadSchedule();
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
							scope.up('user-schedule-list-panel').viewScheduleInfo(record, target);
							
//							Xedu.CommonUtils.showOverlay2(
//				    				{	xtype: 'allowed-actions-menu',										    				
////				    					title:"Select student",
//				    					recordType:'EVENTSCHEDULE',
//				    					recordId: record.data.id,
//				    					width:200,
//				    					height:250,
//				    					modal:true,
//						                autoDestroy:true,
//						                hideOnMaskTap: true,
//				    					callbackScope:scope,
//				    					callbackOnSelect: function(rec)
//				    					{
//				    						console.log("selection ="+rec.data.id+",link = "+'view'+rec.data.link);
//				    						Xedu.app.getController('Main').redirectTo('view'+rec.data.link);
//				    					}
//				    				},target);
							
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
     * load user schedule
     */
    loadSchedule: function()
    {    	
    	var thisView = this;
    	console.log("Loading schedule...");
    	thisView.setMasked({msg:"Loading schedule for userrecid = ..."+Xedu.CommonUtils.getLoggedInUserId().id});
		var listStore = thisView.down('list').getStore();				
		listStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_SCHEDULE_SEARCH));
		listStore.setParams({'urecid':this.getUserid()});
		listStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);			                    	
			                    }});		
    },
       
    /**
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
    		listStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.CLASSROOM_SCHEDULE_SEARCH));
    		listStore.setParams({'urecid':this.getUserid()});
    		listStore.load();	
    	}
    }
    
   
    
});