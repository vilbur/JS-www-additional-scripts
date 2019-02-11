/*==================================================================================================================================
					
	EDITOR TABS:
	Close tab on middle click              
	Add Tooltip about prefix to reource list items                       

==================================================================================================================================*/

/** setTabColor
 * for Stylish styling
*/
function setTabColor(menuitem){
	setTimeout( function(){ 
		$('.gwt-TabLayoutPanelTab-selected .name').attr('title', $(menuitem).find('.name').attr('title'));
	}, 500);
}

/*
	====== EVENTS ======
*/
/** On script tab click
*/
$(document).on('mousedown','.gwt-TabLayoutPanelTabs>div', function(e) {
    if (e.which === 1)
		setWindowTitle();
    if (e.which === 2) //  Close tab on middle click
		$(this).find('.gwt-Image.close-button').click();
});


