/*==================================================================================================================================

	RESOURCE LIST:
	Context menu on double click           	
					
==================================================================================================================================*/

/** Show dropdown menu on file in filelist
* // select opened Tabs does not work
*/
$(document).on('dblclick','.project-items-list>div', function() {
	//var last_tab = $('.gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab:last-of-type()');
	$(this).find('.gwt-Image.dropdown').click();
});

