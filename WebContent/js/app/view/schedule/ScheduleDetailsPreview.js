Ext.define('Xedu.view.schedule.ScheduleDetailsPreview', 
{
    extend: 'Ext.Panel',
    xtype: 'schedule-details-preview',
    requires:[
					'Ext.dataview.DataView',
					'Xedu.model.EventScheduleModel',
					'Ext.ProgressIndicator'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	scrollable:true,    	
    	/**
		 * @cfg classroomid
		 * classroomid is used to load the schedule of the classroom 
		 */
    	classroomid:null,
    	/**
		 * @cfg classroomid
		 * classroomid is used to load the schedule of the classroom 
		 */
    	scheduleRecord:null,
    	/**
		 * @cfg eventScheduleId
		 * eventScheduleId is used to load the schedule 
		 */
    	eventScheduleId: null,
    	layout:
    	{
    		type:'vbox',
    		pack:'center',
    		align:'stretch'
    	},
    	init: function() 
    	{            
    		this.callParent(arguments);
    		console.log("initialized");
        },
        items: [
				{
				    docked: 'bottom',
				    xtype: 'toolbar',
				    ui:'dark',
				    title:'',
				    layout:
				    {
				    	type:'hbox',
				    	pack:'center'
				    },
				    items: 
				    [										
						{
							xtype:'button',
							ui:'decline',
							text:'Edit',
						    itemId: 'edit-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').editSchedule();			                 						    	
						    }
						},
						{
							xtype:'button',
							ui:'decline',
							text:'Delete',
						    itemId: 'delete-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').deleteSchedule();			                 						    	
						    }
						}
				    ]
				}, 
//                {
//		            xtype: 'image',
//		            autoDestroy:true,
//		            itemId:"schedule-image-id",
//		            src: 'resources/icons/user_profilex128.png',
//		            flex: 1					           
//                },	
	   			{
	               	xtype:'dataview',
	               	autoDestroy:true,
	               	flex:4,
	               	store:
	               	{
	               		model:'Xedu.model.EventScheduleModel',
	               	},	               	
	                itemTpl: ['<h1><b>Schedule id:</b> {id}</h1>',
	                          '<h2><b>Class room id:</b> {classroomid}</h2>',
	                          '<p><b>Start date :</b> {eventStartDate}</p>',
	                          '<p><b>End date :</b> {eventEndDate}</p>',
	                          '<p><b>Event Type :</b> {eventType}</p>',
	                          '<p><b>Status :</b> {eventStatus}</p>',
	                          '<p><b>Title :</b> {eventTitle}</p>',
	                          '<p><b>Desc :</b> {eventDesc}</p>',
	                                                   
	                          ]
                  
	   			}],
	   			listeners:
         		{
         			show: function(thisView)
         			{
         				thisView.loadDetails();
         			}
         			
         		}
             
    },

    /**
     * load schedule details preview 
     * 
     */
    loadDetails: function()
    {
    	me = this;
    	console.log("about to load schedule id ="+this.getEventScheduleId());
    	var progressIndicator = Ext.create("Ext.ProgressIndicator",{loadingText:'Loading schedule details preview...'});
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.EVENT_SCHEDULE_API)+"/"+me.getEventScheduleId(),
				            method: 'GET',
				            progress:progressIndicator,
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
			    		    	
				                /*
				                 * use the json to create records.
				                 */
				                var record = Ext.create('Xedu.model.EventScheduleModel', result.eventSchedule);
				                /*
				                 * set the data 
				                 */
				                me.setScheduleRecord(record); /* this record will be used during a delete or an edit operation */
				                me.setPreviewDetails();				                	
				                
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
				        });
    			
	},
	
		
	setPreviewDetails: function(userRecord)
	{
		this.down('dataview').setRecord(this.getScheduleRecord());		
	},
	
	
	removeAllItems: function()
	{
		console.log("removing all items");
		this.down('dataview').destroy();
	},
	
	/**
	 * 
	 */
	editSchedule: function()
	{		
    	var id = this.getEventScheduleId();
		this.hide();
    	if (id && id != '' )
    	{	   	 	
			Xedu.app.getController('Main').redirectTo('edit/schedule/'+id);
    	}
		else
			Ext.Msg.alert("Not allowed","Operation not available!");
		
				
	},
	
	/**
	 * 
	 */
	deleteSchedule: function()
	{		
    	var id = this.getEventScheduleId();
		if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Operation not available!");
    	}
						
    	var previewPanel = this;
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Msg.confirm("Delete schedule?", 
    				"Are you sure you want to delete this schedule?", 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");    	
			    	    		    	
			    	    	Ext.Ajax.request({
			    				       	url:Xedu.Config.getUrl(Xedu.Config.EVENT_SCHEDULE_API)+"/"+id,
			    				       	method:'DELETE',
			    				       	progress: progressIndicator,	
			    			            success: function (resp)
			    			            {	                                    			    	                                     
			    			           	 	var response = Ext.JSON.decode(resp.responseText);			 
			    			           	 	Ext.Msg.alert(response.status,response.msg, function()
			    			           			 {		           	 					                       	
					    			           	 	var listPanels = Ext.ComponentQuery.query("classroom-schedule-list-panel");
					    			    			if (listPanels)
					    			    			{
					    				    			for (var i = 0; i < listPanels.length; i++) 
					    				    			{
					    				    				listPanels[i].refreshStore();
					    				    			}
					    			    			} 
			    			           	 		
					    			    			previewPanel.down("#edit-schedule-button").setHidden(true);
					    			    			previewPanel.down("#delete-schedule-button").setHidden(true);
			    			                       	 
			    			                       	return true;
			    			           			 });		    	                                	   	                                    	 		    	                                    
			    			            },
			    			            failure: function (el,resp,p) 
			    			            {			                                    			    	                                   	                                    
			    			                Xedu.CommonUtils.checkServiceError(resp);
			    			            }            
			    	        	});
			    			    						    	    	
			    	    	previewPanel.hide();
			    		}
			    		
			    		return true;
			    		
			    	});
    	
    	
    	    	    		
	}
	
    
});
