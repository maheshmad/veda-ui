Ext.define('Xedu.view.slides.SlidesFullViewList', 
{
	requires:['Xedu.model.SearchHitModel'],
	extend:'Ext.dataview.List',
	xtype:'slides-fullview-list',	
	requires: [		    		    		    
	           'Xedu.store.SlidesListStore',
		    ],
    config: 
    {
        itemId:'slides-fullview-list-id', 
        background:'black',
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
                  '<div style="vertical-align:middle; text-align:center;background-color:black;width:100%;height:100%">',
                  '			<img style="max-height:100%; max-width:100%;" src="'+Xedu.Config.getUrl(Xedu.Config.SLIDE_IMAGE_LARGE)+'{recordId}" /><br />',                 
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
    },
    
    showSlideById: function(slideid)
    {
    	console.log("showing slide "+slideid);
    	var record = Ext.create('Xedu.model.SearchHitModel',{'recordId':slideid,'recordTitle':'','recordSubtitle':''});
    	this.addSlide(record);    	
    }
    
    
});