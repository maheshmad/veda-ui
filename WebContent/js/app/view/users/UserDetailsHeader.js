Ext.define('Xedu.view.users.UserDetailsHeader', 
{
    extend: 'Ext.form.Panel',
    xtype: 'user-details-header-view',
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
    	scrollable:false,    	
    	layout:
    	{
    		type:'hbox'
    	},    	
        items: [
                {
                    xtype:'fieldset',
                    layout:'vbox',		
                    items:[
                           {
							    xtype: 'textfield',
							    name : 'userId',
							    hidden:true,
							    flex:1
                            },
                            {
							    xtype: 'textfield',
							    name : 'imageid',
							    itemId:'imageid',
							    hidden:true,
							    flex:1
                            }, 
                            {
					            xtype: 'image',
					            itemId:"user-profile-image-id",
					            src: 'resources/icons/user_profilex128.png',
					            flex: 3					           
                            },							                            
                            {
                               xtype: 'filefield',			                               
                               name: 'userimage',
                               accept: 'image',
                               flex:1,
                               listeners:{
	                                           change:function(el, newValue, oldValue, eOpts)
	                                           {
	                                        	   el.up("user-details-header-view").uploadPicture();
	                                           }	
                                          }
                                          
                            }]
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
             }]
    },

	uploadPicture: function()
	{
		var uploadForm = this;
		var me = this;
//    	Ext.Viewport.mask({msg:"Uploading picture...Please wait!"});
    	
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	uploadForm.submit(
		{
				url:Xedu.Config.getUrl(Xedu.Config.UPLOAD_PROFILE_IMAGE_SERVICE),
				method: 'POST',			
				xhr2: true,
				progress: progressIndicator,
				//Progress can also be a simple callback
				/*progress: function(e) {
					console.log((e.loaded / e.total) * 100);
				 },*/
				success: function(form, response) 
				{
					var maincntrller = Xedu.app.getController('Main');					                                    
                    Ext.Viewport.setMasked(false);
                    Xedu.CommonUtils.checkServiceError(response);					                                     
                    if (response.status == 'SUCCESS') 
                    {                        	              	                                           	
	                   	 /*
	                   	  * load the created user
	                   	  */
	                   	 me.setUserImageInfoDetails(response.userImageInfo,true);
                    } 
                    else;
				},
				failure: function(form, response) 
				{
//					Ext.Viewport.setMasked(false);			                                     
                    Xedu.CommonUtils.checkServiceError(resp);
				}
		});
    	
    	
    	
//    	
//    	uploadForm.submit({
//                            	 url:Xedu.Config.getUrl(Xedu.Config.UPLOAD_PROFILE_IMAGE_SERVICE),
//                            	 method:'POST',
//                                 success: function (form,response,data)
//                                 {	                                    
//                                     var maincntrller = Xedu.app.getController('Main');					                                    
//                                     Ext.Viewport.setMasked(false);
//                                     Xedu.CommonUtils.checkServiceError(response);					                                     
//                                     if (response.status == 'SUCCESS') 
//                                     {                        	              	                                           	
//                                    	 /*
//                                    	  * load the created user
//                                    	  */
//                                    	 me.updateUserProfilePic(response.userImageInfo);
//                                     } 
//                                     else;
//                                 },
//                                 failure: function (el,resp,p) 
//                                 {			                                    
//                                     Ext.Viewport.setMasked(false);			                                     
//                                     Xedu.CommonUtils.checkServiceError(resp);
//                                 }
//                                 
//                            	 
//                             });
		
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
	}
    
    
    
    
});
