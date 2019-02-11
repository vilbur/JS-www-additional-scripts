/** Wait until certain element exists
 * https://gist.github.com/chrisjhoughton/7890303
 */
var waitThenElelemntExists = function(selector, callback) {
  if (jQuery(selector).length) {
		callback();
  } else {
    setTimeout(function() {
		waitThenElelemntExists(selector, callback);
    }, 100);
  }
};
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
/*	INIT                                                                                                                              */
/* ================================================================================================================================== */
	
//$(document).ready(function() {
//	setTimeout( function(){ 
//		setWindowTitle();
//	}, 500);
//});



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
/*==================================================================================================================================
																			
	GITHUB REPOSIORY DROPDOWN
	Script for chrome extension 'Google Apps Script GitHub Assistant'
	https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo


				
==================================================================================================================================*/


var whitelist_repositories	= ['vilbur/GAS'];

/** Remove non related items from GitHub repositories 
 *  @param	['mask']	whitelist_repositories	Oarts of names of repositories which will not be removed
 */
function removeNonGasRepositories( whitelist_repositories )
{
	/** selectors
	 * @return	[':not(:contains(SELECTOR)']	array of whitelisted whitelist_repositories
	 */
	var selectors = whitelist_repositories.map(function(repository){
		return ':not(:contains('+repository+'))';
	});
	
	var non_gas_repositories = 'div'+selectors.join('');
	
	$('.scm-item.goog-menuitem:not(.scm-new-repo, .scm-use-gist)').each(function(){
		$(this).find( non_gas_repositories )
			.closest('.scm-item')
				.remove();
	}); 
}


/**  Select current repository 
 */
function selectCurrentRepository( )
{
	var current_name = $('.docs-title-inner').text();

	$('.goog-menuitem-content[data*="'+current_name+'"]')
		.css('border','1px solid #64de89')
		.click();	
}
/**  
 *	
 */
function cssButtons( )
{
	var buttons	= ['#push-button div div', '#pull-button div div'];
	
	$(buttons[0]).css('color', 'orange');
	$(buttons[1]).css('color', 'lightgreen');
	
	$(buttons.join(',')).css('font-size', '24px');
}

/**  
 *	
 */
function cssBranch( )
{
	$('#scm-bind-branch:contains("Branch: master")')
		.css('color', 'lightgreen');
}


/**  Init functions 
 *	
 */
function initScritsForGitHubExtension( )
{
	removeNonGasRepositories(whitelist_repositories);
	selectCurrentRepository();
	cssButtons();
	cssBranch();
}


waitThenElelemntExists('#scm-bind-repo, #scm-bind-branch', function() {
	setTimeout( function(){
		initScritsForGitHubExtension(); 		
	}, 2000);
});
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

