Ext.define('Xedu.view.users.UserMgmtMain', 
{
    extend: 'Ext.Container',
    xtype: 'user-mgmt-main-view',
    requires:[
              	'Xedu.view.users.UsersList',
              	'Xedu.view.users.UserDetailsView',
              	'Xedu.view.users.UserDetailsHeader'
              ],
    config: 
    {    	
    	title: 'User Management',
    	fullscreen: false,
    	layout: 'hbox',
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
			{
				xtype:'container',
				layout:'fit',
				flex:1,
				items:[{
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
									    	this.up('user-mgmt-main-view').down('user-details-view').createNewUserForm();
									    }
									}
					           ]
					    
					},
					{
						xtype:'users-list-panel',
						autoSelect:true
//		            	flex:1
					}]
			},			
            {
            	xtype:'container',
            	flex:4,
            	layout:'vbox',
            	items:[
							{
								xtype:"user-details-header-view",								
								height:200,								
							},
							{
								xtype:"user-details-view",
								flex:1,
								height:"100%"
							}
            	       
            	       ]
            }
            
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			        	
    			var usersList = thisView.down('users-list-panel');        			
    			usersList.loadUsers();        		
        	}
		}	
    }
});
