Ext.define('Xedu.store.TopicsStore', 
{
    alias:'store.topics-store',
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
	    autoLoad:true,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.TOPICS_SEARCH),
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