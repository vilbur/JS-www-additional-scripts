/** Create serach URL
 * 
 * This script can simulate it query url like http://help.autodesk.com/view/3DSMAX/2015/ENUq=SEARCHED-QUERY'
 * Because site 'http://help.autodesk.com/view/3DSMAX/2015/ENU' has not query url
 *
 * 1) Save query from url 'q=.*' as cookie
 * 2) Then redirect to valid url
 * 3) Get value of cookie and set into input field
 * 4) Click on search
 * 
 */
var preformSearch = (function()
{
	var cookie_key	= 'search_query';
	
	/** Set cookie
	 */
	//var setCookie = function(value='query-empty')
	var setCookie = function(value='')
	{
		var myDate = new Date();
		myDate.setSeconds(myDate.getSeconds() + 5);
		var expires	= "expires=" + ( value!=='' ?  myDate : "Thu, 01 Jan 1970 00:00:01 GMT" );
		
		document.cookie = cookie_key +"=" + value + ";" + expires + '; path=/;';
	}; 

	/** Set cookie
	 */
	var getCookie = function()
	{
		var match_cookie	= new RegExp( cookie_key + '=([^;]+)', 'gi').exec(document.cookie);

		setCookie();

		return match_cookie ? match_cookie.pop() : null;
	}; 
	/** Set cookie and redirect
	 */
	var setCookieAndRedirect = function(cookie_value)
	{
		setCookie(cookie_value);

		window.location.href = 'http://help.autodesk.com/view/3DSMAX/2015/ENU/';
	}; 
	/** Get cookie and search
	 */
	var getCookieAndSearch = function(search_query)
	{
		setTimeout( function()
		{
			$('#ui-sidebar li[title="Search"]').click();

			setTimeout( function()
			{
				$('.ui-search-panel input[name="q"]').val( search_query );	// set value to input
				$('#aria-tab-search .ui-dropdown-list li[data-index="6"]').click();	// select 'Scripting & Customization' in dropdown
				$('.ui-search-panel button[type="submit"]').click();	// slick on search
			}, 200);
			
		}, 200);
	}; 
	
	$( document ).ready(function()
	{
		var match_query	= /q=(.*)/gi.exec(window.location.href);

		var search_query = getCookie();

		if ( match_query )
			setCookieAndRedirect(match_query.pop());
			
		else if( search_query && search_query!=='query-empty' )
			getCookieAndSearch(search_query);
	});
	
})(); 
