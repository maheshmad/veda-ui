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
    	layout:'fit',
    	chapterid:null,
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
									   xtype:'searchfield',
									   name:'searchcourses'
								},
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
			    	xtype:'list',
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
			           	 	Xedu.app.getController('Main').redirectTo("view/topic/"+record.data.id);
						}
					}
               }],
       listeners:
        {
        	show:function(thisView,opts)
        	{        			        				    			    			
        		thisView.loadTopics(thisView.getChapterid());
        	}        	
		}
		            
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