Ext.define('Xedu.view.chapter.ChaptersList', 
{
	extend:'Ext.Panel',
	xtype:'chapters-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.ChaptersStore',
		    'Ext.plugin.PullRefresh',
		    'Xedu.view.chapter.ChapterEditForm'
		    ],    
    config: 
    {
        title:"Chapters",
    	layout:'vbox',
    	/**
    	 * @cfg courseid
    	 */
    	courseid:null,
    	/*
         * callback options
         */
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
				    title:'Chapters',
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
								    	this.up("chapters-list-panel").createNewChapter();
								    }
								}
				           ]					    
               },
               {
				   xtype:'searchfield',
				   name:'searchchapters',				 
	               placeHolder: 'search chapters..',
	               align: 'center',
	               ui:'dark',
	               height:50,
				   listeners:
	               {
	                	keyup:function(el, e, eOpts )
	                	{		                			                		
	                		Xedu.CommonUtils.filterStore(this.up('chapters-list-panel').down('list'),el.getValue());
	                	}
	               }
               },
               {
			    	xtype:'list',
			    	flex:1,
			    	itemId:'chapter-list-panel-id', 
			        title:'Chapters',
			        /*
			         * panel custom config params
			         */			        
			        scrollable: true,
			        autoDestroy:true,        
			        store: 
			        {
			        	type:'chapters-store'
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
			        	itemsingletap: function(scope, index, target, record)
						{        		
							console.log("tapped");
							scope.up('chapters-list-panel').chapterSelected(record);
						}
			        	
					}
               }],
        listeners:
        {
        	show: function(thisView, opts)
			{        										
				thisView.down('titlebar').setHidden(thisView.getHideTitlebar());
			}        	
		}
		            
    },
    
    /*
     * when course selected
     */    
    chapterSelected: function(record)
    {
    	if (this.getCallbackOnSelect())
    	{
			this.handleCallback(record.data.id);
    	}
    	else
    	{
    		Xedu.app.getController('Main').redirectTo('view/chapter/'+record.data.id+"/topics");
    	}
    },
    
    /*
     * handle call back
     */
    handleCallback: function(param)
    {
    	console.log("handling callback for chapters... ");
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
     * load chapters
     */
    loadChapters: function(courseid)
    {
    	this.setCourseid(courseid);
    	var chaptersList = this.down("list");
    	var restUrl = Xedu.Config.getUrl(Xedu.Config.COURSE_API)+courseid;
    	var chaptersStore = chaptersList.getStore();
    	chaptersStore.getProxy().setUrl(restUrl);
    	chaptersStore.load({callback: function(records, options, success) 
    		{ 
    			console.log(records.length);
    		}});    	
    },
    
    /*
     * show create new form popup
     */    
    createNewChapter: function()
    {
    	var courseidParam = this.getCourseid();
    	
    	var newChapterEditForm = {xtype: 'Xedu.view.chapter.ChapterEditForm',
							      courseid:courseidParam	
						          };
    	
    	Xedu.CommonUtils.showOverlay(newChapterEditForm,{title:"Create New Chapter"});
    
    }
    
});