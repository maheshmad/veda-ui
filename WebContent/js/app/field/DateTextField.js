Ext.define('Xedu.field.DateTextField', 
{
	xtype:'datetextfield',
	extend: 'Ext.field.Text', 
//	alias: 'datetextfield',
    setValue: function (value) 
    {
        if (this.config.dateFormat && value) 
        {
            console.log("setting the date format ="+this.config.dateFormat);
        	if (Ext.isDate(value)) 
            {
                value = Ext.Date.format(value, this.config.dateFormat);
            }
            else 
            {
                var d = new Date(value);
                value = Ext.Date.format(d, this.config.dateFormat);
            }
        }
        this.callSuper(arguments);
    }
    
});