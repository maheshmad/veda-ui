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
	          'Xedu.view.classroom.ClassroomsList',
	          'Xedu.view.classroom.ClassroomMgmtMain',
	          'Xedu.view.classroom.ClassroomInSession',
	          'Xedu.view.chapter.ChaptersList'],	
	config:
	{								
		 /**
		 * @private
		 * @cfg {Xedu.model.UserModel} loggedInUser
		 * User information after he/she logins. Refer to the user model {@link Xedu.model.UserModel} 
		 */
	    loggedInUser: null,         
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
		
		before:
		{	
			showView:'authenticate',				
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
			'join/classroom/session/:enrollmentid':'showClassroomInSession',
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
        	action.resume();
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
    	this.getMainViewNavigation().reset();
    	var savedAction = this.getSaveAction();
    	if (savedAction)
    		this.redirectToView(savedAction.view,savedAction.p);
    	else
    	{
    		console.log("** No action found ...so redirecting to default view home");
    		this.redirectTo('home');
    	}
    },
    
    /*
     * showing home
     */
    showHome: function()
    {		    			    	            	
    	this.redirectToView("Home");   	      		    	
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
		var navtoview = Ext.ComponentQuery.query(viewClass);
		if (navtoview != null && navtoview[0] != null)
			navtoview[0].destroy();
		if (params)
			navtoview = Ext.create(viewClass,params);
		else
			navtoview = Ext.create(viewClass);
		
		this.getMainViewNavigation().push(navtoview); 
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
		
		navtoview = Ext.create('Xedu.view.Login',params);
		
		this.getMainViewNavigation().push(navtoview); 
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
	showClassroomInSession: function(enrollmentid)
	{
		var params = {'enrollmentid':enrollmentid,};
		this.showView('classroom.ClassroomInSession',params);
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
	
	showSlides: function(topicId)
	{
		var params = {'topicid':topicId};
		this.showView('slides.SlidesMain',params);
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
	/*
	 * logging off
	 */
	onSignOffCommand: function () 
	{
	        var me = this;
	        var authUrl = Xedu.Config.getUrl(Xedu.Config.AUTH_REST_SERVICE);
	        Ext.Ajax.request({
	            url: authUrl,
	            method: 'POST',
	            params: 
	            {
	                sessionToken: me.sessionToken
	            },
	            success: function (response) 
	            {        	            	
	            	var navtoviews = Ext.ComponentQuery.query('homecard');		    	
			    	if (navtoviews != null && navtoviews[0] != null)
			    	{
			    		console.log("removing home view from navigation");        			    		
    			    	this.getMainViewNavigation().pop(navtoviews[0],true);
    			    	this.getMainViewNavigation().reset();
			    	}
			    	else;        			    	
			    	     
	            },
	            failure: function (response) {

	                // TODO: You need to handle this condition.
	            }
	        });

	        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
	}
	
});			
