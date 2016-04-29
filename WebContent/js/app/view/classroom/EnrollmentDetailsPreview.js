Ext.define('Xedu.view.classroom.EnrollmentDetailsPreview', 
{
    extend: 'Ext.Panel',
    xtype: 'enrollment-details-preview',
    requires:[
				'Ext.dataview.DataView',
				'Xedu.model.EnrollmentModel',
				'Xedu.view.users.UserDetailsPreview',
				'Xedu.view.classroom.ClassroomEditForm',
				'Xedu.view.classroom.EnrollmentEditForm',
				'Ext.ProgressIndicator'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	scrollable:true,
    	title:'',
    	enrollmentid:null,
    	layout:
    	{
    		type:'fit',
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
//	 					{
//	 						xtype:'button',
//	 						ui:'confirm',
//	 						text:'Suspend',
//	 					    itemId: 'saveChangesButton',						            
//	 					    handler: function (but,action,eOpts) 
//	 					    {
//	 					    	this.up('enrollment-details-preview').updateClassroom();			                 						    	
//	 					    }
//	 					},
	 					{
	 						xtype:'button',
	 						ui:'decline',
	 						text:'Edit',
	 					    itemId: 'unEnrollButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('enrollment-details-preview').editEnrollment();			                 						    	
	 					    }
	 					},
	 					{
	 						xtype:'button',
	 						ui:'decline',
	 						text:'Delete',
	 					    itemId: 'deleteEnrollButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('enrollment-details-preview').deleteEnrollment();			                 						    	
	 					    }
	 					}
	 			    ]
	 			},  
	   			{
	               	xtype:'dataview',
	               	flex:1,
	               	autoDestroy: true, 
	               	scrollable:true,
	               	store:
	               	{
	               		model:'Xedu.model.EnrollmentModel',
	               	},	               	
	                itemTpl: ['<h1><b>id:</b> {id}</h1>',
		                      '<p><b>classroom id :</b> {classroomid}</p>',
		                      '<p><b>enrolled on :</b> {enrolledOn}</p>',
		                      '<p><b>verified by :</b> {verifiedBy}</p>',
		                      '<p><b>updated by :</b> {updatedBy}</p>',
		                      '<p><b>start date :</b> {startDate}</p>',
		                      '<p><b>end date :</b> {endDate}</p>',
		                      '<p><b>status :</b> {enrollStatus}</p>',
	                          '<p><b>Last updated by :</b> {updatedBy} <b>on:</b> {lastUpdatedDateTime}</p>',
	                          '<h1>STUDENT INFO:</h1>',
	                          '<h1>---------------------------------------------------------------------------</h1>',
	                          '<tpl for="student" >',
	                          '		<h1><b>id:</b> {id}</h1>',
	                          '		<p><b>userId :</b> {userId}</p>',
	                          '		<p><b>emailId :</b> {emailId}</p>',
	                          '		<p><b>userPswd :</b> {userPswd}</p>',
	                          '		<p><b>userrole :</b> {userrole}</p>',
	                          '		<p><b>firstName :</b> {firstName}</p>',
	                          '		<p><b>middleName :</b> {middleName}</p>',
	                          '		<p><b>lastName :</b> {lastName}</p>',
	                          '		<p><b>Address :</b> {addressLine1} {addressLine2}, {city} {state} {country} - {postalcode}</p>',	                          
	                          '		<p><b>cell phone :</b> {cellphone} <b>RecieveText :</b> {okToText}</p>',	                          
	                          '		<p><b>Home Phone :</b> {landlinephone}</p>',
	                          '		<p><b>Office phone :</b> {officephone} - Ext: {officephoneExt} </p>',	                          
	                          '		<p><b>Last updated by :</b> {updatedBy} <b>on:</b> {lastUpdatedDateTime}</p>',
	                          '</tpl>',
	                          '<h1>CLASSROOM INFO:</h1>',
	                          '<h1>---------------------------------------------------------------------------</h1>',
	                          '<tpl for="classroom" >',
	                          '		<h1><b>id:</b> {id}</h1>',
	                          '		<p><b>name :</b> {name}</p>',
	                          '		<p><b>title :</b> {title}</p>',
	                          '		<p><b>subTitle :</b> {subTitle}</p>',
	                          '		<p><b>description :</b> {description}</p>',	     
	                          '</tpl>',
	                          ]
                  
	   			}
	   			],
	   	listeners:
 		{
 			show: function(thisView)
 			{
 				thisView.loadEnrollmentDetails();
 			},
// 			hide: function()
// 			{
// 				thisView.removeAllItems();
// 			}
 		}
             
    },

    /**
     * load user details 
     * 
     */
    loadEnrollmentDetails: function()
    {
    	me = this;
    	console.log("about to load enrollment info id ="+this.getEnrollmentid());
    	Ext.Ajax.request({
    						url:Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API)+me.getEnrollmentid(),
				            method: 'GET',
				            headers: { 'Content-Type': 'application/json' },				            
				            success: function(response, conn, options, eOpts) 
				            {
				                var result = Ext.JSON.decode(response.responseText);			    		    	
				                /*
				                 * use the json to create records.
				                 */
				                var enrollmentRecord = Ext.create('Xedu.model.EnrollmentModel', result.enrollment);
				                /*
				                 * set the data 
				                 */				                					                			    		    
				                me.setEnrollmentRecord(enrollmentRecord.copy());
				                
				            },
				            failure: function(conn, response, options, eOpts) 
				            {
				            	Xedu.CommonUtils.checkServiceError(resp);
				            }
				        });
    			
	},
		
	setEnrollmentRecord: function(enrollmentRecord)
	{
		this.down('dataview').setRecord(enrollmentRecord);	
//		this.down('enrollment-edit-form').setRecord(enrollmentRecord);	
	},
	
	setUserDetails: function(userRecord)
	{
		this.down('user-details-preview').down('dataview').setRecord(userRecord);		
	},
	
	/**
	 * 
	 */
	editEnrollment: function()
	{		
    	var id = this.getEnrollmentid();
		this.hide();
    	if (id && id != '' )
    	{	   	 	
			Xedu.app.getController('Main').redirectTo('edit/enrollment/'+id);
    	}
		else
			Ext.Msg.alert("Not allowed","Operation not available!");
		
				
	},
	
	/**
	 * 
	 */
	deleteEnrollment: function()
	{		
    	var id = this.getEnrollmentid();
		if (id && id != '' )
    	{
    		Ext.Msg.alert("Not allowed","Operation not available!");
    	}
						
    	var me = this;
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Msg.confirm("Delete enrollment?", 
    				"Are you sure you want to remove user from classroom?", 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			Ext.Ajax.request({
		    	                            	 url:Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API)+id,
		    	                            	 method:'DELETE',
		    	                            	 progress: progressIndicator,	
		    	                                 success: function (resp)
		    	                                 {	                                    			    	                                     
		    	                                	 var response = Ext.JSON.decode(resp.responseText);			 
		    	                                	 Ext.Msg.alert(response.status,response.msg, function()
		    	                                			 {
				    	                                		 var enrolledStudentsListPanel = Ext.ComponentQuery.query("enrolled-students-list-panel list");
				    	                                    	 if (enrolledStudentsListPanel && enrolledStudentsListPanel[0])
				    	                                    		 enrolledStudentsListPanel[0].getStore().load();	
				    	                                    	 
				    	                                    	 me.down("#unEnrollButton").setHidden(true);
				    	                                    	 me.down("#deleteEnrollButton").setHidden(true);
				    	                                    	 me.close();
		    	                                			 });		    	                                	   	                                    	 		    	                                    
		    	                                 },
		    	                                 failure: function (el,resp,p) 
		    	                                 {			                                    			    	                                   	                                    
		    	                                     Xedu.CommonUtils.checkServiceError(resp);
		    	                                 }
		    	                                 
		    	                            	 
		    	                             });
			    		}
			    	});
    	    	
    		
	},
		
	
	setClassroomDetails: function(classroomRecord)
	{
		this.down('classroom-edit-form').down('dataview').setRecord(classroomRecord);		
	}
	
    
});
