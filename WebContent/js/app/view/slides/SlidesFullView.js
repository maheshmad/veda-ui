Ext.define('Xedu.view.slides.SlidesFullView', 
{
	requires:['Xedu.model.SearchHitModel'],
	extend:'Xedu.ux.PinchZoomImage',
	xtype:'slides-fullview',	
	requires: [	
		    ],
    config: 
    {
        itemId:'slides-fullview', 
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
                                   
	        
    },
    
    addSlide: function(slideRecord)
    {
    	var titlebar = this.parent.down('titlebar');
    	if (titlebar)
    		titlebar.setTitle(slideRecord.data.recordTitle);
    	
    	this.setSrc(Xedu.Config.getUrl(Xedu.Config.SLIDE_IMAGE_LARGE)+slideRecord.data.recordId);
    	
    },
    
    showSlideById: function(slideid)
    {
    	var record = Ext.create('SearchHitModel',{'recordId':slideid,'recordTitle':'','recordSubtitle':''});
    	this.addSlide(record);    	
    }
    
    
});