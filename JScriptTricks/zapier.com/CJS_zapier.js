/*
 * CHANGE PAGE TITLE
 * 
 * Search & Replace in window title On matched URL 
 *

 */

/*
	urls = [
		[/.*ifUrlMatchThis/gi,  [/^(searchThisInTitle)$/gi, 'And Replace with this|$1']],
		[/.*orIfMAtchThis/gi,  'setThisTitle'],

	]
*/
var urls = [
//	[/.*(?:21407858).*/gi, [/^(.*)$/gi, 'Calendar|$1']],
	[/.*history.*/gi, [/^(.*)$/gi, '??$1']],
	[/.*dashboard.*/gi, [/^(.*)$/gi, '??$1']],
	[/.*editor\/\d+/gi, [/^(.*)$/gi,'??$1']],
	[/.*/gi, [/(.*bak.*)/gi,'!BAK $1']],

	
	
];
/*
	@var array source_elarray array of jQuery selctor of possible page title source, page title is used if not defined
*/
var source_elements = [
	'.inline-editor__content--text',
	'.zap-list-header__title span',
	'.task-list a:first-child .task-description'
];


/** ReplaceTitles
*/
function ReplaceTitles(urls, source=null){
	var page_title	= source!==null && $(source).html() ? $(source).html() : document.title;

	for(var r=0; r<urls.length;r++) {
			var search = urls[r][0];
			if (window.location.href.match(search)) {
				page_title = typeof urls[r][1]=='object' ? page_title.replace(urls[r][1][0], urls[r][1][1]) : urls[r][1];
			}
	}

	document.title = page_title
	                    //.replace(/\s+/gi,'')
	                    .replace(/&gt;/gi,'>'); // REPLACE escaped '&gt;' TO '>'
    console.log('Chrome Extension EJS - Page title for www.zapier changed');

}
///* RUN REPLACE FUNCTION */
//	// ReplaceTitles(urls);

var url_last = null;
setInterval(function() {
	var url = window.location.href;
	
	if(url!==url_last){
	//	setTimeout( function(){ 
			ReplaceTitles(urls,source_elements.join(',') );
	//   }, 1000)
		url_last = url;
	}

}, 1000); 


