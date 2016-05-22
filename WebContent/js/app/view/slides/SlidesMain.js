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
    	 * @cfg courseid
    	 */
    	courseid: null,
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
            	itemId:'course-contents-selection-panel',
            	layout: 'card',            	
            	items:[
			            	{
							    docked: 'top',
							    xtype: 'titlebar',							    
							    ui:'dark',
							    title:'Chapters',
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
										ui:'back',
										align:'left',
										hidden:true,
									    itemId: 'backButton',						            
									    handler: function (but,action,eOpts) 
									    {
									    	/*
									    	 * back button navigation
									    	 */
									    	var cc = but.up('#course-contents-selection-panel');
									    	var titlebar = cc.down('titlebar');
									    	var activeItem = cc.getActiveItem();									    	
									    	if (activeItem.xtype == 'topics-list-panel')
									    	{
									    		cc.setActiveItem(0);
									    		titlebar.setTitle('Chapters');
									    		but.hide();
									    	}
									    	else if (activeItem.xtype == 'slides-list-panel')
									    	{
									    		cc.setActiveItem(1);
									    		but.setText("Chapters");
									    		titlebar.setTitle('Topics');
									    	}
									    }
									}	
														        
							        	
							    ]
							},
							{
								xtype:'chapters-list-panel',								
								callbackScope:this,
		    					callbackOnSelect: function(id)
		    					{
		    						Ext.ComponentQuery.query("slides-main-view")[0].switchCards({'chapterid':id});								    						
		    					}
		    				},
							{
								xtype:'topics-list-panel', 
								callbackScope:this,
		    					callbackOnSelect: function(id)
		    					{
		    						Ext.ComponentQuery.query("slides-main-view")[0].switchCards({'topicid':id});								    						
		    					},
				            	flex:1
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
        		thisView.loadCourseChaptersList();
        	}
		}	
    },
    
    switchCards: function(opt)
    {
//    	console.log("switching card for chapter id = "+opt.chapterid);
    	var courseContentsCards = this.down('#course-contents-selection-panel');
    	var bckButton = courseContentsCards.down('#backButton');
    	var titleBar = courseContentsCards.down('titlebar');
    	
    	bckButton.setHidden(false);		
    	if (opt.chapterid)
    	{    		
    		this.down('topics-list-panel').setChapterid(opt.chapterid);
    		courseContentsCards.setActiveItem('topics-list-panel');
    		bckButton.setText("Chapters");
    		titleBar.setTitle("Topics");
    	}
    	else if (opt.topicid)
    	{    		
    		this.down('slides-list-panel').setTopicid(opt.topicid);
    		courseContentsCards.setActiveItem('slides-list-panel');  
    		bckButton.setText("Topics");
    		titleBar.setTitle("Slides");
    	}
    		
    },
    
    /*
     * set the default course contents chapter list panel
     */
    loadCourseChaptersList: function()
    {
    	if (this.getCourseid() == null && this.getTopicid() == null)
		{    		    		
    		return;
		}
    	
    	var courseContentsPanel = this.down('#course-contents-selection-panel'); 
    	if (this.getCourseid() != null)
    	{			
			var chaptersListPanel = courseContentsPanel.down('chapters-list-panel');
			chaptersListPanel.loadChapters(this.getCourseid());
    	}
    	else if (this.getTopicid() != null)
    	{
    		var slidesListPanel = courseContentsPanel.down('slides-list-panel');
    		courseContentsPanel.down('titlebar').hide();
    		slidesListPanel.setTopicid(this.getTopicid());    		
    		courseContentsPanel.setActiveItem(slidesListPanel);
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
