Ext.define('Xedu.model.SlideModel', 
{
    extend: 'Ext.data.Model',
    
    config: 
    {	    
    	fields: [
	 				{name:'id', type:'string'},
	 				{name:'name', type:'string'},
	 				{name:'title', type:'string'},
	 				{name:'subTitle', type:'string'},
	 				{name:'description', type:'string'}	 				
 				] 		
	}

});