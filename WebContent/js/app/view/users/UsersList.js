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
        layout:
        {
        	type:'vbox',
        	pack:'start'
        },
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'',
				    layout:
				    {
				    	pack:'right'
				    },
				    defaults:
				    {
				    	ui:'plain'
				    },
				    items:[							           
								{
									xtype:'button',
									iconCls:'user',
								    handler: function (but,action,eOpts) 
								    {
								    	Ext.ComponentQuery.query('user-details-view')[0].createNewUserForm();
								    }
								}
				           ]
				    
        	   },
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
					//			               Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('configGroups'), Ext.emptyFn);
					//			               var userDetailsFormPanel = Ext.ComponentQuery.query('user-details-view')[0];
					//			               userDetailsFormPanel.loadUserDetails(record.data.id);
					//			                             
					 },
					 listeners:
					 {
			        	show:function(thisView,opts)
			        	{        		
			        		thisView.up('users-list-panel').loadUsers();
			        	},
						select: function(scope, record, index, target)
						{   
							scope.up('users-list-panel').showUserDetails(record);
						}
					 }
					 
        
               }
        ]        
        
		            
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
    	var userListPanel = this.down('list');
		var usersListStore = userListPanel.getStore();				
		usersListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.USER_SEARCH_SERVICE));
		usersListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    	userListPanel.select(0);
			                    }});		
    }
    
    
});