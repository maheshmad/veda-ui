Ext.define('Xedu.view.users.UserSelection', 
{
    extend: 'Ext.Container',
    xtype: 'user-selection-view',
    requires:[
              	'Xedu.view.users.UsersList',
              	'Xedu.view.users.UserDetailsPreview'
              ],
    config: 
    {    	
    	title: 'Select User',
    	fullscreen: false,
    	layout:{
    		type:'card',
    		animation:{type:'slide',direction:'left'}
    	},
    	userSelectionMode:false,
    	selectedUserId:null,
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        
        items: [
                {                	
				    docked: 'top',
				    xtype: 'toolbar',
				    ui:'light',
				    title:'',
				    layout:
				    {
				    	pack:'left'
				    },				    
				    items:[							           
								{
									xtype:'button',
									ui:'back',	
									text:'Back',
									hidden:true,
								    handler: function (but,action,eOpts) 
								    {
								    	this.up('user-selection-view').setActiveItem(0);
								    	this.up('user-selection-view').showBackButton(false);
								    }
								}
				           ]
    			   
               },
//               {                	
//				    docked: 'bottom',
//				    xtype: 'toolbar',
//				    ui:'dark',
//				    title:'',
//				    layout:
//				    {
//				    	pack:'center'
//				    },				    
//				    items:[							           
//								{
//									xtype:'button',
//									ui:'confirm',
//									text:'Enroll User to Class',
//								    itemId: 'enrollUserButton',						            
//								    handler: function (but,action,eOpts) 
//								    {
//								    	Ext.ComponentQuery.query('user-details-view')[0].submitNewUser();			                 						    	
//								    }
//								},
//								{
//									xtype:'button',
//									ui:'decline',
//									text:'Remove User From Class',
//								    itemId: 'deleteEnrollmentButton',						            
//								    handler: function (but,action,eOpts) 
//								    {
//								    	Ext.ComponentQuery.query('user-details-view')[0].deleteUser();			                 						    	
//								    }
//								}
//				           ]
//   			   
//              },
              {
				   xtype:'users-list-panel',	
				   listeners:
				   {
					   show: function(thisView)
					   {
						   var paneltitlebar = thisView.up('titlebar');
						   console.log("setting callback handler for userslist");
						   var userSelectionPanel = thisView.up('user-selection-view');
						   thisView.setCallbackScope(userSelectionPanel);						   
						   thisView.setCallbackOnSelect(userSelectionPanel.onUserSelect);		
						   
					   }
				   }
			   		
					   
               },
	           {
            	   xtype:'container',
            	   layout:{
            		  type:'hbox'            			 
            	   },
            	   items:[
							{
								    docked: 'bottom',
								    xtype: 'toolbar',
								    ui:'dark',
								    title:'',
								    layout:
								    {
								    	type:'hbox',
								    	pack:'center'
								    },
								    items: 
								    [														
										{
											xtype:'button',
											ui:'decline',
											text:'Remove user',
										    itemId: 'unEnrollButton',						            
										    handler: function (but,action,eOpts) 
										    {
										    	this.up('enrollment-details-preview').unEnrollFromClass();			                 						    	
										    }
										}
								    ]
							}, 
							{
            		   			xtype:'user-details-preview',
            		   			flex:1
	            	   		},
	            	   		{
	            	   			xtype:'enrollment-edit-form',
            		   			flex:3
	            	   		}]
            	  
	           }],
       listeners:
       {
    	   show:function(thisView)
    	   {
    		   thisView.down('users-list-panel').loadUsers();
    	   }
       }
    },
    
    onUserSelect: function(id)
    {
    	console.log("selected user ="+id);
    	var previewUserPanel = this.down('user-details-preview'); 
    	previewUserPanel.setUserid(id);
		this.setActiveItem(1);		
		this.showBackButton(true);
    },
    
    showBackButton: function(show)
    {
    	this.down('toolbar').down('button[@ui="back"]').setHidden(!show);    	
    }
    
    
});
