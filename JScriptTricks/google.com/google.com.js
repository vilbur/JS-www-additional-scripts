/* HIDE 'People also ask' element*/
$('span:contains("People also ask")').closest('._NId').hide()

  
/* Click on link if search was misspellinged */
$('a.spell, span:contains("Did you mean:") + a, span:contains("Showing results for") + a')[0].click();

  
/*	Auto Google search first result if search on www.w3schools.com
 *		E.G: https://www.google.cz/search?q=site:https://www.w3schools.com+css+background+size&gws_rd=cr&dcr=0&ei=YW10WsaYJceRkwX4hJGIBw
*/
if(window.location.href.match(/search\?q=site:https:\/\/www.w3schools.com\+css/g))
	$('._NId:first-of-type a')[0].click();

