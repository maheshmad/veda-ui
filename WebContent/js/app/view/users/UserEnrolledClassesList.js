Ext.define('Xedu.view.users.UserEnrolledClassesList', 
{
	extend:'Ext.Panel',
	xtype:'user-enrolled-classes-list',	
	requires: [		    		    		    
		    'Xedu.store.SearchStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.classroom.EnrollmentDetailsPreview',
		    'Ext.dataview.List'],
    config: 
    {
        layout:'fit',
        userid:null,
    	items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'Enrolled Classes',
				    layout:
				    {
				    	type:'hbox',
				    	pack:'right'
				    },
				    defaults:
				    {
				    	ui:'plain'
				    },
				    items:[							           
								{
									   xtype:'searchfield',
									   name:'searchclassrooms'
								},
								{
									xtype:'button',
									iconCls:'add',
								    handler: function (but,action,eOpts) 
								    {
								    	this.up("user-enrolled-classes-list").createNewClassroom();
								    }
								}
				           ]					    
               },
               
               {
			    	xtype:'list',
            	    itemId:'user-enrolled-classes-list-id', 
			        title:'Enrolled Students',
			        scrollable: true,
			        autoDestroy:true,
			        store: 
			        {
			        	type:'search-store'
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!'
			                  }
			              ],       
			        itemTpl: [
			                  '<div>',
			                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
			                  '</div>',
			                  '<div>',
			                  '			<span style="color:gray">{recordSubTitle} </span> ',
			                  '</div>',
			              ],        
			        listeners:
			        {			        	
			        	itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped class");
//			           	 	Xedu.app.getController('Main').redirectTo('view/user/'+record.data.recordId+"/main");
							scope.up('user-enrolled-classes-list').viewEnrollmentInfo(record,target);
						}
					}
               }]
               
		            
    },
    
    /*
     * load classroom
     */
    loadEnrolledClasses: function()
    {    	
    	var thisView = this;
    	console.log("Loading enrolled classes...");
    	thisView.setMasked({msg:"Loading classrooms..."});
		var classroomListStore = thisView.down('list').getStore();				
		classroomListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.STUDENT_ENROLLED_CLASSES_SEARCH));
		classroomListStore.setParams({'urecid':this.getUserid()});
		classroomListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);
			                    }});		
    },
       
    /*
     * show user details preview
     */    
    viewEnrollmentInfo: function(record,target)
    {    	    	    	
    	Xedu.CommonUtils.showOverlay2({
											xtype: 'enrollment-details-preview',
											enrollmentid:record.data.id,
											title:record.data.title,
											modal:true,
								            autoDestroy:true,
								            hideOnMaskTap: true,
											width:'50%',
											height:'65%',
											title:"Enrollment Info"
										},target);    		
    },
    
    unEnrollFromClass: function(enrollid)
    {
    	thisView.setMasked({msg:"Un-enrolling user = "+this.getUserid()+"... Please wait"});
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.CLASSROOM_ENROLLED_STUDENTS_API)+"/"+enrollid,
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
                userDetailsFormPanel.setRecord(userRecord);		
                /* enrolled classes */
                userEnrolledClassesPanel.setUserid(result.user.userId);
                userEnrolledClassesPanel.loadEnrolledClasses();
                /* header panel */
                if (userDetailsHeaderFormPanel)
                {
                	userDetailsHeaderFormPanel.setUserImageInfoDetails(result.profileImageInfo);
                	userDetailsHeaderFormPanel.setUserDetails(userRecord);				                	
                }
            },
            failure: function(conn, response, options, eOpts) 
            {
            	Xedu.CommonUtils.checkServiceError(resp);
            }
        });
    }
    
    
});