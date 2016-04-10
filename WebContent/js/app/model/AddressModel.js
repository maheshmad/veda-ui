Ext.define('Xedu.model.AddressModel', 
{
    extend: 'Ext.data.Model',
    config: 
    {	    
    	fields: [				
					{name:'addressLine1', type:'string'},
					{name:'addressLine2', type:'string'},
					{name:'city', type:'string'},
					{name:'state', type:'string'},
					{name:'postalcode', type:'string'},
					{name:'country', type:'string'}					
				],  
	}

});