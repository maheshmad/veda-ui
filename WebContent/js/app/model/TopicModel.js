Ext.define('Xedu.model.TopicModel', 
{
    extend: 'Ext.data.Model',
    requires:['Xedu.model.SlideModel'],
    config: 
    {	    
    	fields: [
	 				{name:'id', type:'string'},
	 				{name:'name', type:'string'},
	 				{name:'title', type:'string'},
	 				{name:'subTitle', type:'string'},
	 				{name:'description', type:'string'}	 				
 				],
 		hasMany:[{name: 'slides',model: 'SlideModel' }],
 		
	}

});