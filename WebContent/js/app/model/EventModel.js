Ext.define('Xedu.model.EventModel', 
{
    extend: 'Ext.data.Model',
    config: 
    {	    
    	fields: [				
					{name:'type', type:'string'},
					{name:'msg', type:'string'},
					{name:'from', type:'string'},
					{name:'to', type:'auto'},
					{name:"data", type:'auto'}					
				],  
	}

});