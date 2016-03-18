Ext.define('Xedu.store.SlidesListStore', 
{
    alias:'store.slides-list-store',
    require:['Xedu.Config',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
	    fields:[
	            {name:'recordId', type:'string'},
	            {name:'recordTitle', type:'string'},
	            {name:'recordSubtitle', type:'string'}            
	        ],       
	    pageSize: 10,
	    remoteSort:false, 
	    autoLoad:false,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.SLIDES_LIST_SEARCH_BY_TOPIC),
	        reader: 
	        {
	            type: 'json',
	            rootProperty: 'hits',
	            totalProperty: 'totalHits'
	        },
	        filterParam: 'name'       
	    }
	}
});