Ext.define('Xedu.model.CourseModel', 
{
    extend: 'Ext.data.Model',
    requires:['Xedu.model.ChapterModel'],
    config: 
    {	    
    	fields: [
 				{name:'id', type:'string'},
 				{name:'name', type:'string'},
 				{name:'title', type:'string'},
 				{name:'subTitle', type:'string'},
 				{name:'description', type:'string'},
 				{name:'chapters', type:'auto'},
 				],
 		hasMany:[{name: 'chapters',model: 'ChapterModel' }],		
 		
 		proxy: 
 		    {
 		        type: 'rest',
 		        url:Xedu.Config.getUrl(Xedu.Config.COURSE_API),
 		        reader: 
 		        {
 		            type: 'json',
 		            idProperty:'id',
 		            rootProperty: 'course',
 		        }
 		    }
	}

});