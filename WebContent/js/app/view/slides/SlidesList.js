Ext.define('Xedu.view.slides.SlidesList', 
{
	extend:'Ext.dataview.List',
	xtype:'slides-list-panel',	
	requires: [		    		    		    
	           'Xedu.store.SlidesListStore',
	           'Ext.plugin.PullRefresh'
		    ],
    config: 
    {
        itemId:'slides-list-panel-id', 
        title:'Slides',
        /*
         * panel custom config params
         */
        courseid:null,
        topicid: null,	   
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
        		if (scope.getTopicid() != '')
        			thisView.loadslideslist();
        	},
        	itemsingletap: function(scope, index, target, record)
			{        		
				console.log("tapped");
				var courseId = scope.getCourseid();
				var topicid = scope.getTopicid();
				scope.showSlideOnFullView(scope, index, target, record);
//				alert("tapped on slide ="+record.data.recordId+"topicid ="+topicid+", courseid = "+courseId);				
//           	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+record.id+"/topics");
			}
		}	    
	        
    },
    
    loadslideslist: function()
    {
    	console.log("showing...slides from loadslideslist ");
		var thisView = this;
    	thisView.setMasked({msg:"Loading slides..."});
		var slideListStore = thisView.getStore();
		var courseId = thisView.getCourseid();
		var topicid = thisView.getTopicid();				
		slideListStore.getProxy().setUrl(slideListStore.getProxy().getUrl()+topicid);
		slideListStore.load({callback : function(records, operation, success) 
			                    {				            	
			                    	thisView.setMasked(false);		    		                        	                       	                	    			            					            			                        
			                    }});
    },
    
    showSlideOnFullView: function(scope, index, target, record)
    {
    	var fullView = Ext.ComponentQuery.query('slides-fullview-list');
//    	if (fullView && fullView[0])
//    	{
    	fullView[0].addSlide(record);
//    	}
    }
    
    
});