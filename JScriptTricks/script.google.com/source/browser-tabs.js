/*==================================================================================================================================
																			
	BROWSER TABS:
	Add current script name to window title
					
==================================================================================================================================*/

/** set Window Title by Project name and selected script
*/
function setWindowTitle()
{
	setTimeout( function()
	{
		var name_project	= $('#docs-title-inner').html();
		var name_script	= $('.gwt-TabLayoutPanelTab-selected .gwt-Label.name').html();
		if (!name_script.match(/^\!.*/gi)) 
			document.title = name_project +' - '+ name_script + ' | Script #GAS';
	}, 500);
}



