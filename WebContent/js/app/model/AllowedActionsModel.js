Ext.define('Xedu.model.AllowedActionsModel', 
{
    extend: 'Ext.data.Model',
    requires:[],
    config: 
    {	    
    	fields: [
 				{name:'link', type:'string'},
 				{name:'type', type:'string'},
 				], 			
 		proxy: 
 		    {
 		        type: 'rest',
 		        url:'',
 		        reader: 
 		        {
 		            type: 'json',
 		            rootProperty: 'actions',
 		        }
 		    }
	}

});