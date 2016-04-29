Ext.define('Xedu.model.EnrollmentModel', 
{
    extend: 'Ext.data.Model',
    requires:['Xedu.model.UserModel',
              'Xedu.model.ClassroomModel'],
    config: 
    {	    
    	fields: [
 				{name:'id', type:'string'},
 				{name:'classroomid', type:'string'},
 				{name:'userRecordId', type:'string'},
 				{name:'enrolledOn', type:'date'},
 				{name:'verifiedBy', type:'string'},
 				{name:'updatedBy', type:'string'},
 				{name:'startDate', type:'date'},
 				{name:'endDate', type:'date'},
 				{name:'enrollStatus', type:'string'},
 				{name:'lastUpdatedDateTime', type:'date'},
 				{name:'student', model:'Xedu.model.UserModel'},
		        {name:'classroom', model:'Xedu.model.ClassroomModel'}
 				], 			
// 		hasOne:[
// 		        	
// 		       ],
 		proxy: 
 		    {
 		        type: 'rest',
 		        url:Xedu.Config.getUrl(Xedu.Config.ENROLLMENT_API),
 		        reader: 
 		        {
 		            type: 'json',
 		            idProperty:'id',
 		            rootProperty: 'enrollment',
 		        }
 		    }
	}

});