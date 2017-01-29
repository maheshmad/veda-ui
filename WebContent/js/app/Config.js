Ext.define('Xedu.Config',
{		
	alias:'Config',	
	singleton: true,
	/**
	 * @private
	 * @cfg {Xedu.model.AppConfigs} flags
	 * Loaded server config flags 
	 */
	AppConfigs:null,
//	statics:
//	{
		ns:'Xedu', /* namespace used to create a new view
		/*
		 * Base URL
		 */		
		REST_SERVICES_APP_CONTEXT_ROOT:'/veda',
							
		/*
		 * services
		 *  
		 */
		SOCKET_SERVICE:'/io/',
		SPRING_SOCKET_SERVICE:'/hello/',
		EVENT_SESSION_SOCKET_SERVER:'/veda-eventsession-wsocket',
		/* 
		 * security 
		 */
		AUTH_SERVICE:'/api/auth/login',
		AUTH_FORGOT_PASSWORD_SERVICE:'/api/auth/forgotpassword',
		AUTH_USER_SERVICE:'/api/auth/user',
		AUTH_USER_LOGOUT:'/api/auth/logoff',
         
		/*
		 * course
		 */
		COURSE_SEARCH:'/api/course/search',
		COURSE_API:'/api/course/',
		CHAPTERS_SEARCH:'/api/chapter/search',
		CHAPTER_API:'/api/chapter/',
		TOPIC_API:'/api/topic/',
		TOPICS_SEARCH:'/api/topic/search',
		/*
		 * slides
		 */
		SLIDES_LIST_SEARCH_BY_TOPIC:'/api/slides/topic/',
		SLIDE_IMAGE_THUMB:'/api/slides/image/thumb/',
		SLIDE_IMAGE_LARGE:'/api/slides/image/large/',
		SLIDE_CONTENT_UPLOAD:'/uploadslides',
		SLIDE_GENERATE:'/api/slides/generate/{topicid}/{uploadedfileid}',
		/*
		 * config
		 */
		CONFIG_SECTIONS:'/api/config',
		CONFIG_UPDATE_SERVICE:'/api/config',
		CONFIG_SECTIONS_KEYVAL:'/api/config/keyval',
		/*
		 * users
		 */
		USER_SEARCH_SERVICE:'/api/user/search',
		USER_SERVICE:'/api/user',
		CHG_PASSWORD_SERVICE:'/api/auth/updatepassword',
		UPLOAD_PROFILE_IMAGE_SERVICE:'/upload_profile_image',
		PROFILE_IMAGE_THUMB_SERVICE:'/api/user/image/large/',
		ALLOWED_ACTIONS_API:'/api/user/allowedactions/{recordType}/{recordId}',
		/*
		 *classroom 
		 */
		CLASSROOM_API:'/api/classroom/',
		CLASSROOM_SEARCH:'/api/classroom/search',
		/*
		 * enrollment
		 */
		ENROLLMENT_API:'/api/enrollment/',
		CLASSROOM_ENROLLED_STUDENTS_SEARCH:'/api/enrollment/search',
		STUDENT_ENROLLED_CLASSES_SEARCH:'/api/enrollment/search',
		/*
		 * event/class schedule
		 */
		EVENT_SCHEDULE_API:'/api/eventschedule',
		CLASSROOM_SCHEDULE_SEARCH:'/api/eventschedule/search',
		STUDENT_SCHEDULE_SEARCH:'/api/eventschedule/search',
		
        /*
		 * set to true if the security needs to be switched off
		 * you will not see the login screen. 
		 * Should be only used to facilitate development.
		 */
		disable_security:false,
		
		/*
		 * builds and returns the restful service's url
		 */
//	},
		getUrl:function(serv)
		{									
			if (!serv)
				return "";
			
			var protocol = window.location.protocol.indexOf("https:")=== 0?"https":"http";
			/*
			 * for socket service the protocol will 
			 */
			if (serv.indexOf('/io') > -1)			
				protocol = window.location.protocol.indexOf("https:")=== 0?"wss":"ws";
			
			if (serv.indexOf("ws:/") > -1)
			{
				protocol = window.location.protocol.indexOf("https:")=== 0?"wss":"ws";
				serv = serv.replace("ws:/",'');
			}
			
			if (serv.indexOf("https://") > -1 || serv.indexOf("http://") > -1 || serv.indexOf("ws://") > -1 || serv.indexOf("wss://") > -1)
				return serv;
			else if (serv.indexOf(".com") > -1)
				return protocol+"://"+serv;
			else
				return protocol+"://"+window.location.host+this.REST_SERVICES_APP_CONTEXT_ROOT+serv;

			//return this.REST_SERVICES_APP_CONTEXT_PATH+serv; /* only to be used for UI local dev testing */
		},
		
		/**
		 * 
		 */
		getAppConfigs: function()
	    {
	    	return this.appConfigs;
	    },
	    
	    /**
	     * 
	     */
	    setAppConfigs: function(acfgs)
	    {
	    	this.appConfigs = acfgs;
	    },
	    
	    /**
	     * The server config is loaded using this 
	     * function
	     */
	    loadAppConfigs: function()
	    {
	    	console.log("loading app configs"); 
	    	var me = this;	
	    	var authUrl = Xedu.Config.getUrl(Xedu.Config.CONFIG_SECTIONS_KEYVAL);       	
	    	Ext.Ajax.request(
		            {
		                url:authUrl ,
		                method: 'GET',	                
		                scope:this,	               
		                callback: function(response,success,operation)
		                {	                		                	
		                	var respObj = null;
		                	if (operation.responseText && operation.responseText != "" && operation.responseText.indexOf("<html>") == -1)
		                	{
		                		try
		                		{
		                			respObj = Ext.JSON.decode(operation.responseText);
//		                			console.log("config value = "+ respObj["GENERAL_DOMAIN_ROOT"]); /* this is to test */
		                		}
		                		catch(e)
		                		{
		                			/* ignore the error */
		                			console.log(e);	                			
		                		}
		                	}
		                	
		                	if (respObj !=null)
		                	{
		                		me.setAppConfigs(respObj);
		                	}
		                	
		                }
		                
		            });   
	    },		
		
	    /**
	     * get the config value 
	     */
		getConfigValue: function(cfgkey)
		{
			var configs = this.getAppConfigs();						
			return configs[cfgkey];
		}
		
				
//	}	
});
