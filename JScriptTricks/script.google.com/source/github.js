/*==================================================================================================================================
																			
	GITHUB REPOSIORY DROPDOWN
	Script for chrome extension 'Google Apps Script GitHub Assistant'
	https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo

	1) Remove non related items from GitHub repositories 
	2) Select current repository
	
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
