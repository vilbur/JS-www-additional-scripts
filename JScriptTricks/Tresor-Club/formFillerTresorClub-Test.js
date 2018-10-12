

var data = {
  //'title': ['Bohemian Market: Bohemian Burlesque Festival','test title'],
  'title': 'Bohemian Market: Bohemian Burlesque Festival',

  'description': [
	/* CZECH */
		'test-popis',
	/* ENG */
		 'Come to the Bohemian Market Day to shop for retro dresses, vintage goodies, burlesque and alternative fashion gear and accessories and much more. You will also have a chance to sample the performances, meet our headliners, see the fashion show and retro movies, laugh at feminist stand up and much more. It will be an action packed day to prepare you for the evening gala show.<p>ENTRY:  250 Kč</p>']

};

var urls = [
  'eventbrite.com/create',
  //'.*w3schools.com/html/html_forms.asp',

];

var selectors = {
	//'title': [
	//	'group-details-name'  // www.eventbrite.com 
	//],

	'description': [
		'{#id_group-details-description_ifr}#tinymce' // www.eventbrite.com
	]

};

var clicks = [
	'.js-location-cant-find','.l-mar-top-1.btn', // www.eventbrite.com - click on address and 'free ticket'
];

var Openlinks = (function() {

	/*
		CONSTRUCT
	*/
	function Openlinks(urls, selectors, data, clicks = [])
	{
		var langs = ['cz', 'en'];

		/** lang
		 */
		var lang = (function()
		{
			return window.location.hostname.match(/cz/) ? 'cz' : 'en';
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
			for(let i=0; i<clicks.length;i++)
				$(clicks[i])[0].click();
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
			/** Get paragraphs for appending to rich text editor
			 * E.G. EVENT DESCRIPTION here: https://www.eventbrite.com/create
			 */
			var getParagraphs = function()
			{
				//if( typeof value == 'string' )
				//	value = [value];
				//return '<p>'+value.join('</p><p>')+'</p>';
				return '<p>TEST</p>';
			}; 

			//if ( element.is( "input" ) )
			//	element.val(value);
			//	
			//else if ( element.is( "body" ) )
				element.append( '<p>Test</p>');
				//element.append( getParagraphs() );
			//
			//else if ( element.is( "p" ) )
			//	element.text(value);
		};

	}

	return Openlinks;
})();

setTimeout( function(){
(new Openlinks( urls, selectors, data, clicks )).test();
}, 1000);

/*------------------------------------------------------------------------------
	TEST
	Run test on: https://www.w3schools.com/html/html_forms.asp
--------------------------------------------------------------------------------*/
var data_test = {
  'title' : 'test title'
};

var urls_test = [
  '.*example.com',
  '.*w3schools.com/html/html_forms.asp',

];

var selectors_test = {
  'title':  ['firstname', 'lastname']
};

//(new Openlinks( urls_test, selectors_test, data_test )).test();
