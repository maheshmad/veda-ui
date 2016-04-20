Ext.define('Xedu.model.ClassroomModel', 
{
    extend: 'Ext.data.Model',
    requires:[],
    config: 
    {	    
    	fields: [
 				{name:'id', type:'string'},
 				{name:'name', type:'string'},
 				{name:'title', type:'string'},
 				{name:'subTitle', type:'string'},
 				{name:'description', type:'string'},
 				{name:'enrolledStudents', type:'auto'}
 				], 			
 		
 		proxy: 
 		    {
 		        type: 'rest',
 		        url:Xedu.Config.getUrl(Xedu.Config.CLASSROOM_API),
 		        reader: 
 		        {
 		            type: 'json',
 		            idProperty:'id',
 		            rootProperty: 'classroom',
 		        }
 		    }
	}

});