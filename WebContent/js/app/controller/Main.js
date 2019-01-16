Ext.define('Xedu.controller.Main',
{
	extend: 'Ext.app.Controller',
	requires:['Xedu.Config',
	          'Xedu.view.slides.SlidesMain',
	          'Xedu.view.config.ConfigMain',
	          'Xedu.view.slides.ContentUpload',
	          'Xedu.view.users.UserMgmtMain',
	          'Xedu.view.course.CourseMgmtMain',
	          'Xedu.view.ChangePassword',
	          'Xedu.view.Home',
	          'Xedu.model.EventModel',
	          'Xedu.view.session.SessionParticipantsView',
	          'Xedu.view.slides.SlidesFullViewList',
	          'Xedu.view.classroom.ClassroomsList',
	          'Xedu.view.classroom.ClassroomMgmtMain',
	          'Xedu.view.classroom.ClassroomInSession',
	          'Xedu.view.chapter.ChaptersList'],	
	config:
	{								
		 /**
		 * @private
		 * @cfg  loggedInUser
		 * User information after he/she logins. Refer to the user model {@link Xedu.model.UserModel} 
		 */
	    loggedInUser: null,
	    /**
		 * @private
		 * @cfg {Xedu.model.SessionInfoModel} sessionInfo
		 * Logged in session information of the logged in user. Refer to the user model {@link Xedu.model.SessionInfoModel} 
		 */
	    sessionInfo: null,	 
	    /**
		 * @private
		 * Web socket connection , this is set when the page is loaded initially
		 */
	    wsConn: null,
	    /**
		 * @private
		 * Stomp socket connection , this is set when the page is loaded initially
		 */
	    stompClient: null,
	    /**
		 * @private
		 * @cfg {string} saveAction
		 * this is used to save the action navigation action performed by the user. This will be used as a redirection 
		 * after the login.
		 * @param {String} view 
		 * the view to which the redirection happen
	     * @param {Array} p
	     * the params that have to be passed to the view after redirection
		 */
	    saveAction:null,
	    
	    /**
		 * @private
		 * @cfg {string} activeSessionSubscription
		 * Users have an option to join a session, and when they do , a session id is
		 * required for broadcasting their actions. Only one session can be started at any given point of time.  
		 * 
		 * 
		 */
	    activeSessionSubscription:null,
	    
	    /**
		 * @private
		 * @cfg {string} presenterTopicEndpoint
		 * Users have an option to start their own session, and when they do , this presenterTopicEndpoint will hold the topic endpoint and 
		 * all the events are broadcasted to this topic
		 * 		  
		 */
	    presenterTopicEndpoint:false,
	    
		
		before:
		{	
			showView:'authenticate',
			showHome:'authenticate',
		},
		refs:
		{											
			mainViewNavigation:'mainview',			
			loginView: 'loginview',										
		},
		routes:
		{
			'home':'showHome',
			'view/:id':'showView',
			'config':'showConfig',
			'logoff':'logout',
			'update/password/:token':'chgPassword',				
			/*
			 * classroom
			 */
			'view/classroom/list':'showClassrooms',
			'view/classroom/:id/main':'showClassroomMgmt',
			'view/join/classroom/session/:eventsessionid':'showClassroomInSession',
			'view/join/participants/session/:eventsessionid':'showSessionForParticipants',
			/*
			 * users
			 */
			'view/manage/users':'showUserMgmt',
			'view/user/:id':'showUserDetails',
			/*
			 * courses
			 */
			'view/course/list':'showCourses',
			'view/course/:id/main':'showCourseMgmt',
			'view/course/:id/chapters':'showChapters',
//				'view/course/:cid/chapter/:chpid/topics':'showTopics',
			'view/chapter/:chpid/topics':'showTopics',
			'view/topic/:topicid':'showSlides',
			'view/topic/:topicid/slide/:slideid':'showSlideFullView',
			'view/course/:cid/chapter/:chpid/topic/:topicid/upload':'uploadSlides',
//				'view/course/:cid/chapter/:chpid/topic/:topicid':'showSlidesMain',
			'open/:applid':'openApplicationView',
			'edit/:applid':'editApplicationInfo',
			'search/name/:param':'showSearchResults',
			/*
			 * enrollment
			 */	
			'view/enrollment/user/:userrecordid/classroom/:classid':'showEnrollmentEditForm',
			'edit/enrollment/:enrollmentid':'showEnrollmentEditForm',
			/*
			 * schedule
			 */	
			'view/eventschedule/edit/:id':'showEventScheduleEditForm',			
		}
									
	},
	
	/**
	 * 
	 * check user login before 
	 * processing the request.
	 */
	authenticate: function(action) 
	{
		//alert(Xedu.app.getLoggedInUser());
        /*
         * if the user is not logged in , it will stay on the login page otherwise the action will
         * resume
         */
		console.log(" checking user info....");
		if (this.getLoggedInUser())
		{	
			
			var navtoview = Ext.Viewport.down('loginview');
			if (navtoview != null)
			{
				console.log("about to destroy login view .....");
				Ext.Viewport.remove(navtoview,true);
				Ext.Viewport.setActiveItem(0);
			}
			action.resume();
		}
        else
        	this.showLogin();
    },
    
    /**
     * 
     */
    verifyLoggedInUser: function(toview,params)
    {
    	console.log("about to verify user ...");
    	if (this.getLoggedInUser() == null)
		{			
			this.setSaveAction({'view':toview,'p':params});
			this.showLogin();
			return false;
		}
		else
		{
			console.log(this.getLoggedInUser().id);
			return true;
		}
    },
    
    /**
     * 
     */
    resumeSavedAction: function()
    {
		console.log("inside resumeSavedAction...");
//		this.getMainViewNavigation().removeAll();
//		this.getMainViewNavigation().pop(this.getMainViewNavigation().getInnerItems().length);    	

        var result = this.establishSocketConnection();

    	var savedAction = this.getSaveAction();
    	if (savedAction && savedAction != '' && savedAction != null)
    		this.redirectToView(savedAction.view,savedAction.p);
    	else
    	{
    		console.log("** No action found ...so redirecting to default view home");
    		this.redirectTo('home');
    	}
    },
    
    /*
     * socket connection event
     */
    establishSocketConnection: function()
    {
    	console.log("trying to establish stomp socket connection!!!!");
    	var sessionInfo = Xedu.CommonUtils.getSessionInfo();    	
    	var sock = new SockJS(Xedu.Config.getUrl(Xedu.Config.EVENT_SESSION_SOCKET_SERVER));
    	this.stompClient = Stomp.over(sock);
    	var autoReconnect = true;
    	var mainCntrller = this;
    	var thisStompClient = this.stompClient;

    	this.stompClient.connect(Ext.Ajax._defaultHeaders, function (frame) 
    	{
            console.log('Connected: ' + frame);
            Xedu.CommonUtils.showInDebugPanel(frame);

            Xedu.CommonUtils.subscribeToStompQueue('/topic/general_app_message_topic',function (msg) 
	        {
	            console.log("---------------- RECIEVED generic message",msg);
	            var stompMsg = Ext.JSON.decode(msg.body);
	            Xedu.CommonUtils.showInDebugPanel(msg);
	            
	            switch(stompMsg.type) 
	    		{
	    			case 'ACTION_FAILED':
	    				Ext.Msg.alert("Error#MC-ESC-1000",stompMsg.msg, Ext.emptyFn);
	    			default:
	    				Ext.Msg.alert("Error#MC-ESC-1001",stompMsg.msg, Ext.emptyFn);    		
	    		}
	            	
	        }); 
                                     
            
        },function(message) 	
        {
//        	console.error(message);

        	Xedu.CommonUtils.showInDebugPanel(message);
        	if (message.indexOf("Lost connection") > -1)
        	{
	        	if (autoReconnect)
	        	{
	        		var task = Ext.create('Ext.util.DelayedTask', function () 
	        		     {
	        		    	 var cntrller = Xedu.app.getController('Main');
	        		    	 cntrller.establishSocketConnection();
	        		     });
	        		
	        		console.log("will trying to auto reconnect in 3 secs.....");
	        		task.delay(3000);
	        		
	        	}
        	}
        });
    	
    	
//    	 var event = Ext.create('Xedu.model.EventModel',{});
//         event.set("type","ACTION");
//         event.set("msg","HI"); 
//         stompClient.send("/veda/process-event-session-msg", {}, Ext.JSON.encode(event.getData()));
//         
//    	sock.send(Ext.JSON.encode(event.getData()));
//    	sock.close();
    	return true;
    	
    },
    
    /*
     * showing home
     */
    showHome: function()
    {		    			    	            	    	
    	console.log("about to redirect to home");
    	this.resetMainViewNavigation();
    	this.getMainViewNavigation().setActiveItem('home');
    	Ext.ComponentQuery.query('home')[0].reloadData(); /* activate to trigger reload */   	      		    	
    },
    
    /*
     * 
     * show view
     */
	showView: function(toview,params)
	{
		if (!this.verifyLoggedInUser(toview,params))
			return;
		
		console.log("inside showView about to render "+toview+" param = "+params+" user role = "+this.getLoggedInUser().userrole);
		var viewClass = 'Xedu.view.'+toview;
//		var navtoview = Ext.ComponentQuery.query(viewClass);
//		if (navtoview != null && navtoview[0] != null)
//			navtoview[0].destroy();
		if (params)
			navtoview = Ext.create(viewClass,params);
		else
			navtoview = Ext.create(viewClass);
		
		this.getMainViewNavigation().push(navtoview); 
		this.getMainViewNavigation().setActiveItem(navtoview);
		navtoview.show();

	},
	
	/*
	 * show view by section
	 */
	showSectionView: function(toViewWithParams, params)
	{
		console.log("about to process routing for view = "+toViewWithParams+", params="+params);
		var paramdelimiter = toViewWithParams.indexOf(";");
		var viewid = paramdelimiter > -1 ? toViewWithParams.substr(0,paramdelimiter):  toViewWithParams;
		var params = {};
		this.showView(viewid,params);
		
	},
	
	/*
	 * redirect is similar to showView except for the fact that
	 * it will pop the existing view so that there is no back button
	 * also, this will not hit the before filter . 
	 */
	redirectToView: function(toview,params)
	{
		this.getMainViewNavigation().pop();
		this.showView(toview,params);
		        		        			
	},
	
    /*
     * show Login page
     */
    showLogin: function(params)
    {
    	console.log(" redirecting to login screen....");    	
    	var navtoview = Ext.ComponentQuery.query('loginview');
		if (navtoview != null && navtoview[0] != null)
			navtoview[0].destroy();
		
		navtoview = Ext.create('Xedu.view.Login');
//		Ext.Viewport.removeAll(true,true);
		Ext.Viewport.add(navtoview);
//		this.getMainViewNavigation().push(navtoview); 
		navtoview.show();
    },
    
    /*
     * logoff
     */
    logout: function()
    {
    	console.log("logging out user");
    	
    	this.setLoggedInUser(null); 
    	this.getMainViewNavigation().removeAll();
    	var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_USER_LOGOUT);
   	 	Ext.Viewport.mask({msg:"Logging out..."});
    	
    	Ext.Ajax.request({
	    	 url:authUrl,
	    	 method: 'POST',
	         headers: { 'Content-Type': 'application/json' },				            
	         success: function(resp, conn) 
	         {	                                    	        	 
	        	 Ext.Viewport.setMasked(false);
	        	 var response = Ext.JSON.decode(resp.responseText);
	        	 var cntrller = Xedu.app.getController('Main');	                                    
	             if (response.status == 'SUCCESS') 
	             {                        	              	       
	            	console.log("Logout.....success ");	            		  
	             } 
	             else; 
	         },
	         failure: function() 
	         {
	        	 Ext.Viewport.setMasked(false);
	         }
    	});
    	
    	this.resetMainViewNavigation();
    	this.showLogin();
    },
    
    /*
     * logoff
     */
    chgPassword: function(p)
    {
    	console.log("recived p = "+p)
    	var params = {'authToken':p};
		this.showView('ChangePassword',params);
    },
    
    /*
    * show Login page
    */
    showConfig: function()
    {
    	console.log(" showing config screen....");
    	this.showView('config.ConfigMain');
    },
  
	/*
	 * show enrollment
	 */
	showEnrollmentEditForm: function(id1,id2)
	{
		var params = {};
		console.log(" param 1 = "+id1+" param 2 "+id2);
		if (id2)
			params = {'userRecordId':id1,'classroomid':id2};
		else
			params = {'enrollmentid':id1};
		this.showView('classroom.EnrollmentEditForm',params);
	},
	/*
	 * show event schedule
	 */
	showEventScheduleEditForm: function(id, p)
	{					
		console.log(p);
		var	params = {'eventScheduleId':id,'previewOnly':false};
		this.showView('schedule.ScheduleDetailsPreview',params);	
	},
	/*
	 * show user management
	 */
	showUserMgmt: function(param)
	{
		this.showView('users.UserMgmtMain',param);
	},
	/* 
	 * show user details
	 */
	showUserDetails: function(param)
	{
		var params = {'userid':param};
		this.showView('users.UserDetailsView',params);
	},
	/* 
	 * show classroom management main
	 */
	showClassroomMgmt: function(classroomId)
	{
		var params = {'classroomid':classroomId};
		this.showView('classroom.ClassroomMgmtMain',params);
	},
	
	/*
	 * show classroom in session
	 */
	showClassroomInSession: function(eventSessionId)
	{
		var params = {'eventSessionId':eventSessionId};
		this.showView('classroom.ClassroomInSession',params);
	},
	
	
	showSessionForParticipants: function(eventSessionId)
	{
		var params = {'eventSessionId':eventSessionId};
		this.showView('session.SessionParticipantsView',params);
	},
	
	/*
	 * show classrooms
	 */
	showClassrooms: function(param)
	{
		this.showView('classroom.ClassroomsList',param);
	},
	
	/* 
	 * show course management main
	 */
	showCourseMgmt: function(courseId)
	{
		var params = {'courseid':courseId};
		this.showView('course.CourseMgmtMain',params);
	},
			
	/*
	 * show courses
	 */
	showCourses: function(param)
	{
		this.showView('course.CoursesList',param);
	},
	
	
	showChapters: function(courseId)
	{
		var params = {'courseid':courseId};
		this.showView('chapter.ChaptersList',params);
	},
	
	showTopics: function(chapterId)
	{
		var params = {'chapterid':chapterId};
		this.showView('topic.TopicsList',params);
	},
	
	/**
	 * show slides
	 */
	showSlides: function(topicId,slideId)
	{		
		var params = {'topicid':topicId,"slideid":slideId};
		this.showView('slides.SlidesMain',params);
	},
	
	showSlideFullView: function(topicId,slideId)
	{		
		var params = {'topicid':topicId,"slideid":slideId,"classroomSessionMode":true};
		this.redirectToView('slides.SlidesMain',params);
	},
	
	/**
	 * upload slides
	 */
	uploadSlides: function(courseId,chapterId,topicId)
	{
		var params = {'courseid':courseId,'chapterid':chapterId,'topicid':topicId};
		this.showView('slides.ContentUpload',params);
	},
	
	
	showGlobalMenu: function (button)
	{            				            						
		Ext.Viewport.toggleMenu('right');
		
	},
	redirectToUrl: function(el,record)
	{
		var toUrl = record.get('navUrl');        		
		this.redirectTo(toUrl);        		
		Ext.Viewport.toggleMenu('right');
	},        	        	
	
	
	/**
	 * this removes all the panels in the 
	 * main navigation view 
	 * 
	 */
	resetMainViewNavigation: function()
	{		
		var items = this.getMainViewNavigation().getInnerItems();
		this.getMainViewNavigation().getLayout().setAnimation(false);
		console.log("about to reset items in navigation items ="+items.length);
		//		this.getMainViewNavigation().pop(items.length - 2);
		for (i=items.length -1 ;i>0;i--)
		{			
			if (items[i].xtype != 'home')  /* dont remove home*/
			{
				console.log("...............removing inner item ="+items[i].xtype);
				this.getMainViewNavigation().removeInnerAt(i);
			}
			else
				console.log("reached home...");
		}		
		this.getMainViewNavigation().getLayout().setAnimation(true);
	},
	
	/*
 	 * set auth header for all requests going forward
 	 */
	setAuthorizationHeader: function(token)
	{		
		this.xAuthToken = token;
		Ext.Ajax._defaultHeaders = 
		{	             	       
				'X-Authorization':token
		};
	}
	
});			
