Ext.define('Xedu.store.AllowedActionsStore', 
{
    alias:'store.allowed-actions-store',
    require:['Xedu.Config',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
		fields: [
	 				{name:'link', type:'string'},
	 				{name:'type', type:'string'}
 				], 		    	  
	    remoteSort:false, 
	    autoLoad:false,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.ALLOWED_ACTIONS_API),
	        reader: 
	        {
	            type: 'json',
	            idProperty:'type',
	            rootProperty: 'actions'
	        },
	        filterParam: 'recordType'       
	    }
	}
});