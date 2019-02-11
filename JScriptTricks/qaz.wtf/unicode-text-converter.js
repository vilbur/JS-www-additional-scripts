
/** Highlight and comment important fonts on page
 *	http://qaz.wtf/u/convert.cgi?text=GOOGLE
 */
function addComments( font_name, comment )
{
	$('tr span:contains('+font_name+')').first()
	
	  .closest('tr')
	  .find('td:last-of-type')
	  .append('<span class="js-tricks" style="color:green;margin-left: 128px">'+comment+'</span>')
	  .find('.js-tricks')
	  //.css('border-bottom', '1px solid green');
}
  
/** Names and comments for fonts
 *	{'font name':'comment'}
 */
var fonts = {
	'Math sans bold':	'Main header of Chrome bookmark',	
	'Regional Indicator':	'Secondary header'
};

/** Wrap font used as header to arrows '◀️  ▶️' 
 *	
 */
$('tr span:contains('+Object.keys(fonts)[0]+')').first().closest('tr').find('td:last-of-type')
	.prepend('◀️').append('▶️');

/**  Loop all fotns
 *	
 */ 
for(var font_name in fonts)
  if (fonts.hasOwnProperty(font_name))
	  addComments(font_name, fonts[font_name]);

