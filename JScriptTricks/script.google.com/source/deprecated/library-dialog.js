/*==================================================================================================================================

	LIBRARY DIALOG:
	Auto select highest versions of libraries                             
					
==================================================================================================================================*/

/** auto select highest library version
*/
function autoSelectHigherLibraryVersion(){ 
	
	/* Wait for library table exists */
	waitForEl('.maestro-dialog .lined-table .header-row + tr', function() {
		var answer = confirm ("Set all libraries to highest version ?");
		if (answer){
			var timeout;
			/* Click on every dropdown */
			$('.row .version input').each(function(index){
			var input	= $(this);
			timeout	= ((index+1)*500);
				setTimeout( function(){
					/* Click on every dropdown */
					input.click();
					/* Choose highest version */
					setTimeout( function(){ 
						$('.version-picker .versions tr.version:first-of-type .description').click();
					}, timeout+200);
				},timeout);
			});
			/* Click on Save button */
			setTimeout( function(){ 
				$('.maestro-dialog .buttons .gwt-Button:first-of-type').click();
			}, timeout+1000);
		}
	});
	
	
}

/*
	====== EVENTS ======
*/
/** On libraries open, update all versions
 *
 */
$(document).on('click', 'span.goog-menuitem-label:contains("Libraries...")', function(){
	setTimeout( function(){ 
		autoSelectHigherLibraryVersion();
	}, 1000);
});


