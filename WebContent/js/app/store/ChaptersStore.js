Ext.define('Xedu.store.ChaptersStore', 
{
    alias:'store.chapters-store',
    require:['Xedu.Config',
             'Xedu.model.ChapterModel',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
	    model:'Xedu.model.ChapterModel',
	    remoteSort:false, 
	    autoLoad:false,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.COURSE_API),
	        reader: 
	        {
	            type: 'json',
	            rootProperty: 'course.chapters'	            
	        }
	    }
	}
});