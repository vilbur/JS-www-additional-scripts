/*==================================================================================================================================

	FIND & REPLACE DIALOG:
	'Replace In All' scripts button added  
	Mark script link where 'Replaced all' was used                       
	Mark active script link                
					
==================================================================================================================================*/

/** Add button 'replace in all scripts' 
*/
function addButtonReplaceInAllScripts(){
	//setTimeout( function(){
	if($('#replace-in-all-scripts').length===0)
		$('.findreplace-box .buttons button:last-of-type').before('<button type="button" id="replace-in-all-scripts" class="gwt-Button">Replace In All</button>');
	//}, 500);
}
/** repalceInAll
*/
function repalceInAll(){

	var input_replace = $('.gwt-TextBox.input[aria-label="Replace"]');
	var links = $('.findreplace-box .gwt-Anchor');
	
	if(input_replace.val()!==''){
	var answer = confirm ("Replace in all scripts ?");
		if (answer){
			links.each(function(index){
				clickOnLink(this, index);
			});
		}
	} else
		input_replace.focus();
}
/** clickOnLink
*/
function clickOnLink(link,index){
	var timeout = 1000*index;
	setTimeout( function(){
		$(link)[0].click();
	}, timeout);
	setTimeout( function(){
		$('.findreplace-box .gwt-Button:nth-of-type(3)').click();
	}, timeout+500);
	
	
}
/** selectReplaceInput
*/
function selectReplaceInput(){
	if( $('.findreplace-box .input[aria-label="Find"]').val()!=='')
		$('.findreplace-box .input[aria-label="Replace"]').focus();
}	
/** fillReplaceInput
*/
function fillReplaceInput(){
	if( $('.findreplace-box .input[aria-label="Find"]').val() === 'NewScript')// auto fill replace with script name if search for NewScript
		$('.findreplace-box .input[aria-label="Replace"]').val($('#docs-title-inner').html());
}

/*
	====== EVENTS ======
*/

/* Add class '.active' to link of 'Find & Replace dialog'
*/
$(document).on('click', '.findreplace-box .gwt-Anchor', function(){
	$( '.findreplace-box .gwt-Anchor').removeClass('active');
	$(this).addClass('active');
});

/* Add class 'replaced' to link, when 'Replace all' button is clicked
*/
$(document).on('click', '.findreplace-box .gwt-Button:nth-of-type(3)', function(){
	$('.findreplace-box .gwt-Anchor.active').addClass('replaced');
});

/* Focus INPUT REPLACE if
*/
$(document).on('focus', '.findreplace-box .input[aria-label="Find"]', function(){
	if($('#replace-in-all-scripts').length===0){
		setTimeout( function(){
			fillReplaceInput();
			selectReplaceInput();
		}, 100);
	}
});


/* Add replace button on INPUT REPLACE focused
*/
$(document).on('focus', '.findreplace-box .input[aria-label="Replace"]', function(){
	addButtonReplaceInAllScripts();
});

/* Auto FIND on INPUT FIND blured
*/
$(document).on('blur', '.gwt-TextBox.input[aria-label="Find"]', function(){
	$('.findreplace-box .gwt-Button:nth-of-type(1)').click();
});
/* Add class 'replaced' to link, when 'Replace all' button is clicked
*/
$(document).on('click', '#replace-in-all-scripts', function(){
	repalceInAll();
});
