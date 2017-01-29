Ext.define('Xedu.view.schedule.ScheduleDetailsPreview', 
{    
    extend: 'Ext.form.Panel',
    xtype: 'schedule-details-preview',
    requires:[
					'Ext.dataview.DataView',
					'Xedu.model.EventScheduleModel',
					'Ext.ProgressIndicator',
					'Xedu.ux.field.DateTimePicker'
              ],
    config: 
    {    	
    	title:'Edit Schedule',
    	fullscreen: false,
    	autoDestroy:true,
    	/**
		 * @cfg showEdit
		 * showEdit is used to load the schedule in a preview mode or edit mode
		 * default false
		 */
	   	showEdit:false,
	   	
    	scrollable:true,    	
    	/**
		 * @cfg classroomid
		 * classroomid is used to load the schedule of the classroom 
		 */
    	classroomid:null,
    	/**
		 * @cfg scheduleRecord
		 * scheduleRecord is used to store the loaded record 
		 */
    	scheduleRecord:null,
    	/**
		 * @cfg eventScheduleId
		 * eventScheduleId is used to load the schedule 
		 */
    	eventScheduleId: null,
    	layout:
    	{
    		type:'fit',
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
				    docked: 'top',
				    xtype: 'toolbar',
				    title: "Update Schedule",
				    height: 50
				},
				{
				    docked: 'bottom',
				    xtype: 'toolbar',
				    ui:'dark',
				    title:'',
				    height:75,
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
						},						
						{
							xtype:'button',
							ui:'confirm',
							text:'Save',
						    itemId: 'save-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').submitNewOrUpdateEvent();	
						    }
						},
						{
							xtype:'button',
							ui:'back',
							text:'Cancel',
						    itemId: 'cancel-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').cancelEditSchedule();	
						    }
						},
						{
							xtype:'button',
							text:'Close',	
						    itemId: 'close-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').hide();	
						    }
						},
						{
							xtype:'button',
							ui:'confirm',
							text:'Join',	
						    itemId: 'join-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').joinSession();	
						    }
						},
						{
							xtype:'button',
							ui:'confirm',
							text:'Start',	
						    itemId: 'start-schedule-button',						            
						    handler: function (but,action,eOpts) 
						    {
						    	this.up('schedule-details-preview').startSession();	
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
	               	itemId:'preview-panel-id',
	               	autoDestroy:true,
	               	flex:1,
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
                  
	   			},
	   			{
	                xtype:'container',
	                flex:1,
	                hidden: true,
	                itemId:'schedule-form-container-id',
	                layout:
	            	{
	            		type:'vbox'
	            	},   
	                items:[
							{
							   	xtype:'fieldset',
							   	layout:'fit',
							   	height:50,			                    	
							   	items:[
										{
										    xtype: 'textfield',
										    label: 'Event ID',
										    labelAlign:'left',
										    name : 'id'
										},
										{				                            													
											xtype: 'selectfield',
						                    label: 'Event Type',
						                    name:'eventType',
						                    autoSelect:true,
						                    options: [
							                        {text: 'CLASSROOM SESSION', value: 'CLASSROOM'},
							                        {text: 'ASSIGNMENT', value: 'ASSIGNMENT'},								                        
							                        {text: 'QUIZ', value: 'QUIZ'}
							                        
							                    ]
						                }
															                    	       
							   	       ]
							},
				   			{
				               	xtype:'fieldset',
				               	layout:'vbox',
				               	height:150,	                    	
				               	items:[
											
											{
											    xtype: 'textfield',
											    label: 'Title',
											    labelAlign:'left',
											    name : 'eventTitle',
											    placeHolder:'Please provide title...',
											},
						               	    {
											    xtype: 'textfield',
											    name : 'classroomid',
											    itemId:'classroomid-field-id',
											    label:"Classroom",											    
				                            },
				                            {				                            	
				                            	xtype: 'selectfield',
							                    label: 'Event Status',
							                    name:'eventStatus',
							                    autoSelect:true,
							                    options: [
								                        {text: 'NOT STARTED', value: 'NOT_STARTED'},
								                        {text: 'PAUSED', value: 'PAUSED'},								                        
								                        {text: 'COMPLETED', value: 'COMPLETED'},
								                        {text: 'CANCELLED', value: 'CANCELLED'},
								                        {text: 'RE-SCHEDULED', value: 'RE_SCHEDULED'}
								                    ]
							                }
															                    	       
				               	       ]
				            },
				            {
				               	xtype:'fieldset',
				               	layout:{
				               		type:'vbox'
				               	},
				               	height:100,			                    	
				               	items:[
											{
											    xtype: 'textfield',
											    labelAlign:'left',
											    hidden:true,
											    itemId:'eventStartDateId',
											    name : 'eventStartDate'
											},
											{
											    xtype: 'textfield',
											    labelAlign:'left',
											    hidden:true,
											    itemId:'eventEndDateId',
											    name : 'eventEndDate'
											},
											{
							                    xtype: 'datetimepickerfield',
							                    name : 'eventStartDateUnFormatted',	
							                    itemId:'eventStartDateUnFormattedId',
							                    label: 'Start Date/Time',
							                    dateTimeFormat : 'Y-m-d H:i',
							                    height:50,
//							                    value: new Date(),
							                    picker: 
							                    {
							                        yearFrom: 2010,
							                        yearTo: new Date().getFullYear() + 2,
							                        minuteInterval : 15,
							                        ampm : true,
							                        slotOrder: [ 'year','month', 'day','hour','minute','ampm']
							                    },
							                    listeners: 
							                    {
							                        change : function( datepicker ) 
							                        {
							                            this.up('schedule-details-preview').down('#eventStartDateId').setValue(datepicker.getFormattedValue());							                        	
							                        }
							                    }
							                },
							                {
							                    xtype: 'datetimepickerfield',
							                    name : 'eventEndDateUnFormatted',
							                    itemId:'eventEndDateUnFormattedId',
							                    label: 'End Date/Time',
							                    dateTimeFormat : 'Y-m-d H:i',
							                    height:50,
//							                    value: new Date(),
							                    picker: 
							                    {
							                        yearFrom: 2010,
							                        yearTo: new Date().getFullYear() + 2,
							                        minuteInterval : 15,							                        
							                        ampm : true,
							                        slotOrder: [ 'year','month', 'day','hour','minute','ampm']
							                    },
								                listeners: 
							                    {
							                        change : function( datepicker ) 
							                        {							                            
							                        	this.up('schedule-details-preview').down('#eventEndDateId').setValue(datepicker.getFormattedValue());							                        	
							                        }
							                        
							                    }
							                }
															                    	       
				               	       ]
				            },				   			
				             {
				               	xtype:'fieldset',
				               	layout:'fit',
				               	flex:1,			                    	
				               	items:[
											{
											    xtype: 'textareafield',
											    label: 'Remarks',
											    labelAlign:'top',
											    placeHolder:'Add additional information about the event.',
											    name : 'eventDescription'
											}
															                    	       
				               	       ]
				             }]
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
     * join session
     */
    joinSession: function()
    {
    	var event = Ext.create('Xedu.model.EventModel',{});
        event.set("type","ACTION_SESSION_JOIN");
        event.set("id",this.getEventScheduleId());
        event.set("msg","joinging session ===  "+this.getEventScheduleId()); 
        
    	Xedu.CommonUtils.sendStompSocketEvent("/veda/topic/sessionmessages/"+this.getEventScheduleId(), event);
    },
    
    
    /**
     * start session
     */
    startSession: function()
    {
    	var event = Ext.create('Xedu.model.EventModel',{});
        event.set("type","ACTION_SESSION_START");
        event.set("msg","joinging session ===  "+this.getEventScheduleId()); 
        event.set("id",this.getEventScheduleId());        
        
    	
        Xedu.CommonUtils.subscribeToStompQueue('/topic/sessionmessages/'+this.getEventScheduleId(),function (msg) 
    	{
    	    console.log("+++++++++++++++ RECIEVED on ",msg);
    	});
        
        Xedu.CommonUtils.sendStompSocketEvent("/topic/start/session/"+this.getEventScheduleId(), event);
    	
    	
    	
    },
    
    
    /**
     * load schedule details preview 
     * 
     */
    loadDetails: function()
    {
    	me = this;
    	
    	this.down("#classroomid-field-id").setValue(this.getClassroomid());
    	
    	if (this.getEventScheduleId() == "" || this.getEventScheduleId() == null || this.getShowEdit())
    	{
    		this.toggleEditMode(true); /* show edit screen */
    		return;
    	}
    	else
    		this.toggleEditMode(false); /* do not show edit screen */
    	
    	console.log("about to load schedule id ="+this.getEventScheduleId());
    	var progressIndicator = Ext.create("Ext.ProgressIndicator",{loadingText:'Loading schedule details preview...'});
    	this.setMasked({msg:"Loading schedule..."});
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.EVENT_SCHEDULE_API)+"/"+me.getEventScheduleId(),
				            method: 'GET',
//				            progress:progressIndicator,
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
					           me.setMasked(false);
					           try
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
					               me.setDetails();
				               }
				               catch(e)
				               {
				            	   console.error(e);
				               }
				                
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
					            me.setMasked(false),
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
				        });
    			
	},
	
	/**
	 * 
	 */	
	setDetails: function()
	{
		this.down('dataview').setRecord(this.getScheduleRecord());
		this.setRecord(this.getScheduleRecord());		
		this.down("#eventStartDateUnFormattedId").setValue(this.getScheduleRecord().data.eventStartDate);
		this.down("#eventEndDateUnFormattedId").setValue(this.getScheduleRecord().data.eventEndDate);
	},
	
	/**
	 * 
	 */
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
		this.toggleEditMode(true);    	    	
		var id = this.getEventScheduleId();
//    	if (id && id != '' )
//    	{	   	 	
//			Xedu.app.getController('Main').redirectTo('edit/schedule/'+id);
//    	}
//		else
//			Ext.Msg.alert("Not allowed","Operation not available!");
						
	},
	
	
	/**
	 * 
	 */
	cancelEditSchedule: function()
	{		
		this.toggleEditMode(false);
		var id = this.getEventScheduleId();
//    	if (id && id != '' )
//    	{	   	 	
//			Xedu.app.getController('Main').redirectTo('edit/schedule/'+id);
//    	}
//		else
//			Ext.Msg.alert("Not allowed","Operation not available!");
						
	},
	
	/**
	 * 
	 */
	toggleEditMode: function(showEdit)
	{
		if (showEdit)
		{
			/*
			 * in edit mode
			 */		
			this.down('#schedule-form-container-id').setHidden(false);
	    	this.down('#preview-panel-id').setHidden(true);
	    	this.down('#edit-schedule-button').setHidden(true);
	    	this.down('#cancel-schedule-button').setHidden(false);
	    	this.down('#save-schedule-button').setHidden(false);
		}
		else
		{			
			/*
			 * in preview mode, show only when the record exits
			 */
			this.down('#schedule-form-container-id').setHidden(true);
			this.down('#preview-panel-id').setHidden(false);
	    	this.down('#edit-schedule-button').setHidden(false);
	    	this.down('#cancel-schedule-button').setHidden(true);
	    	this.down('#save-schedule-button').setHidden(true);			
		}
		
		/*
		 * 
		 */
//		if (this.scheduleRecord == null)
//		{
//			this.down('#cancel-schedule-button').setHidden(true);
//			this.down('#edit-schedule-button').setHidden(true);
//			this.down('#delete-schedule-button').setHidden(true);
//		}
		
		
	},
	
	
	/**
     * 
     * submit new event or update existing
     * 
     */
    submitNewOrUpdateEvent: function()
    {
    	var eventDetailsFrom = this;	
    	var fields = eventDetailsFrom.getFields();
    	var me = this;
    	var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.EVENT_SCHEDULE_API);
    	var restMethod = "POST";
    	var msg = "Adding new event...";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl + "/" +id;
    		msg = "Updating event id = "+id+" ...";
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator",{loadingText:msg});
    	eventDetailsFrom.submit({
                            	 url:restUrl,
                            	 method:restMethod,
                            	 progress: progressIndicator,	
                                 success: function (form,response,data)
                                 {	                                    
                                     var maincntrller = Xedu.app.getController('Main');					                                    
                                     Xedu.CommonUtils.checkServiceError(response);					                                     
                                     if (response.status == 'SUCCESS') 
                                     {                        	              	       
                                    	 Ext.Msg.alert('Success', response.msg, Ext.emptyFn);
                                 		 me.toggleEditMode(false);
                                    	 me.refreshAllEventLists();
                                     } 
                                     else;
                                 },
                                 failure: function (el,resp,p) 
                                 {			                                    
                                     Xedu.CommonUtils.checkServiceError(resp);
                                     me.toggleEditMode(true);
                                 }
                                 
                            	 
                             });
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
    	    	    	    	    		
	},
	
	/**
	 * 
	 */
	refreshAllEventLists: function()
	{
		var listPanels = Ext.ComponentQuery.query("classroom-schedule-list-panel");
		if (listPanels)
		{
			for (var i = 0; i < listPanels.length; i++) 
			{
				listPanels[i].refreshStore();
			}
		} 
		
	}
	
    
});
