Ext.define('Xedu.view.users.UserDetailsPreview', 
{
    extend: 'Ext.form.Panel',
    xtype: 'user-details-preview',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Xedu.model.UserModel',
					'Ext.ProgressIndicator'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	scrollable:true,
    	userid:null,
    	layout:
    	{
    		type:'vbox',
    		pack:'center'    		
    	},    	
        items: [
                {
                    xtype:'fieldset',
                    layout:'vbox',		
                    items:[                          
                            {
					            xtype: 'image',
					            itemId:"user-profile-image-id",
					            src: 'resources/icons/user_profilex128.png',
					            flex: 3					           
                            },							                            
                            ]
	   			},
	   			{
	               	xtype:'fieldset',
	               	layout:'hbox',
	               	flex:1,			                    	
	               	items:[
									{
									    xtype: 'textfield',
									    name : 'firstName'
									},
									{
									    xtype: 'textfield',
									    name : 'middleName'												    
									},
									{
									    xtype: 'textfield',
									    name : 'lastName'												    
									}								                    	       
	               	       ]
	   			}],
   		listeners:
   		{
   			show: function(thisView)
   			{
   				thisView.loadUserDetails();
   			}
   		}
             
    },

    setUserid: function(id)
    {
    	this.userid = id;
    },
    
    getUserid: function()
    {
    	return this.userid;
    },
    /**
     * load user details 
     * 
     */
    loadUserDetails: function()
    {
    	me = this;
    	console.log("about to load user id ="+this.getUserid());
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.USER_SERVICE)+"/"+me.getUserid(),
				            method: 'GET',
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);
			    		    	
				                /*
				                 * use the json to create records.
				                 */
				                var userRecord = Ext.create('Xedu.model.UserModel', result.user);
				                var userImageInfoRecord = Ext.create('Xedu.model.UserImageInfoModel', result.profileImageInfo);
				                /*
				                 * set the data 
				                 */				                					                			    		    
				                me.setUserImageInfoDetails(result.profileImageInfo);
				                me.setUserDetails(userRecord);				                	
				                
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
				        });
    			
	},
	
	setUserImageInfoDetails: function(userImageInfo, refreshImage)
	{
		if (userImageInfo && userImageInfo.imageid)
		{			
			var imageUrl = Xedu.Config.getUrl(Xedu.Config.PROFILE_IMAGE_THUMB_SERVICE+userImageInfo.imageid);
			if (refreshImage)
				imageUrl = imageUrl + "?dc="+new Date().getTime();
			this.down("#user-profile-image-id").setSrc(imageUrl);	
			this.down("#imageid").setValue(userImageInfo.imageid);
		}
		else
		{
			this.down("#user-profile-image-id").setSrc('resources/icons/user_profilex128.png');	
			this.down("#imageid").setValue('');
		}
		
	},
	
	setUserDetails: function(userRecord)
	{
		this.setRecord(userRecord);		
	},
	
	clearPanel: function()
	{
		this.reset();
		this.down("#user-profile-image-id").setSrc('resources/icons/user_profilex128.png');	
	}
    
    
    
    
});
