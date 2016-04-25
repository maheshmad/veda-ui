Ext.define('Xedu.view.config.ConfigMain', 
{
    extend: 'Ext.Container',
    xtype: 'config-main-view',
    requires:['Xedu.view.config.ConfigSectionsList'
              ],
    config: 
    {    	
    	title: 'Settings',
    	fullscreen: false,
    	layout: 'hbox',
    	topicid: null,	  
    	courseid:null,
    	chapterid:null,
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
            {
            	xtype:'container',            	
            	layout: 'fit',
            	flex:1,
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
							    }
							    
							},
							{
								xtype:'config-sections-list-panel', 
				            	flex:1
							}
						]
            },
            {
            	xtype:'formpanel',
            	itemId:'config-group-form',
            	flex:4,
            	height:'100%',
            	layout: 
            	{
            		type:'fit',
            		pack:'start'
            	},
            	scrollable: 
            	{
            	    direction: 'vertical',
            	    directionLock: false
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
						    items: 
						    [								
						        	
						    ]
						},
						{
						    docked: 'bottom',
						    xtype: 'toolbar',
						    ui:'dark',
						    title:'',
						    layout:
						    {
						    	pack:'center'
						    },
						    defaults:
						    {
						    	ui:'plain'
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
								    	var configFormSub = Ext.ComponentQuery.query('#config-group-form')[0];	
								    	Ext.Viewport.mask({msg:"Updating configuration...Please wait!"});	
								    	configFormSub.submit({
								                            	 url:Xedu.Config.getUrl(Xedu.Config.CONFIG_SECTIONS),
								                            	 method:'POST',
								                                 success: function (form,response,data1)
								                                 {	                                    
								                                     var maincntrller = Xedu.app.getController('Main');	                                    
								                                     Ext.Viewport.setMasked(false);
								                                     if (response.status == 'SUCCESS') 
								                                     {                        	              	       
								                                    	 Ext.Msg.alert('Success', 'Configuration updated successfully!', Ext.emptyFn);
								                                    	 var configListPanel = Ext.ComponentQuery.query("config-sections-list-panel");
								                                    	 if (configListPanel && configListPanel[0])
								                                    		 configListPanel[0].getStore().load();								                                    	 
								                                     } 
								                                     else 
								                                     {			                                    	
								                                    	 Ext.Msg.alert('Failed', response.msg, Ext.emptyFn);
								                                     }
								                                 },
								                                 failure: function (response) 
								                                 {			                                    
								                                     Ext.Viewport.setMasked(false);			                                     
								                                     Ext.Msg.alert('Exception', 'Server failed to respond! Please try again or contact support!', Ext.emptyFn);
								                                 }
								                                 
								                            	 
								                             });
			                             						    	
									    }
									}		
							    ]
							}
						]
            	
            }
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			
        		console.log("showing config main");
        	}
		}	
    }
});
