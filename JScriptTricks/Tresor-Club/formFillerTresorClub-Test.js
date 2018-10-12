/*------------------------------------------------------------------------------
	TEST
	Run test on: https://www.w3schools.com/html/html_forms.asp
--------------------------------------------------------------------------------*/
window.tresor_data = {
  'title' : 'test title'
};

var urls_test = [
  '.*example.com',
  '.*w3schools.com/html/html_forms.asp',

];

var selectors_test = {
  'title':  ['firstname', 'lastname']
};


setTimeout( function()
{
	var data = window.tresor_data;
	
	if( typeof data !== 'undefined'  )
		(new formFillerTresorClub( urls, selectors, data, clicks )).test();
	else
		alert( 'formFillerTresorClub\n\nwindow.tresor_data are missing' );
	
}, 1000);
