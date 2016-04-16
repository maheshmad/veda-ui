Ext.define('Xedu.view.users.UsersList', 
{
	extend:'Ext.dataview.List',
	xtype:'users-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.form.FieldSet',
		    'Ext.field.Text',
		    'Ext.plugin.PullRefresh'],
    config: 
    {
        itemId:'users-list-panel-id', 
        title:'Users',
        scrollable: true,
        autoDestroy:true,
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
                  '<div>',
                  '			<span style="color:gray">No:</span> {recordId} ',
                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
                  '</div>',
              ],        
        onItemDisclosure: function(record, btn, index) 
        {
//              Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('configGroups'), Ext.emptyFn);
//              var userDetailsFormPanel = Ext.ComponentQuery.query('user-details-view')[0];
//              userDetailsFormPanel.loadUserDetails(record.data.id);
//                            
        },
        listeners:
        {
        	show:function(thisView,opts)
        	{        		
        		thisView.loadUsers();
        	},
//        	itemsingletap: function(scope, index, target, record)
//			{   
//        		scope.showUserDetails(record);
//			},
			select: function(scope, record, index, target)
			{   
				scope.showUserDetails(record);
			}
		}
		            
    },
    
    /*
     * show user details
     */
    showUserDetails: function(record)
    {
	   	 var userDetailsFormPanel = Ext.ComponentQuery.query('user-details-view')[0];
	     userDetailsFormPanel.loadUserDetails(record.data.id);
	     
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
		var usersListStore = thisView.getStore();				
		usersListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.USER_SEARCH_SERVICE));
		usersListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    	thisView.select(0);
			                    }});		
    }
    
    
});