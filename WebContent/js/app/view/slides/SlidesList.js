Ext.define('Xedu.view.slides.SlidesList', 
{
	extend:'Ext.Panel',
	xtype:'slides-list-panel',	
	requires: [		    		    		    
	           'Xedu.store.SlidesListStore',
	           'Ext.plugin.PullRefresh'
		    ],
    config: 
    {        
        layout:'vbox',
    	title:'Slides',
        /*
         * panel custom config params
         */      
        topicid: null,	   
        scrollable: true,
        autoDestroy:true,
        
        /**
    	 * @cfg callbackScope
    	 */
        callbackScope: null,
        /**
    	 * @cfg callbackOnSelect
    	 */
        callbackOnSelect: null,
        /**
    	 * @cfg closeOnSelect
    	 * usually used to close the popup overlap window
    	 */
        closeOnSelect: false,
        /**
    	 * @cfg hideTitlebar
    	 * hide the titlebar when not required
    	 * Default: false
    	 */
        hideTitlebar: false,
        
        items:[
        	   {
				    docked: 'top',
				    xtype: 'titlebar',
				    ui:'neutral',
				    title:'Slides',
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
									xtype:'button',
									iconCls:'add',
								    handler: function (but,action,eOpts) 
								    {
								    	this.up("slides-list-panel").topicContentUpload();
								    }
								}
				           ]					    
               },
               {
				   xtype:'searchfield',
	               placeHolder: 'search slides...',
	               align: 'center',
	               ui:'dark',
	               height:50,
				   listeners:
	               {
	                	keyup:function(el, e, eOpts )
	                	{		                			                		
	                		Xedu.CommonUtils.filterStore(this.up('slides-list-panel').down('list'),el.getValue());
	                	}
	               }
               },
               {
			    	xtype:'list',
			    	flex:1,
			    	itemId:'slides-list-panel-id', 
			        title:'Slides',
			        /*
			         * panel custom config params
			         */			        
			        scrollable: true,
			        autoDestroy:true,               
			        store: 
			        {
			        	type:'slides-list-store'
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!'
			                  }
			              ],                     
			        itemTpl: [
			                  '<div style="vertical-align:middle; text-align:center;width:100%;height:100%">',
			                  '			<img src="'+Xedu.Config.getUrl(Xedu.Config.SLIDE_IMAGE_THUMB)+'{recordId}" /><br />',                 
			                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
			                  '</div>',
			              ],                  
			        listeners:
			        {        
			        	show:function(thisView,opts)
			        	{
			        		if (thisView.getTopicid() != '')
			        			thisView.up('slides-list-panel').loadslideslist(thisView.getTopicid());
			        	},
			        	itemsingletap: function(scope, index, target, record)
						{        					        		
							scope.up('slides-list-panel').showSlideOnFullView(scope, index, target, record);
							var event = Ext.create('Xedu.model.EventModel',{});
			    	        event.set("type","ACTION");
			    	        event.set("msg","{'topicid':'"+record.getData().recordId+"'}");
							Xedu.CommonUtils.sendSocketEvent(event);
						}
					}
               }
           ],
           listeners:
           {
	           	show:function(thisView,opts)
	           	{        			        				    			    			
					thisView.down('titlebar').setHidden(thisView.getHideTitlebar());
	           		thisView.loadslideslist(thisView.getTopicid());
	           	}        	
	   		}
	        
    },
    
    /*
     * loadSlides
     */
    loadslideslist: function(id)
    {
    	if (id)
    		this.topicid = id;
    	else;
    		
    	console.log("showing...slides from loadslideslist ");
		var thisView = this;
    	thisView.setMasked({msg:"Loading slides..."});
		var slideListStore = thisView.down('list').getStore();
		var topicid = thisView.getTopicid();				
		slideListStore.getProxy().setUrl(Xedu.Config.getUrl(Xedu.Config.SLIDES_LIST_SEARCH_BY_TOPIC)+topicid);
		slideListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);		    		                        	                       	                	    			            					            			                        
			                    }});
    },
    
    showSlideOnFullView: function(scope, index, target, record)
    {
    	console.log("showing slide id = "+record.data.id);
    	var fullView = this.up('slides-main-view').down('slides-fullview-list');
    	fullView.addSlide(record);
    },
    
    reload: function()
    {
    	this.down('list').getStore().load();
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
    
    
});