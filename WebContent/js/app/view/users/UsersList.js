Ext.define('Xedu.view.users.UsersList', 
{
	extend:'Ext.Panel',
	xtype:'users-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.field.Search',
		    'Ext.form.FieldSet',
		    'Ext.field.Text',
		    'Ext.plugin.PullRefresh'],
    config: 
    {
        itemId:'users-list-panel-id', 
        title:'Users',
        scrollable: true,
        autoDestroy:true,
        /*
         * callback options
         */
        callbackScope: null,
        callbackOnSelect: null,
        closeOnSelect: true,
        
        layout:
        {
        	type:'vbox',
        	pack:'start'
        },
    	items:[        	   
        	   {
	                xtype: 'searchfield',
	                placeHolder: 'Search Users..',
	                align: 'center',
	                ui:'dark',
	                height:50,
	                listeners:
	                {
	                	keyup:function(el, e, eOpts )
	                	{		                		
	                		this.up('users-list-panel').searchRecords(el.getValue());	                		
	                	}
	                }
	           },
               {
            	   	xtype:'list',
            	   	flex:7,
					 store: 
					 {
					 	type:'search-store'
					 },
					 plugins: [
					           {
					               xclass: 'Ext.plugin.PullRefresh',                      
					           pullText: 'Pull down to refresh the list!',
					           loadingText:"Loading users.."
					           }
					       ],       
					 itemTpl: [
					           '<table>',
						       '	<tr>',
						       '		<td width="100">',
						       '			<div>',
						       '				<img src="resources/icons/user_profile2x64.png" />',
						       '			</div>',
						       '		</td>',
						       '		<td>',
						       '			<div>',                
						       '				<b>{recordTitle}</b> {recordSubTitle}',
						       '			</div>',                  
						       '		</td>',
						       '	</tr>',
						       '</table>'
					       ],        
					 onItemDisclosure: function(record, btn, index) 
					 {
//						 console.log("on disclousure details....");
//						 this.up('users-list-panel').showUserDetails(record);
					 },
					 listeners:
					 {
			        	show:function(thisView,opts)
			        	{        		
			        		thisView.up('users-list-panel').loadUsers();
			        	},
						select: function(scope, record, index, target)
						{   							
					    	console.log("select details....");
							scope.up('users-list-panel').userSelected(record);
						}
					 }
					 
        
               }
        ],
        listeners:
        {
        	show: function(thisView)
        	{
        		console.log("showing user list panel....");
        		thisView.down('list').show();
        	}
        }
        
		            
    },
    
    searchRecords: function(searchvalue)
    {
    	var userslist = this.down('list');
    	/*
    	 * search with the store
    	 */
    	userslist.getStore().clearFilter();
		userslist.getStore().filter(function(rec)
		{
			var searchOnString = "";
			var recData = rec.getData();
			for(var val in recData)
			{
				searchOnString += " "+recData[val];  
			}
			
//			console.log("search on string ="+searchOnString + " on "+searchvalue);
			if (searchOnString.indexOf(searchvalue) > -1)
				return true;
			else
				return false;
			
		});		
    },
    
    
    /*
     * show user details
     */
    userSelected: function(record)
    {
    	if (this.getCallbackOnSelect())
    	{
			this.handleCallback(record.data.id);
    	}
    	else
    	{
    		/*
    		 * only show if the details page is in view
    		 */
    		if (Ext.ComponentQuery.query('user-details-view') &&
    			Ext.ComponentQuery.query('user-details-view')[0])
    		{
    			var userDetailsFormPanel = Ext.ComponentQuery.query('user-details-view')[0];
    			userDetailsFormPanel.loadUserDetails(record.data.id);
    		}
    	}
    },
    /*
     * handle call back
     */
    handleCallback: function(param)
    {
    	console.log("handling callback... ");
    	var callbck = this.getCallbackOnSelect();
    	var scope = this.getCallbackScope();
    	if (typeof callbck == "function")
    	{
    		if (!scope)
    			console.error("Missing scope inside callbackConfig ");
    		else
    			callbck.apply(scope,[param]);
    	}
    	
    	if (this.getCloseOnSelect())
    		this.hide();
    	    	
    },
    
    /*
     * 
     * load users
     * 
     */
    loadUsers: function()
    {
    	console.log("loading users from DB ");
		var thisView = this;
    	thisView.setMasked({msg:"Loading users..."});
    	var userListPanel = this.down('list');
    	var userDetailsPanel = this.down('list');
		var usersListStore = userListPanel.getStore();				
		usersListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.USER_SEARCH_SERVICE));
		usersListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    	if (Ext.ComponentQuery.query('user-details-view') &&
			                    			Ext.ComponentQuery.query('user-details-view')[0])
			                    		userListPanel.select(0);
			                    }});		
    }
    
    
});