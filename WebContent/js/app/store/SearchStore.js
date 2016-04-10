Ext.define('Xedu.store.SearchStore', 
{
    alias:'store.search-store',
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
	        reader: 
	        {
	            type: 'json',
	            idProperty:'recordId',
	            rootProperty: 'hits',
	            totalProperty: 'totalHits'
	        },
	        filterParam: 'name'       
	    }
	}
});