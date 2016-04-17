Ext.define('Xedu.model.CourseModel', 
{
    extend: 'Ext.data.Model',
    config: 
    {	    
    	fields: [
 				{name:'id', type:'string'},
 				{name:'name', type:'string'},
 				{name:'title', type:'string'},
 				{name:'subTitle', type:'string'},
 				{name:'description', type:'string'},
 				],
 		
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