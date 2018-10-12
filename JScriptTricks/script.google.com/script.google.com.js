/*==================================================================================================================================*/
/*                                                                         
/* BROWSER WINDOW:
/*    Add current script name to window title
/*                  
/* ------------------------------------------------------------------------
/*                  
/* RESOURCE LIST:
/*    Add tooltip of file prefix on hovered item                           
/*    Context menu on double click           
/*                  
/* ------------------------------------------------------------------------
/*                  
/* FILE TABS:
/*    Close tab on middle click              
/*    Add Tooltip about prefix to reource list items                       
/*                  
/* ------------------------------------------------------------------------
/*                  
/* CODE AREA:
/*    Add class '.this' to <span>this</span> 
/*    Add Tooltip about prefix to reource list items                       
/*                  
/* ------------------------------------------------------------------------
/* FIND & REPLACE DIALOG:
/*    'Replace In All' scripts button added  
/*    Mark script link where 'Replaced all' was used                       
/*    Mark active script link                
/*                  
/* ------------------------------------------------------------------------
/*                  
/* LIBRARY DIALOG:
/*   Auto select highest versions of libraries                             
/*                  
/*                  
/*==================================================================================================================================*/



/** Wait for element Exists
 * https://gist.github.com/chrisjhoughton/7890303
 */
var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};




/* ================================================================================================================================== */
/*	BROWSER WINDOW:
/* ================================================================================================================================== */

/** set Window Title by Project name and selected script
*/
function setWindowTitle(){
	setTimeout( function(){ 
		var name_project	= $('#docs-title-inner').html();
		var name_script	= $('.gwt-TabLayoutPanelTab-selected .gwt-Label.name').html();
		if (!name_script.match(/^\!.*/gi)) 
			document.title = name_project +' - '+ name_script;
	}, 500);
}

/*
	====== EVENTS ======
*/
/**  Add current script name to window title
*/
$(document).on('click','.project-items-list>div', function() {
	setWindowTitle();
	setTabColor(this);
});




/* ================================================================================================================================== */
/*	RESOURCE LIST:
/* ================================================================================================================================== */

/** Show dropdown menu on file in filelist
* // select opened Tabs does not work
*/
$(document).on('dblclick','.project-items-list>div', function() {
	//var last_tab = $('.gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab:last-of-type()');
	$(this).find('.gwt-Image.dropdown').click();
});


/**  Add Tooltip on hovered item in Resourcel list
*/
$(document).on('mouseover','.project-items-list>div', function() {
	//setWindowTitle();
	//setTabColor(this);
	var resource_title	= $(this).find('.name');
	var title	= resource_title.html();
	var tooltip	= '';
	var prefix_chars	= [ '!', '─', '~!~', '~', '_' ];
	
	var match_title = (new RegExp('^('+prefix_chars.join('|')+')', 'gi')).exec(title);
	if (match_title) 
		switch (match_title.pop()){
			case prefix_chars[0]: tooltip = "MAIN SCRIPT FILE - Same name as project";break;
			case prefix_chars[1]: tooltip = "Library file - Same content in all scripts";break;
			case prefix_chars[2]: tooltip = "PLACE THIS FILE TO MAIN SCRIPT";break;
			case prefix_chars[3]: tooltip = "Interface file - Same functions in files, different cotnent per script";break;
			case prefix_chars[4]: tooltip = "Html file";break;
		}

	if(tooltip!==''){
		tooltip = '    // "'+match_title.pop()+'" prefix for: '+ tooltip+' ';
		resource_title.attr('title', title + tooltip );
	}

});







/* ================================================================================================================================== */
/*	FILE TAB:
/* ================================================================================================================================== */
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



/* ================================================================================================================================== */
/*	CODE AREA:
/* ================================================================================================================================== */
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

/* ================================================================================================================================== */
/*	FIND & REPLACE DIALOG:
/* ================================================================================================================================== */

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






/* ================================================================================================================================== */
/*	MANAGE VERSIONS DIALOG:
/* ================================================================================================================================== */
/** Automatically add text to first version of script.
 *  1st version of script should be 'EMPTY' NON WORKING script, THIS ALLOWS TEMPORARY DISABLE SCRIPT IN LIBRARY 
 */
function setDescriptionOfFrisrtVersion(){
	if($('.version-dialog .header-row + tr').length===0){
		$('.version-dialog .smart-textbox').css('color','red').val('DISABLED version of script.');
	}
}


/*
	====== EVENTS ======
*/
/** Set auto description if first revision
 *
 */
$(document).on('click', 'span.goog-menuitem-label:contains("Manage versions...")', function(){
	setTimeout( function(){ 
		setDescriptionOfFrisrtVersion();
	}, 1000);
});


/* ================================================================================================================================== */
/*	LIBRARY DIALOG:
/* ================================================================================================================================== */

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


/* ================================================================================================================================== */
/*	INIT                                                                                                                              */
/* ================================================================================================================================== */
	
$(document).ready(function() {
	setTimeout( function(){ 
		setWindowTitle();
	}, 500);
});



