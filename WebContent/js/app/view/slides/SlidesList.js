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
                  '<div>',
                  '			<img src="'+Xedu.Config.getUrl(Xedu.Config.SLIDE_IMAGE_THUMB)+'{recordId}" /><br />',                 
                  '			<span style="color:gray">Title: </span>{recordTitle}, ',
                  '</div>',
              ],                  
        listeners:
        {        
        	show:function(thisView,opts)
        	{
        		console.log("showing...slides");
        		thisView.setMasked({msg:"Loading slides..."});
        		var slideListStore = thisView.getStore();
        		var courseId = thisView.p.courseid;
				var topicid = thisView.p.topicid;				
				slideListStore.getProxy().setUrl(slideListStore.getProxy().getUrl()+topicid);
        		slideListStore.load({callback : function(records, operation, success) 
					                    {				            	
					                    	thisView.setMasked(false);		    		                        	                       	                	    			            					            			                        
					                    }});
        		
//        		viewInstance.getControl().loadslides();
        	},
//        	painted:function(viewInstance,opts)
//			{
//        		console.log("painted...slides");
//        		viewInstance.loadSlidesRecords();
//			},
        	itemsingletap: function(scope, index, target, record)
			{        		
				console.log("tapped");
				var courseId = scope.p.courseid;
				var topicid = scope.p.topicid;
				alert("tapped on slide ="+record.id+"topicid ="+topicid+", courseid = "+courseid);
//           	 	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+record.id+"/topics");
			}
		}	    
	        
    }
    
    
});