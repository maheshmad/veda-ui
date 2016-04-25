Ext.define('Xedu.view.users.UserDetailsPreview', 
{
    extend: 'Ext.Panel',
    xtype: 'user-details-preview',
    requires:[
					'Ext.dataview.DataView',
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
    		pack:'center',
    		align:'stretch'
    	},
    	init: function() 
    	{            
    		this.callParent(arguments);
    		console.log("initialized");
        },
        items: [
                {
		            xtype: 'image',
		            autoDestroy:true,
		            itemId:"user-profile-image-id",
		            src: 'resources/icons/user_profilex128.png',
		            flex: 1					           
                },	
	   			{
	               	xtype:'dataview',
	               	autoDestroy:true,
	               	flex:4,
	               	store:
	               	{
	               		model:'Xedu.model.UserModel',
	               	},	               	
	                itemTpl: ['<h1><b>Name:</b> {lastName},{firstName}</h1>',
	                          '<p><b>userId :</b> {userId}</p>',
	                          '<p><b>emailId :</b> {emailId}</p>',
	                          '<p><b>userPswd :</b> {userPswd}</p>',
	                          '<p><b>userrole :</b> {userrole}</p>',
	                          '<p><b>firstName :</b> {firstName}</p>',
	                          '<p><b>middleName :</b> {middleName}</p>',
	                          '<p><b>lastName :</b> {lastName}</p>',
	                          '<p><b>Address :</b> {addressLine1} {addressLine2}, {city} {state} {country} - {postalcode}</p>',	                          
	                          '<p><b>cell phone :</b> {cellphone} <b>RecieveText :</b> {okToText}</p>',	                          
	                          '<p><b>Home Phone :</b> {landlinephone}</p>',
	                          '<p><b>Office phone :</b> {officephone} - Ext: {officephoneExt} </p>',	                          
	                          '<p><b>Last updated by :</b> {updatedBy} <b>on:</b> {lastUpdatedDateTime}</p>'	                          
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
		}
		else
		{
			this.down("#user-profile-image-id").setSrc('resources/icons/user_profilex128.png');	
		}
		
	},
	
	setUserDetails: function(userRecord)
	{
		this.down('dataview').setRecord(userRecord);		
	},
	
	clearPanel: function()
	{
		this.reset();
		this.down("#user-profile-image-id").setSrc('resources/icons/user_profilex128.png');	
	},
    
	removeAllItems: function()
	{
		console.log("removing all items");
		this.down('dataview').destroy();
	}
    
    
    
});
