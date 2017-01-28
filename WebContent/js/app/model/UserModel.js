Ext.define('Xedu.model.UserModel', 
{
    extend: 'Ext.data.Model',
    config: 
    {	    
    	fields: [
				{name:'id', type:'string'},
				{name:'userRecordId', type:'string'},
				{name:'userId', type:'string'},
				{name:'emailId', type:'string'},
				{name:'userPswd', type:'string'},
				{name:'userRoles', type:'string'},
				{name:'firstName', type:'string'},
				{name:'middleName', type:'string'},
				{name:'lastName', type:'string'},
				{name:'addressLine1', type:'string'},
				{name:'addressLine2', type:'string'},
				{name:'city', type:'string'},
				{name:'state', type:'string'},
				{name:'postalcode', type:'string'},
				{name:'country', type:'string'},					
				{name:'cellphone', type:'string'},
				{name:'okToText', type:'string'},
				{name:'landlinephone', type:'string'},
				{name:'officephone', type:'string'},
				{name:'officephoneExt', type:'string'},
				{name:'updatedBy', type:'string'},
				{name:'lastUpdatedDateTime', type:'date'}
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