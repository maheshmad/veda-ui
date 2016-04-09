Ext.define('Xedu.view.config.ConfigSectionsList', 
{
	extend:'Ext.dataview.List',
	xtype:'config-sections-list-panel',	
	requires: [		    		    		    
		    'Xedu.store.ConfigSectionsStore',
		    'Ext.form.FieldSet',
		    'Ext.field.Text',
		    'Ext.plugin.PullRefresh'],
    config: 
    {
        itemId:'config-sections-list-panel-id', 
        title:'Config',
        scrollable: true,
        autoDestroy:true,
        store: 
        {
        	type:'config-sections-store'
        },
        plugins: [
                  {
                      xclass: 'Ext.plugin.PullRefresh',
                      pullText: 'Pull down to refresh the list!'
                  }
              ],       
        itemTpl: [
                  '<div>',
                  '			<span style="color:blue"> {sectionName} </span>',
                  '</div>',
              ],        
        onItemDisclosure: function(record, btn, index) 
        {
//              Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('configGroups'), Ext.emptyFn);
              var configGroupFormPanel = Ext.ComponentQuery.query('#config-group-form')[0];
              configGroupFormPanel.removeAll(true);
              var configGroupsData = record.get('configGroups');
              
              /* title update */
              var formtitlebar = configGroupFormPanel.down('titlebar');
              formtitlebar.setTitle(record.data.sectionName);
              
              /*
               * 
               */
              for (var i=0;i<configGroupsData.length;i++)
              {
            	  var configGrp = configGroupsData[i];
            	  var configFieldSet = Ext.create('Ext.form.FieldSet',
            			  							{
								            		  itemId:'fieldset-'+configGrp.id,
            		  									title: configGrp.configGroupName,
								                      instructions: configGrp.footerNote,
								                      layout:'vbox'
										        	});
            	  
            	  console.log(" adding fieldset = "+configGrp.configGroupName);
            	  configGroupFormPanel.add(configFieldSet);            	  
            	  for (var cfg=0;cfg<configGrp.configs.length;cfg++)
                  {
            		  var config = configGrp.configs[cfg];
            		  var configTextField = Ext.create('Ext.field.Text',{
											            	name: config.id,
											            	label: config.id,
											            	value: config.configValue,
											        	});            	              	  
            		  
            		  configFieldSet.add(configTextField);            		  
                  }
            	  
            	  
            	  
            	  
              }
              
              
                            
        },
        listeners:
        {
			itemsingletap: function(scope, index, target, record)
			{        		
//				console.log("tapped");
//           	 	Xedu.app.getController('Main').redirectTo('view/course/'+record.data.recordId+"/chapters");
			}
		}
		            
    },
    
});