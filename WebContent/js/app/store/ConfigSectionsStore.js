Ext.define('Xedu.store.ConfigSectionsStore', 
{
    alias:'store.config-sections-store',
    require:['Xedu.Config',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
	    fields:[	         
	            {name:'id', type:'string'},
	            {name:'sectionName', type:'string'},
	            {name:'configGroups', type:'auto'},   
	            {name:'allowedRoles', type:'auto'}   
	        ],       
	    pageSize: 10,
	    remoteSort:false, 
	    autoLoad:true,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.CONFIG_SECTIONS),
	        reader: 
	        {
	            type: 'json',
	            rootProperty: 'sections',	            
	        },
	        filterParam: 'name'       
	    }
	}
});