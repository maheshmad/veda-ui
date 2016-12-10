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
    	else if (response && (response.status || response.msg) && isNaN(response.status))
    	{
    		console.log("response status = "+response.status+", msg= "+response.msg)    		
    	}
    	else	
    		this._checkHTTPOperation(response);
    },
	
    /*
     * this is private method,
     * call checkServiceError to invoke this
     */
	_checkHTTPOperation: function(resp)
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
    			case 404:
	    	    	showMsg = "Sorry! The server could not be reached! Please try after sometime or contact support! ";	    	        
	    	        showTitle = "Server error!";
	    	        showIconCls = "error-unauth-icon-cls";
	    	        break;
    			case 405:
	    	    	showMsg = "Sorry! This operation is not valid! Please check again! ";	    	        
	    	        showTitle = "NOT ALLOWED";
	    	        showIconCls = "error-unauth-icon-cls";
	    	        break;
	    	    case 503:
	    	    	showMsg = "Sorry! The server is currently unavailable to process your request! <br /> Please try again or contact support! ";	    	        
	    	        showTitle = "Server maintainence";
	    	        showIconCls = "error-unauth-icon-cls";
	    	        break;	   
	    	    default:
	    	    	showMsg = "Sorry! An exception occured while trying to perform this operation , reason = "+resp.status+
	    	    					"<br /><br /> Please contact support for further assistance";	    	    		    	    
    		}        
	    	 
    		Ext.Msg.alert(showTitle,showMsg, Ext.emptyFn);
    	}    	
    	
    	
    	
    },
    
    /**
     * 
     */
    showOverlay: function(showPanel,options)
    {
    	var scope = this;
    	var widthOpt = '65%'; /* default */
    	var heightOpt = '80%';    	
    	var closable = false;
    	var cls = '';
    	var showByItemEl = null;
    	var modal = true;
    	var showHeader = false;
    	var titleOpt = "";
    	var callBackFunction = Ext.emptyFn;
    	var callBackScope = null;
    	/**
    	 * @Param closeActionFn:
    	 * Callback function when close button on the overlay is clicked
    	 */
    	var closeActionFn = null;
    	    	
    	if (typeof options != 'undefined')
    	{
    		if (typeof options.width != 'undefined')
    			widthOpt = options.width;
    		if (typeof options.height != 'undefined')
        		heightOpt = options.height;
    		if (typeof options.closable != 'undefined')
    		{
    			closable = options.closable;
    			showHeader = options.closable;
    		}
    		if (typeof options.cls != 'undefined')
    			cls = options.cls;
    		if (typeof options.modal != 'undefined')
    			modal = options.modal;
    		if (typeof options.showBy != 'undefined')
    		{
    			showByItemEl = options.showBy;
    		}
    		if (typeof options.title != 'undefined')
    			titleOpt = options.title;
    		
    		if (options.callme)
    		{
    			callBackFunction = options.callme;
    			if (options.callmeScope)
        			callBackScope = options.callmeScope;
        		else
        			console.error("callmeScope is missing!  Please provide a callback scope");
    		}    		
    		
    		
    		if (options.closeActionFn)
    		{
    			closeActionFn = options.closeActionFn;
    			if (options.callbackScope)
        			callBackScope = options.callbackScope;
        		else
        			console.error("callbackScope is missing!  Please provide a callback scope, if you have a closeActionFn is taken");
    		}
    			
    	}
    	else;
    	
    	try
    	{
	    	if (scope.overlay) 
	    		scope.overlay.destroy();
    	}
    	catch(e)
    	{
    		console.log(e);
    	}
    	    
    	scope.overlay = Ext.Viewport.add({            					
						                xtype:'panel',
						                layout:'fit',
						                itemId:'overlay-id',
						                modal: true,
						                autoDestroy:true,
						                hideOnMaskTap: false,
						                showBy:showByItemEl,
						                showAnimation: 
						                {
						                    type: 'popIn',
						                    duration: 250,
						                    easing: 'ease-out'
						                },
						                hideAnimation: 
						                {
						                    type: 'popOut',
						                    duration: 250,
						                    easing: 'ease-out'
						                },
						                centered: true,
						                width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : widthOpt,
						                height: Ext.filterPlatform('ie10') ? '30%' : Ext.os.deviceType == 'Phone' ? 220 : heightOpt,				               
						                items:[
						                    {
						                        docked: 'top',
						                        xtype: 'toolbar',
						                        title: titleOpt,
						                        items:[{
															xtype:'button',
															text:'close',
														    handler: function (but,action,eOpts) 
														    {
														    	Xedu.CommonUtils.closeOverlay(scope);														    	
														    }
														}]
						                    },
//						                    showPanel
						                ],
						                listeners:
						                {						                	
						                	hide: function()
						                	{						                		
						                		if (closeActionFn && typeof(closeActionFn) === "function") 
										    	{
						                			console.log("overlay destroyed....calling back closeActionFn");	
						                			closeActionFn(callBackScope);
										    	}
						                	}
						                },
						                scrollable: true
						            });
        
    	scope.overlay.show();
    	var addPanel = Ext.create(showPanel.xtype,showPanel);
    	scope.overlay.add(addPanel);
    	addPanel.show();
    },
    
    
    /**
     * 
     */
    showOverlay2: function(showPanel,showByEl)
    {
    	try
    	{
	    	if (this.overlay) 
	    		this.overlay.destroy();
    	}
    	catch(e)
    	{
    		console.log(e);
    	}
    	
    	this.overlay= Ext.Viewport.add(showPanel);
    	if (showByEl)
    		this.overlay.showBy(showByEl);
    	else
    		this.overlay.show();
    },
    
    
    closeOverlay: function(scope)
    {
    	if (scope.overlay) 
    		scope.overlay.hide();
    },
    
    getLoggedInUserId: function()
    {
    	var cntrller = Xedu.app.getController('Main');	   
		if (cntrller.getLoggedInUser())
			return cntrller.getLoggedInUser();
		else
			return null;
    },
    
    getSessionInfo: function()
    {
    	var cntrller = Xedu.app.getController('Main');	   
		if (cntrller.getSessionInfo())
			return cntrller.getSessionInfo();
		else
			return null;
    },
    
    filterStore: function(searchOnlist,searchvalue)
    {
    	/*
    	 * search with the store
    	 */
    	searchOnlist.getStore().clearFilter();
    	searchOnlist.getStore().filter(function(rec)
		{
			var searchOnString = "";
			var recData = rec.getData();
			for(var val in recData)
			{
				searchOnString += " "+recData[val];  
			}
			
//			console.log("search on string ="+searchOnString + " on "+searchvalue);
			searchOnString = searchOnString.toLowerCase();
			searchvalue = searchvalue.toLowerCase();				
			if (searchOnString.indexOf(searchvalue) > -1)
				return true;
			else
				return false;
			
		});		
    },
    
    /**
     * util to send socket event messages
     */
    sendSocketEvent: function(event)
    {
    	var cntrller = Xedu.app.getController('Main');	   
		if (cntrller.wsConn == null)
		{
			console.log("socket connection not available ! So reconnecting.....");
			cntrller.establishSocketConnection();
		}
		else
		{
			console.log("sending event message...."+Ext.JSON.encode(event.getData()));
			cntrller.wsConn.send(Ext.JSON.encode(event.getData()));
		}
    }
    
    
    
		
});


