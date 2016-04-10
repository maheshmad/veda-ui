Ext.define('Xedu.CommonUtils',
{		
	alias:'CommonUtils',	
	singleton: true,
	ns:'Xedu',
	
	checkServiceError: function(response)
    {
    	if (response && response.errorInfo)
    	{
    		var msg = "The following errors occured! Please check your input! <br /><br />";
    		if (response.errorInfo.errors)
    		{
    			for (var i=0;i<response.errorInfo.errors.length;i++)
    			{
    				msg += response.errorInfo.errors[i].errorMsg+"<br /><br />";
    			}
    		}
    		else;
    		
    		Ext.Msg.alert("Errors",msg,Ext.emptyFn);
    	}
    },
	
	checkHTTPOperation: function(resp)
    {
    	if (!resp)
    		return;
    	
    	if (resp.status)
    	{
    		var showMsg = "";
    		var showTitle = "ERROR"; /* default */
    		var showIconCls = "error-generic-icon-cls"; /* default */
    		
    		switch(resp.status) 
    		{
    			case 200:
    				break;
    			case 401:
	    	    	showMsg = "Sorry! You do not have sufficient privileges to access this feature! <br/> <br/>Please contact your administrator if you think this is an error! ";	    	        
	    	        showTitle = "UNAUTHORIZED";
	    	        showIconCls = "error-unauth-icon-cls";
	    	        break;
	    	    case 405:
	    	    	showMsg = "Sorry! This operation is not valid! Please check again! ";	    	        
	    	        showTitle = "NOT ALLOWED";
	    	        showIconCls = "error-unauth-icon-cls";
	    	        break;	    	        
	    	    default:
	    	    	showMsg = "Sorry! An exception occured while trying to perform this operation , reason = "+operation.error.statusText+
	    	    					"<br /><br /> Please contact support for further assistance";	    	    		    	    
    		}        
	    	 
    		Ext.Msg.alert(showTitle,showMsg, Ext.emptyFn);
    	}    	
    	
    	
    	
    }
		
});


