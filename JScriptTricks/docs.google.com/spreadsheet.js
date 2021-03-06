/**
	Scripts for google spreadsheets
	
	@method	self	replaceTabTitle()	Rename tab by current name of document and current sheet
	@example	E.G.: 'Name of document - Google Sheets' >>> 'Name of document | Name of current sheet'
	
*/

Spreadsheeter = (function()
{
	function Spreadsheeter()
	{
		/** Replace tab title 
		 *
		 * @return self
		 */
		this.replaceTabTitle = function()
		{
			/** Replace tab title
			 */
			var replaceTabTitle = function()
			{
				  var document_name	= $('.docs-title-input').val();
				  var sheet_name	= $('.docs-sheet-active-tab .docs-sheet-tab-name').text();
				  
				  document.title = document_name + ' - ' + sheet_name + ' | Spreadsheet';
				  
			};
			/** When current sheet is changed
			 */
			var bindOnSheetChangedEvent = (function()
			{
				$('.docs-sheet-tab-name').click(function(){
					replaceTabTitle();
				});
			})();
			
			replaceTabTitle(); // execute first time

			return this;
		}; 
		
	}
	return Spreadsheeter;
})();


/**  
 *	
 */
function initSpreadSheeter()
{
	(new Spreadsheeter())
		.replaceTabTitle();
}

/* ==================================================================================================================================	*/
/*    INIT WHOLE SCRIPT		*/
/* ================================================================================================================================== */
/** Wait until certain element exists
 * https://gist.github.com/chrisjhoughton/7890303
 */
var waitThenElelemntExists = function(selector, callback) {
  if (jQuery(selector).length) {
		callback();
  } else {
    setTimeout(function() {
		waitThenElelemntExists(selector, callback);
    }, 100);
  }
};


$(document).ready(function() {
	
	/** Wait until certain element exists
	 * https://gist.github.com/chrisjhoughton/7890303
	 */
	var waitThenElelemntExists = function(selector, callback) {
	  if (jQuery(selector).length) 
			callback();
	  else 
		setTimeout(function() {
			waitThenElelemntExists(selector, callback);
		}, 100);

	};

	/* Wait for custom menu items exists */
	waitThenElelemntExists('.docs-sheet-active-tab .docs-sheet-tab-name', function() {
		initSpreadSheeter(); 		
	});
});