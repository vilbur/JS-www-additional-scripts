/**  
 *	
 */
if( window.location.href.match(/docs.google.com\/spreadsheets/gi) && ! window.location.href.match(/appMode/gi)     )
{
	window.open('https://docs.google.com/spreadsheets/d/1D-vo5n2uAL794mL20o19aXVgAkxni3IbRpHDDmscSZI/edit#gid=570706827&appMode', 'popup_window', ['height='+screen.height,'width='+screen.width,'name=AppMode',].join(','))
	
	 window.top.close();
}
