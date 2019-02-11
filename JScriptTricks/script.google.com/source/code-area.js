/*==================================================================================================================================
																			
	CODE AREA:
	Add class '.this' to <span>this</span> 
	Add Tooltip about prefix to resource list items  
					
==================================================================================================================================*/

/** addClassToSpan_this
*/
function addClassToSpan_this(){
	$('.code-area').find('.cm-variable-2:not(.this):contains("this")').addClass('this');
}

/*
	====== EVENTS ======
*/
/** Show dropdown menu on file in filelist
* // select opened Tabs does not work
*/
$(document).on('click','.code-area', function() {
	addClassToSpan_this();
});
