Ext.define('Xedu.model.EventScheduleModel', 
{
    extend: 'Ext.data.Model',
    requires:[],
    config: 
    {	    
    	fields: [
	 				{name:'id', type:'string'},
	 				{name:'eventStartDate', type:'date'},
	 				{name:'classroomid', type:'string'},
	 				{name:'eventEndDate', type:'date'},
	 				{name:'eventType', type:'string'},
	 				{name:'eventStatus', type:'string'},
	 				{name:'eventTitle', type:'string'},
	 				{name:'eventSessionId', type:'string'},
	 				{name:'eventDescription', type:'string'},
	 				{name:'lastUpdatedDateTime', type:'string'},
	 				{name:'updatedBy', type:'string'}
 				],
		proxy: 
	    {
	        type: 'rest',
	        url:Xedu.Config.getUrl(Xedu.Config.EVENT_SCHEDULE_API),
	        reader: 
	        {
	            type: 'json',
	            idProperty:'id',
	            rootProperty: 'eventSchedule',
	        }
	    }
	}

});