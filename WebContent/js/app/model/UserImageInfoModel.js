Ext.define('Xedu.model.UserImageInfoModel', 
{
    extend: 'Ext.data.Model',
    config: 
    {	    
    	fields: [				
				{name:'imageid', type:'string'},				
				{name:'lastUpdatedDateTime', type:'date'},				
				{name:'userId', type:'string'},				
				{name:'userImageType', type:'string'}				
				],
		
		 proxy: 
		    {
		        type: 'rest',
		        url:Xedu.Config.getUrl(Xedu.Config.USER_SERVICE),
		        reader: 
		        {
		            type: 'json',
		            idProperty:'id',
		            rootProperty: 'user',
		        }
		    }
				
				
	}

});