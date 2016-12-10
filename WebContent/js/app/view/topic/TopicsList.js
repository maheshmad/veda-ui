Ext.define('Xedu.view.topic.TopicsList', 
{	
	extend:'Ext.Panel',
	xtype:'topics-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.TopicsStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.topic.TopicEditForm'
		    ], 
    config: 
    {
        title:"Topics",
    	layout:'vbox',
    	chapterid:null,
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
				    title:'Topics',
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
								    	this.up("topics-list-panel").createNewTopic();
								    }
								}
				           ]					    
               },
               {
				   xtype:'searchfield',
	               placeHolder: 'Search ...',
	               align: 'center',
	               ui:'dark',
	               height:50,
				   listeners:
	               {
	                	keyup:function(el, e, eOpts )
	                	{		                			                		
	                		Xedu.CommonUtils.filterStore(this.up('topics-list-panel').down('list'),el.getValue());
	                	}
	               }
               },
               {
			    	xtype:'list',
			    	flex:1,
			    	itemId:'topics-list-panel-id', 
			        /*
			         * panel custom config params
			         */			        
			        scrollable: true,
			        autoDestroy:true,        
			        store: 
			        {
			        	type:'topics-store'
			        },
			        plugins: [
			                  {
			                      xclass: 'Ext.plugin.PullRefresh',
			                      pullText: 'Pull down to refresh the list!'
			                  }
			              ],                     
			        itemTpl: [
			                  '<div>',
			                  '			<span style="color:gray">No:</span> {id} ',
			                  '			<span style="color:gray">Title: </span>{name}, ',
			                  '</div>',
			              ],        
			        listeners:
			        {
			        	show:function(thisView,opts)
			        	{        			        				    			
			    			thisView.up("topics-list-panel").loadTopics(thisView.getChapterid());
			        	},
			        	itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped");
							scope.up('topics-list-panel').topicSelected(record);
						}			        	
					}
               }],
       listeners:
        {
        	show:function(thisView,opts)
        	{        			        				    			    			
				thisView.down('titlebar').setHidden(thisView.getHideTitlebar());
        		thisView.loadTopics(thisView.getChapterid());
        	}        	
		}
		            
    },
	
    /*
     * when course selected
     */    
    topicSelected: function(record)
    {
    	if (this.getCallbackOnSelect())
    	{
			this.handleCallback(record.data.id);
    	}
    	else
    	{
    		Xedu.app.getController('Main').redirectTo("view/topic/"+record.data.id);
    	}
    },
    
    /*
     * handle call back
     */
    handleCallback: function(param)
    {
    	console.log("handling callback for topic... ");
    	var callbck = this.getCallbackOnSelect();
    	var callScope = this.getCallbackScope();
    	if (typeof callbck == "function")
    	{
    		if (!callScope)
    			console.error("Missing scope inside callbackConfig ");
    		else
    			callbck.apply(callScope,[param]);
    	}
    	
    	if (this.getCloseOnSelect())
    		this.hide();
    	    	
    },
    /*
     * load topics
     */
    loadTopics: function(chapterid)
    {
    	this.setChapterid(chapterid);
    	var chaptersList = this.down("list");
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.CHAPTER_API)+chapterid;
    	var topicsStore = chaptersList.getStore();
    	topicsStore.getProxy().setUrl(restUrl);
    	topicsStore.load({callback: function(records, options, success) 
    		{ 
    			console.log(records.length);
    		}});    	
    },
    
    /*
     * show create new form popup
     */    
    createNewTopic: function()
    {
    	var chapteridParam = this.getChapterid();
    	        	
    	var newTopicEditFormPanel = {
						            	xtype: 'Xedu.view.topic.TopicEditForm',
						            	chapterid:chapteridParam	
						            };
    	
    	Xedu.CommonUtils.showOverlay(newTopicEditFormPanel,{title:"Create New Topic"});
    	
    }
    
    
});