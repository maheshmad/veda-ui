Ext.define('Xedu.model.SearchHitModel', 
{
    extend: 'Ext.data.Model',
    
    config: 
    {	    
    	fields: [
					{name:'recordId', type:'string'},
					{name:'recordTitle', type:'string'},
					{name:'recordSubtitle', type:'string'}       	 					
 				] 		
	}

});