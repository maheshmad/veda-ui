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
        	this.showSectionDetails(record);
        },
        listeners:
        {
			itemsingletap: function(scope, index, target, record)
			{        		
				this.showSectionDetails(record);
			},
			show: function(thisView)
			{
				console.log("showing config list");
				thisView.select(0);
			}
		}
		            
    },
    
    showSectionDetails: function(record) 
    {
    	var HeightOfField = 50;
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
							                      layout:
							                      {
							                    	type:'vbox',
							                    	pack:'start'
							                      }
									        });
      	        	  
      	  for (var cfg=0;cfg<configGrp.configs.length;cfg++)
          {
      		  var config = configGrp.configs[cfg];
      		  var configTextField = Ext.create('Ext.field.Text',{
										            	name: config.id,
										            	label: config.id,
										            	value: config.configValue,
										            	height:HeightOfField
										        	});            	              	  
      		  
      		  var fieldSetHeight = (cfg * HeightOfField) + HeightOfField + 100;
      		  console.log("height = "+fieldSetHeight);
    		  configFieldSet.setHeight(fieldSetHeight);
      		  configFieldSet.add(configTextField);
      		  
          }
      	        	  
      	  console.log(" adding fieldset = "+configGrp.configGroupName);
    	  configGroupFormPanel.add(configFieldSet);            	  
      	  
        }
    }
    
});