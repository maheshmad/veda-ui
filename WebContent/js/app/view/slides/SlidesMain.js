Ext.define('Xedu.view.slides.SlidesMain', 
{
    extend: 'Ext.Container',
    xtype: 'slides-main-view',
    requires:['Xedu.view.slides.SlidesList',
              'Xedu.view.slides.SlidesFullView',
              'Xedu.view.slides.FreeDrawComponent',
              'Xedu.view.slides.SlidesFullViewList'],
    config: 
    {    	
    	title: 'Slides Contents',
    	fullscreen: false,
    	layout: 'hbox',
    	/**
    	 * @cfg topicid
    	 */
    	topicid: null,	 
    	
    	/**
    	 * @cfg classroomSessionMode
    	 * 
    	 * Default is true
    	 * this indicator will be used to show slides in a session mode, when the teacher is giving a lecture.
    	 */
    	classroomSessionMode:true,
    	
    	autoDestroy:true,
    	defaults:
    	{
    		flex:1            
        },
        items: [           
            {
            	xtype:'container',            	
            	layout: 'fit',            	
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
									{
										xtype:'button',
										iconCls:'compose',
									    itemId: 'newSlideButton',						            
									    handler: function (but,action,eOpts) 
									    {
									    	this.up("slides-main-view").topicContentUpload();
									    	
//									    	var scope = Ext.ComponentQuery.query('slides-main-view')[0];
//									    	var courseId = scope.getCourseid();
//											var chapterid = scope.getChapterid();
//											var topicid = scope.getTopicid();
//									    	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+chapterid+"/topic/"+topicid+"/upload");
									    	
									    	
									    	
									    }
									}							        
							        	
							    ]
							},
							{
								xtype:'slides-list-panel', 
				            	flex:1
							}
						]
            },
            {
            	xtype:'container',            	
            	layout: 'fit',            	
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
								{
									xtype:'button',
									iconCls:'compose',
								    itemId: 'whiteboardButton',						            
								    handler: function (but) 
								    {
								    	var slidesfullview = Ext.ComponentQuery.query('slides-fullview-list')[0];
								    	slidesfullview.getStore().removeAll();								    	
								    }
								},
						        {
						        	xtype:'button',
						        	iconCls:'refresh',
						            itemId: 'undoButton',						            
						            handler: function () 
						            {
		                                var draw = Ext.ComponentQuery.query('slide-draw-component')[0];
		                                draw.undo();	
		                            }
						        }
						        	
						    ]
						},
//						{
//							xtype:'slides-fullview-list',
//						},
						{
							xtype:'slides-fullview',
						},
						{
		                    xtype: 'slide-draw-component',		                                  
		                    itemId: 'free-paint',
		                    top: 0,
	        	            left: 0,
	        	            width:Ext.Viewport.getWindowWidth(),
	        	            height:Ext.Viewport.getWindowHeight()
		                }
            	],
            	flex:4
            }
            
        ],
        listeners:
        {        
        	show:function(thisView,opts)
        	{        			
        		if (thisView.getTopicid())
        		{
        			var slidesList = thisView.down('slides-list-panel');        			
        			slidesList.setTopicid(thisView.getTopicid());
        			slidesList.loadslideslist(thisView.getTopicid());
        		}
        	}
		}	
    },
    /*
     * content upload
     */
    topicContentUpload: function()
    {
    	var topicIdParam = this.getTopicid();    
    	var me = this;
    	var newContentUploadFormPanel = {
						            		xtype: 'Xedu.view.slides.ContentUpload',
						            		topicid:topicIdParam						            		
						            	};
    	
    	Xedu.CommonUtils.showOverlay(newContentUploadFormPanel,{title:"Upload Topic Slides", width:500, height:400,callme: me.reloadSlidesList,callmeScope:me});
    },
    
    reloadSlidesList: function(scope)
    {    	
    	if (scope && scope.down("slides-list-panel"))
    	{
    		console.log("reloading slides");
    		scope.down("slides-list-panel").reload();
    	}
    		
    }
    
    
    
});
