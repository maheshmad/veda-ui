Ext.define('Xedu.view.slides.SlidesFullViewList', 
{
	extend:'Ext.dataview.List',
	xtype:'slides-fullview-list',	
	requires: [		    		    		    
	           'Xedu.store.SlidesListStore',
		    ],
    config: 
    {
        itemId:'slides-fullview-list-id', 
        title:'Topic',
        /*
         * panel custom config params
         */
        courseid:null,
        topicid: null,	   
        scrollable: true,
        autoScroll:true,
        autoDestroy:true,
        store: 
        {
        	type:'slides-list-store'
        },                  
        itemTpl: [
                  '<div style="display:table-cell; vertical-align:middle; text-align:center;background-color:gray;width:100%">',
                  '			<img src="'+Xedu.Config.getUrl(Xedu.Config.SLIDE_IMAGE_LARGE)+'{recordId}" /><br />',                 
                  '</div>',
              ],                        
        listeners:
        {                	
        	itemsingletap: function(scope, index, target, record)
			{        		
				console.log("tapped");
				var courseId = scope.getCourseid();
				var topicid = scope.getTopicid();
				alert("tapped on slide ="+record.id+"topicid ="+topicid+", courseid = "+courseid);
//           	 	Xedu.app.getController('Main').redirectTo('view/course/'+courseId+'/chapter/'+record.id+"/topics");
			}
		}	    
	        
    },
    
    addSlide: function(slideRecord)
    {
    	var titlebar = this.parent.down('titlebar');
    	if (titlebar)
    		titlebar.setTitle(slideRecord.data.recordTitle);
    	this.getStore().removeAll();
    	this.getStore().add(slideRecord);
    }
    
    
});