/*==================================================================================================================================

	RESOURCE LIST:
		Auto sort resource file list
		Context menu on double click           	
					
==================================================================================================================================*/

/** Sort child elements by attribute
 */
function sortChildElements(parent, childSelector, keySelector)
{
    var items = parent.children(childSelector).sort(function(a, b)
	{
        var vA = $(a).attr('aria-label');
        var vB = $(b).attr('aria-label');
		//console.log( vA );
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });

    parent.append(items);
}

/** Sort resource list by filename
 */
function sortResourceLists()
{
	setTimeout( function(){
		sortChildElements($('.project-items-list'), "div", "aria-label");
	}, 500);
}


/*
	====== INIT ======
*/
$( document ).ready(function()
{
	sortResourceLists();
});

/*
	====== EVENTS ======
*/

/** Show dropdown menu on file in filelist
* // select opened Tabs does not work
*/
$(document).on('dblclick','.project-items-list>div', function() {
	//var last_tab = $('.gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab:last-of-type()');
	$(this).find('.gwt-Image.dropdown').click();
});

/**  Add current script name to window title
*/
$(document).on('click','.project-items-list>div', function() {
	sortResourceLists();
	setWindowTitle();
	setTabColor(this);
});