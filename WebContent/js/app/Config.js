Ext.define('Xedu.Config',
{		
	alias:'Config',	
	singleton: true,
//	statics:
//	{
		ns:'Xedu', /* namespace used to create a new view
		/*
		 * Base URL
		 */		
		REST_SERVICES_APP_CONTEXT_ROOT:'/veda',
							
		/*
		 * services
		 */
		/* 
		 * security 
		 */
		AUTH_SERVICE:'/api/auth/login',
         
		/*
		 * course
		 */
		COURSE_SEARCH:'/api/course/search',
		CHAPTERS_SEARCH:'/api/chapter/search',
		
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
			
			
			if (serv.indexOf("https://") > -1 || serv.indexOf("http://") > -1 || serv.indexOf("ws://") > -1 || serv.indexOf("wss://") > -1)
				return serv;
			else if (serv.indexOf(".com") > -1)
				return protocol+"://"+serv;
			else
				return protocol+"://"+window.location.host+this.REST_SERVICES_APP_CONTEXT_ROOT+serv;

			//return this.REST_SERVICES_APP_CONTEXT_PATH+serv; /* only to be used for UI local dev testing */
		}
				
//	}	
});
