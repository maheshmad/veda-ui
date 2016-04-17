Ext.define('Xedu.view.course.CourseEditForm', 
{
    extend: 'Ext.form.Panel',
    xtype: 'course-edit-form',
    requires:[
					'Ext.form.FieldSet',
					'Ext.field.Text',
					'Ext.field.Toggle',
					'Ext.field.Select',
					'Ext.field.DatePicker',
					'Ext.ProgressIndicator',
					'Xedu.model.CourseModel'
              ],
    config: 
    {    	
    	fullscreen: false,
    	autoDestroy:true,
    	scrollable:true,    	
    	layout:
    	{
    		type:'vbox'
    	},    	
        items: [                
                {
                    xtype:'fieldset',
                    flex:2,	
                    layout:
                    {
                    	type:'vbox',
                    	pack:'start'
                    },
                    defaults:
                    {
                    	labelAlign:'top'
                    },
                    items:[
                           {
							    xtype: 'textfield',
							    name : 'id',
							    label:"ID"
//							    hidden:true,							   
                            },
                            {
							    xtype: 'textfield',
							    name : 'name',
							    label:"Name"
                            },
                            {
							    xtype: 'textfield',
							    name : 'title',	
							    label:"Title"
                            },
                            {
							    xtype: 'textfield',
							    name : 'subTitle',	
							    label:"Sub Title"
                            }
                            ]
	   			},
	   			{
	               	xtype:'fieldset',
	               	layout:'fit',
	               	flex:1,			                    	
	               	items:[
									{
									    xtype: 'textareafield',
									    label: 'Description',
									    labelAlign:'top',
									    name : 'description'
									}
												                    	       
	               	       ]
	             },
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
	 						ui:'confirm',
	 						text:'Save',
	 					    itemId: 'saveChangesButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('course-edit-form').updateCourse();			                 						    	
	 					    }
	 					},
	 					{
	 						xtype:'button',
	 						ui:'decline',
	 						text:'Delete',
	 					    itemId: 'deleteChangesButton',						            
	 					    handler: function (but,action,eOpts) 
	 					    {
	 					    	this.up('course-edit-form').deleteCourse();			                 						    	
	 					    }
	 					}
	 			    ]
	 			},  
	   			
	   			]
    },
    
    /*
     * load course
     */
    loadCourse: function(id)
    {
    	var courseDetailsForm = this;
    	
    	console.log("Loading course id ="+id);
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	Ext.Ajax.request({
			url:Xedu.Config.getUrl(Xedu.Config.COURSE_API)+id,
            method: 'GET',
            progress: progressIndicator,			
            headers: { 'Content-Type': 'application/json' },				            
            success: function(response, conn, options, eOpts) 
            {
                var result = Ext.JSON.decode(response.responseText);
		    	
                /*
                 * use the json to create records.
                 */
                var courseRecord = Ext.create('Xedu.model.CourseModel', result.course);
                /*
                 * set the data 
                 */
                courseDetailsForm.setRecord(courseRecord);					                
		    	
            },
            failure: function(conn, response, options, eOpts) 
            {
            	Xedu.CommonUtils.checkServiceError(resp);
            }
        });
    },
    
    /*
     * upload form
     */
    updateCourse: function()
	{
		var courseForm = this;
    	var fields = courseForm.getFields();
		var id = fields['id'].getValue();
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.COURSE_API);
    	var restMethod = "POST";
    	if (id && id != "")
    	{
    		restMethod = "PUT";
    		restUrl = restUrl +id;
    	}
    	var progressIndicator = Ext.create("Ext.ProgressIndicator");
    	courseForm.submit(
		{
				url:restUrl,
       	 		method:restMethod,		
				progress: progressIndicator,				
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
                    	Ext.Msg.alert(response.status,response.msg);
                    } 
                    else;
				},
				failure: function(form, response) 
				{
                    Xedu.CommonUtils.checkServiceError(resp);
				}
		});
    	
		
	},
	
	/**
	 * delete user
	 */
    deleteCourse: function()
    {
    	var courseDetailsForm = this;
    	var fields = courseDetailsForm.getFields();
    	var id = fields['id'].getValue();
    	var courseName = fields['title'].getValue() +" " + fields['subTitle'].getValue();
    	
    	Ext.Msg.confirm("Delete Course?", 
    				"Are you sure you want to delete the course <br />id:"+id+"<br /> Name:"+courseName, 
			    	function(btn)
			    	{
			    		if (btn == 'yes')
			    		{
			    			var progressIndicator = Ext.create("Ext.ProgressIndicator");
			    			courseDetailsForm.submit({
			    	                            	 url:Xedu.Config.getUrl(Xedu.Config.COURSE_API)+id,
			    	                            	 method:'DELETE',
			    	                            	 progress: progressIndicator,	
			    	                                 success: function (form,response,data)
			    	                                 {	                                    			    	                                     
			    	                                	 Ext.Msg.alert(response.status,response.msg);
			    	                                	 var configListPanel = Ext.ComponentQuery.query("courses-list-panel list");
		    	                                    	 if (configListPanel && configListPanel[0])
		    	                                    		 configListPanel[0].getStore().load();								                                    	 
			    	                                    
			    	                                 },
			    	                                 failure: function (el,resp,p) 
			    	                                 {			                                    			    	                                   	                                    
			    	                                     Xedu.CommonUtils.checkServiceError(resp);
			    	                                 }
			    	                                 
			    	                            	 
			    	                             });
			    		}
			    	});
    	    	
    	
    }
    
    
    
    
});
