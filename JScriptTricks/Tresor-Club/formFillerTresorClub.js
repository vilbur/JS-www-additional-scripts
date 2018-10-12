/**  
 *	(TRESOR-CLUB-DATA|.*)
 */
var urls = [
  'informuji.cz/akce/pridat-akci',
  'eventbrite.com/create',
  'pragueeventscalendar.cz',
  'local-life.com',
  'poslouchej.net',
  'eventaro.com',
  'rave.cz',
  'residentadvisor.net/submit-event-finish',
];

var selectors = {
	'title': [
		'jmeno_akce',         // informuji.cz
		'group-details-name', // www.eventbrite.com
		'#f_Ename',           // pragueeventscalendar.cz
		'event_name',         // local-life.com
		'akce_nazev',         // poslouchej.net
		'action_name',        // eventaro.com
        'party',              // rave.cz
		'#eventtitle',       // residentadvisor.net
	],

	'description':[
			'{#id_group-details-description_ifr}#tinymce',	// www.eventbrite.com
			'#f_Edescription',	                  // pragueeventscalendar.cz
			'akce_popisek',	                      // poslouchej.net
			'event_text',                         // local-life.com
			'#Content',                           // residentadvisor.net
		],
		'description-rich':[
			'{#text_akce_ifr}#tinymce',          // informuji.cz
			'{#createDescription_ifr}#tinymce',  // www.eventbrite.com
		],
		'price':[
			'price_akce',   // informuji.cz
			'#Cost',        // residentadvisor.net
			'akce_vstup',   // poslouchej.net
		],
		'lineup':[
			'akce_ucinkujici',   // poslouchej.net
		],
		'facebook': [
			'#www_akce',         // informuji.cz
			'group-organizer-organizers-0-facebook',  // www.eventbrite.com
			'event_link',        // local-life.com
			'akce_www',          // poslouchej.net
		]
};

var clicks = [
	'#fieldset_text_akce+ span a.en_flag',                                 // informuji.cz - Anglický popis akce
	'.js-location-cant-find','.l-mar-top-1.btn','#edit_organizer_profile', // www.eventbrite.com - click on address and 'free ticket'
	'button[event-type="public"]', // eventaro.com
];

var formFillerTresorClub = (function()
{

	/*
		CONSTRUCT
	*/
	function formFillerTresorClub(urls, selectors, data, clicks = [])
	{
		var langs = ['cz', 'en'];

		/** lang
		 */
		var lang = (function()
		{
			return window.location.hostname.match(/cz|eventaro.com|poslouchej.net/) ? 'cz' : 'en';
		})();

		this.test = function()
		{
			//alert( isUrlMatching()  );
			if( isUrlMatching() )
			{
				clickOnLinks(clicks);
				loopIntputs();
			}
		};
		/** Click on links before filling of form
		 *  it allows perform some action of form before filling
		 */
		var clickOnLinks = function(clicks)
		{
			for(let i=0; i<clicks.length;i++){
				element = $(clicks[i]);
				if( typeof element[0] != 'undefined' )
					element[0].click();
			}
		};
		/** Is url matching
		 */
		var isUrlMatching = function()
		{
			return window.location.href.match(new RegExp( '.*(' + urls.join('|').replace(/\/\?/,'\\/') +')' ));
		};
		/** Loop intputs
		 */
		var loopIntputs = function()
		{
			for(var selector in selectors)
				if (selectors.hasOwnProperty(selector))
					loopSelectors( selectors[selector], getValue(data[selector])  );
		};
		/** Loop selectors
		 */
		var loopSelectors = function(selectors, value)
		{
			for(let s=0; s<selectors.length;s++)
				setValue( getElement(selectors[s]), value );
		};
		/** Get element
		 * @param	string	selector
		 *
		 * @example selector='first_name'	// return element '[name="first_name"]';
		 * @example selector='#first_name'	// return element '#first_name';
		 * @example selector='{#iframe_id}#first_name'	// return element in iframe, iframe is in curly brackets
		 *
	* @return	object
		 */
		var getElement = function(selector)
		{
			var iframe_match = /\{([^\}]+)\}*(.*)/.exec(selector);

			/** Is in iframe
			 */
			//var is_in_iframe = typeof iframe_match[1] !== 'undefined' ;

			return ! iframe_match ? $(getInputSelector(selector)) : $(iframe_match[1]).contents().find(getInputSelector(iframe_match[2]));

		};
		/** Get element selector
		 *	@param	string	attribute
		 *
		 * 	@return	string If attribute does not starts with '.' or '#' then return '[name="first_name"]'
		 */
		var getInputSelector = function(attribute)
		{
			return attribute.match(/^(\.|#)/gi) ? attribute : '[name="'+attribute+'"]';
		};
		/** Get value by lang
		 * @param	['cz', 'en']|'foo_string'	value	array of values by lang, or string without translation
		 *
		 * @return	string	value by lang
		 */
		var getValue = function(value)
		{
			/** Get value by lang from array
			 *
			 * @return self
			 */
			var getValueByLang = function()
			{
				return value[ langs.indexOf(lang) ];
			};

			return typeof value == 'string' ? value : getValueByLang();
		};
		/** Set value
		 */
		var setValue = function(element, value)
		{
			///** Get paragraphs for appending to rich text editor
			// * E.G. EVENT DESCRIPTION here: https://www.eventbrite.com/create
			// */
			//var getParagraphs = function()
			//{
			//	if( typeof value == 'string' )
			//		value = [value];
			//	return '<p>'+value.join('</p><p>')+'</p>';
			//};

			if ( element.is( "input" ) || element.is( "textarea" ) )
				element.val(value);

			else if ( element.is( "body" ) )
				element.empty().append( value );

			else if ( element.is( "p" ) )
				element.text(value);

		};
	}
	return formFillerTresorClub;
})();


setTimeout( function()
{
	var data = window.tresor_data;
	
	if( typeof data !== 'undefined'  )
		(new formFillerTresorClub( urls, selectors, data, clicks )).test();
	else
		alert( 'formFillerTresorClub\n\nwindow.tresor_data are missing' );
	
}, 1000);
