Ext.define('Xedu.model.ChapterModel', 
{
    extend: 'Ext.data.Model',
    requires:['Xedu.model.TopicModel'],
    config: 
    {	    
    	fields: [
	 				{name:'id', type:'string'},
	 				{name:'name', type:'string'},
	 				{name:'title', type:'string'},
	 				{name:'subTitle', type:'string'},
	 				{name:'description', type:'string'}	 				
 				],
 		hasMany:[{name: 'topics',model: 'TopicModel' }]
 		
	}

});	