Ext.define('Xedu.view.session.SessionParticipantsView', 
{
    extend: 'Ext.Container',
    xtype: 'session-participants-view',
    requires:[
//              	'Xedu.view.classroom.ClassroomsList'
    			'Ext.util.DelayedTask'
              ],
    config: 
    {    	
    	title: 'Meeting Session',
    	fullscreen: false,
    	height:"100%",
    	layout: 'fit',    		  
    	/**
    	 * @cfg eventSessionId
    	 */
    	eventSessionId:null,     	
    	
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [
        	{
        		xtype:'panel',
        		layout: 'fit',
        		bodyStyle:'background-color:yellow',
        		items: [{
					xtype:'slides-fullview-list',
	//				hidden:true
				}]
        	},
			{
                xtype: 'slide-draw-component',		                                  
                itemId: 'free-paint',
                hidden:false,
                top: 0,
	            left: 0,
	            width:Ext.Viewport.getWindowWidth(),
	            height:Ext.Viewport.getWindowHeight()
            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	    			
        		thisView.loadSessionInformation();
        	}
		}	
    },
    
   /**
    * Load the session information and subscribe to events.
    */
    loadSessionInformation: function()
    {
    	 
		if (this.getEventSessionId() == null)
		{
			Ext.Msg.alert("Invalid Session!","No event session id information found!", Ext.emptyFn);    		
			return;
		}
		
		var me = this;
		var progressIndicator = Ext.create("Ext.ProgressIndicator",{msg:'Verifying session participant ... '});
		Ext.Ajax.request({
							url:Xedu.Config.getUrl(Xedu.Config.EVENT_SESSION_FULL_DETAILS)+this.getEventSessionId(),
				            method: 'GET',
				            progress: progressIndicator,			
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
						    	/*				               
				        		 * check if the session is valid 
				        		 */
				                console.log("Event schedule = "+ result.eventSchedule.eventTitle);
				        		var slidesMainView = me.down('slides-fullview-list');
				        		slidesMainView.setHidden(true);
				        		slidesMainView.setTitle(result.eventSchedule.eventTitle);
				        		
				        		/*
				        		 * subscribe to the session events.
				        		 * 
				        		 */
				        		me.subscribeToSessionEvents(result.eventSession);
						    	
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
						});
	    	    	
    	
    },
    
    /**
     * 
     * 
     */
    subscribeToSessionEvents: function(eventSession)
    {
    	var cntrller = Xedu.app.getController('Main');    	
    	var id = eventSession.eventSessionId;
    	var sessionEndpoint = '/topic/sessionmessages/'+id;
    	
    	var me = this;
    	
    	if (cntrller.getActiveSessionSubscription())
    		cntrller.getActiveSessionSubscription().unsubscribe();
    	    	
    	var subscription = Xedu.CommonUtils.subscribeToStompQueue(sessionEndpoint,function (msg) 
						    	{
						    	    console.log("+++++++++++++++ RECIEVED on ",msg);
						    	    var stompMsg = Ext.JSON.decode(msg.body);
						            Xedu.CommonUtils.showInDebugPanel(msg);
						            
						            switch(stompMsg.type) 
						    		{
						    			case 'ACTION_FAILED':
						    				Ext.Msg.alert("Error",stompMsg.msg, Ext.emptyFn);
						    				break;
						    			case 'ACTION_SESSION_JOIN':
						    				Ext.Msg.alert("Joined",stompMsg.msg, Ext.emptyFn);
						    				break;
						    			default:
						    				break;
						    		}
						            
						            
						            if (stompMsg.from != cntrller.getLoggedInUser().userId)
						            {
				    					var views = Ext.ComponentQuery.query("session-participants-view");
				    					if (views == null)
				    						return;
				    					
				    					var participantView = views[0];				    					
				    						
				    					
						            	switch(stompMsg.type) 
							    		{							    			
							    			case 'ACTION_DRAW':
							    				var canvas = participantView.down('slide-draw-component');
							    				if (canvas)
							    				{
	//						    					var spriteconfig = Ext.JSON.decode(stompMsg.msg);
							    					var e = Ext.JSON.decode(stompMsg.msg);
							    					canvas.drawDrag(e,true);
							    				}
							    				break;
							    			case 'ACTION_DRAW_START':
							    				var canvas = participantView.down('slide-draw-component');
							    				if (canvas)
							    				{
							    					var e = Ext.JSON.decode(stompMsg.msg);						    					
							    					canvas.drawStart(e,true);
							    				}
							    				break;
							    			case 'ACTION_DRAW_END':
							    				var canvas = participantView.down('slide-draw-component');
							    				if (canvas)
							    				{
	//						    					var e = Ext.JSON.decode(stompMsg.msg);						    					
							    					canvas.drawEnd(e,true);
							    				}
							    				break;
							    			case 'ACTION':
							    			{									           								            	
							    				var actionMsg = Ext.JSON.decode(stompMsg.msg);							    				
							    				var slideFullView =  participantView.down("slides-fullview-list");							    				
//								            	Xedu.app.getController('Main').redirectTo('view/'+actionMsg.route);
//						    					Ext.Msg.alert("Alert",actionMsg, Ext.emptyFn);
						    					var routesplit = actionMsg.route.split("/");
						    					var slideId = routesplit[3];
						    					var topicId = routesplit[1];
						    					slideFullView.setHidden(false);
						    					slideFullView.setTopicid(topicId);
						    					slideFullView.showSlideById(slideId);
	
							    			}
							    		}
						            }
						            else
						            	console.log("message from "+stompMsg.from);
						    	});
    	
    	/*
    	 * save the subscription in session
    	 */
    	cntrller.setActiveSessionSubscription(subscription);    	
    	

    },
    
    
});
