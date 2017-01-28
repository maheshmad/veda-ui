Ext.define('Xedu.store.UserRolesStore', 
{
    alias:'store.user-roles-store',
    require:['Xedu.Config',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
		fields: [
	 				{name:'text', value:'string'},
	 				{name:'value', value:'string'},
 				], 		    	  
		data : [
		        {text: 'ADMIN',  value: 'ADMIN'},
                {text: 'PARENT', value: 'PARENT'},
                {text: 'STUDENT', value: 'STUDENT'},
                {text: 'PRINCIPAL', value: 'PRINCIPAL'},
                {text: 'TEACHER', value: 'TEACHER'}
		    ]
	}
});