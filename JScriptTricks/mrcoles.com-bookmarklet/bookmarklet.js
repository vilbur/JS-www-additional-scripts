/* Prefill form for bookmarklets creations on http://mrcoles.com/bookmarklet/
 *
 */

var open_links_script = "var links = ["+
						"\n	'link',"+
						"\n	'link',"+
						"\n];"+
						"\nwindow.location.replace(links[0]);"+
						"\nfor(var l=1; l<links.length;l++) {"+
						"\n	if(links[l])window.open(links[l]);"+
						"\n}";
							
$('#alpha .header').append('<h3 style="color:green">Site is tweaked by JScript Tricks Extension - vilbur`s script</h3>');

/* Hide unnecessary elements */
$('#beta, #disqus_thread').hide();
$('#bk-results').nextAll().hide()
$('#alpha').css('width','100%');
/* fill form */
$('#bk-code').css('width','100%')
			 .val(open_links_script)
			 .focusout(function() {
				$('#bk-form button[type="submit"]').click();
			});
