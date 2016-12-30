Ext.define('Xedu.view.users.AllowedActionsMenu', 
{
	extend:'Ext.Panel',
	xtype:'allowed-actions-menu',
	requires: [		    		    		    
		    'Xedu.store.AllowedActionsStore'
		    ],
    config: 
    {        
        fullscreen:true,
        /**
    	 * @cfg recordType
    	 * Type of record that the actions needs to be performed
    	 * example: EVENTSCHEDULE, USER, COURSES etc
    	 */    	
        recordType:null,
        /**
    	 * @cfg recordId
    	 * the record id
    	 */
        recordId:null,
        /**
    	 * @cfg callbackScope
    	 * this needs to be attached for the callback to track back the operation 
    	 */
        callbackScope: null,
        /**
    	 * @cfg callbackOnSelect
    	 * this function will be called when the user makes the selection 
    	 */
        callbackOnSelect: null,
        /**
    	 * @cfg closeOnSelect
    	 * the overlay panel will be closed as soon as the user makes a selection
    	 * default: true
    	 */
        closeOnSelect: true,
        layout:
        {
        	type:'vbox',
        	pack:'start'
        },
    	items:[        	                 
               {
			    	xtype:'list',
            	    itemId:'allowed-actions-list-id', 			        
			        scrollable: true,
			        flex:1,
			        autoDestroy:true,
			        store: 
			        {
			        	type:'allowed-actions-store'
			        },			      
			        itemTpl: [
			                  '<div>',
			                  '		<span class="x-button-icon x-shown compose"></span>',
			                  '		<span>{type}</span>',
			                  '</div>',
			              ],        
			        listeners:
			        {
						itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped on action id = "+record.data.id);
							scope.up('allowed-actions-menu').actionSelected(record);
						}
					}
               }],
       listeners:
        {			
			show: function(thisView)
			{
				thisView.loadActions();
			}
		}
		            
    },
       
    /*
     * load course
     */
    loadActions: function()
    {    	
    	console.log("Loading actions for record id ="+this.recordId+" type = "+this.recordType);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	var me = this;
    	var apiurl = Xedu.Config.getUrl(Xedu.Config.ALLOWED_ACTIONS_API);
    	apiurl = apiurl.replace("{recordType}",this.getRecordType());
    	apiurl = apiurl.replace("{recordId}",this.getRecordId());
    	me.down("list").getStore().getProxy().setUrl(apiurl);
    	me.down("list").getStore().load();
//    	Ext.Ajax.request({
//							url:apiurl,
//				            method: 'GET',
//				            progress: progressIndicator,			
//				            headers: { 'Content-Type': 'application/json' },				            
//				            success: function(response, conn, options, eOpts) 
//				            {
//				                var result = Ext.JSON.decode(response.responseText);
//						    	
//				                /*
//				                 * use the json to create records.
//				                 */
//				                me.down("list").getStore().load(result.actions);				                
//						    	
//				            },
//				            failure: function(conn, response, options, eOpts) 
//				            {
//				            	Xedu.CommonUtils.checkServiceError(resp);
//				            }
//				        });
    },
   
    /*
     * when course selected
     */    
    actionSelected: function(record)
    {
    	if (this.getCallbackOnSelect())
    	{
			console.log("about to handle call back");
    		this.handleCallback(record);
    	}
    	else
    	{
    		Xedu.app.getController('Main').redirectTo(record.data.link);
    	}
    },
    /*
     * handle call back
     */
    handleCallback: function(record)
    {
    	console.log("handling callback for action menu selection... ");
    	var callbck = this.getCallbackOnSelect();
    	var scope = this.getCallbackScope();
    	if (typeof callbck == "function")
    	{
    		if (!scope)
    			console.error("Missing scope inside callbackConfig ");
    		else
    			callbck.apply(scope,[record]);
    	}
    	
    	if (this.getCloseOnSelect())
    		this.hide();
    	    	
    },
    
    
});