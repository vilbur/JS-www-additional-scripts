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



$( document ).ready(function()
{
	alert( window.location.href ); 
});