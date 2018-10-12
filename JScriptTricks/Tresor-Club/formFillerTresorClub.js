
var data = {
  //'title': ['Bohemian Market: Bohemian Burlesque Festival','test title'],
  'title': 'Bohemian Market: Bohemian Burlesque Festival',
  'description': [
	/* CZECH */
		'Jedinečná denní akce, kde si budete moci nakoupit a prohlédnout retro, vintage a alternativní módu a doplňky, které budou představeny i na módních přehlídkách.\n\nK dispozici budou šperky Jewelry by Adrianet a kamínky The Glitters, Kloboučky a fascinátory Lucie T. a Hatventure, ozdoby do vlasů, retro šaty, prádlo, burlesque doplňky jako jsou pasties, boa a župany od You Married a Witch ze Španělska, podepsané knihy od legendarní Jo Weldon a mnoho dalšího.\nDokonce pár jedinečných boa přiveze samotná Sina King, Rose de Noir a pasties od Magie Noire.\n\nTaké máme pro vás celý blok burlesque vystoupení včetně akrobacie od Tanya Brno, komedii na stojáka, diskusi s našimi headlinery a mnoho dalšího programu jako třeba přehlídka prádla a designových oděvů Manon a JANE BOND special.\n',
	/* ENG */
		'Come to the Bohemian Market Day to shop for retro dresses, vintage goodies, burlesque and alternative fashion gear and accessories and much more. You will also have a chance to sample the performances, meet our headliners, see the fashion show and retro movies, laugh at feminist stand up and much more. It will be an action packed day to prepare you for the evening gala show.'
		//,'<p>ENTRY:  250 CZK</p>'
	],
	'description-rich': '<p>Jedinečná denní akce, kde si budete moci nakoupit a prohlédnout retro, vintage a alternativní módu a doplňky, které budou představeny i na módních přehlídkách.<br />K dispozici budou šperky <a href="https://www.facebook.com/byAdrianet/" target="_blank">Jewelry by Adrianet</a> a kamínky <a href="https://www.facebook.com/theglitterscz/" target="_blank">The Glitters</a>, <a href="https://www.facebook.com/fascinatoryLucieT/" target="_blank">Kloboučky a fascinátory Lucie T.</a> a <a href="https://www.facebook.com/Hatventure/" target="_blank">Hatventure</a>, ozdoby do vlasů, retro šaty, prádlo, burlesque doplňky jako jsou pasties, boa a župany od <a href="https://www.facebook.com/youmarriedawitch/" target="_blank">You Married a Witch</a> ze Španělska, podepsané knihy od legendarní <a href="https://www.facebook.com/joweldon" target="_blank">Jo Weldon</a> a mnoho dalšího.<br />Dokonce pár jedinečných boa přiveze samotná <a href="https://www.facebook.com/sinakingofficial/" target="_blank">Sina King</a>, <a href="https://www.facebook.com/rosedenoirburlesque/" target="_blank">Rose de Noir</a> a pasties od <a href="https://www.facebook.com/people/Magie-Noire/100011843838562" target="_blank">Magie Noire</a>.<br /><br />Také máme pro vás celý blok burlesque vystoupení včetně akrobacie od Tanya Brno, komedii na stojáka, diskusi s našimi headlinery a mnoho dalšího programu jako třeba přehlídka prádla a designových oděvů <a href="https://www.facebook.com/ManonObsessiveShop/" target="_blank">Manon</a> a <a href="https://www.facebook.com/JANEBONDspecial/" target="_blank">JANE BOND special</a>.</p>',

	'price':[ '250 Kč', '250 CZK'],
	
	'lineup':'The Beautifuls',

	'facebook': 'https://www.facebook.com/events/848075865392136',

};

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

var Openlinks = (function()
{

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
	return Openlinks;
})();

setTimeout( function(){
(new Openlinks( urls, selectors, data, clicks )).test();
}, 1000);
