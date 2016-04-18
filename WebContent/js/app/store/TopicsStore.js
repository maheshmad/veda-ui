Ext.define('Xedu.store.TopicsStore', 
{
    alias:'store.topics-store',
    require:['Xedu.Config',
             'Ext.data.proxy.Rest'],
	extend: 'Ext.data.Store', 
	config:
	{
		model:'Xedu.model.TopicModel',
	    remoteSort:false, 
	    autoLoad:false,
	    proxy: 
	    {
	        type: 'rest',
	        url : Xedu.Config.getUrl(Xedu.Config.CHAPTER_API),
	        reader: 
	        {
	            type: 'json',
	            rootProperty: 'chapter.topics'	            
	        }
	    }
	}
});