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
	          'Xedu.view.classroom.ClassroomsList',
	          'Xedu.view.classroom.ClassroomMgmtMain',
	          'Xedu.view.chapter.ChaptersList'],	
	config:
	{					
			before:
			{	
				showView:'authenticate'
			},
			refs:
			{											
				mainViewNavigation:'mainview',			
				loginView: 'loginview',										
			},
			routes:
			{
				'view/:id':'showView',
				'config':'showConfig',
				'logoff':'logout',
				'update/password/:token':'chgPassword',				
				/*
				 * classroom
				 */
				'view/classroom/list':'showClassrooms',
				'view/classroom/:id/main':'showClassroomMgmt',
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
		if (Xedu.app.getLoggedInUser() != '')		        
        	action.resume();
        else
        	this.showLogin(action);
    },
    
    /*
     * show Login page
     */
    showLogin: function()
    {
    	console.log(" showing login screen....");
    	this.showView('Login');
    },
    
    /*
     * logoff
     */
    logout: function()
    {
    	this.getMainViewNavigation().reset();
    	var params = {'initiateLogout':true};
		this.showView('Login',params);
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
     * showing home
     */
    showHome: function()
    {		    			    	            	
    	console.log(" TO DO show home");    	      		    	
    },
    
    /*
     * 
     * show view
     */
	showView: function(toview,params)
	{
		console.log("about to render "+toview+" param = "+params);
		var viewClass = 'Xedu.view.'+toview;
		var navtoview = Ext.ComponentQuery.query(toview);
		if (navtoview != null && navtoview[0] != null)
			navtoview[0].destroy();
		if (params)
			navtoview = Ext.create(viewClass,params);
		else
			navtoview = Ext.create(viewClass);
		
		this.getMainViewNavigation().push(navtoview); 
	},
	
	/*
	 * show enrollment
	 */
	showEnrollmentEditForm: function(id1,id2)
	{
		var params = {};
		if (!id2)
			var params = {'userRecordId':userRecordId,'classroomid':classid};
		var params = {'userRecordId':userRecordId,'classroomid':classid};
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
	
	/*
	 * redirect is similar to showView except for the fact that
	 * it will pop the existing view so that there is no back button
	 * also, this will not hit the before filter . 
	 */
	redirectToView: function(toview)
	{
		var viewClass = 'Xedu.view.'+toview;
		console.log('redirecting to view '+viewClass);
		var navtoview = Ext.get(viewClass);
		if (navtoview == null)
			navtoview = Ext.create(viewClass);
		else;
		this.getMainViewNavigation().pop();
		this.getMainViewNavigation().push(navtoview);        		        			
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
