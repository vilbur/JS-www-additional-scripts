/*==================================================================================================================================*/
/*
/* MENU:
/*    Add current script name to window title                                                                                       
/*
/* ------------------------------------------------------------------------
/*
/*
/*==================================================================================================================================*/

/** https://gist.github.com/chrisjhoughton/7890303
 *
 */
var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

/* ================================================================================================================================== */
/*	MENU:                                                                                                                     
/* ================================================================================================================================== */
/** setMenuItemsContentToAttribute
*/
function setMenuItemsContentToAttribute(){
	setTimeout( function(){ 
		$('#docs-menubar > .menu-button').each(function(){
			$(this).attr('js-tricks-label', $(this).html());
		});
	}, 500);
}






/* ================================================================================================================================== */
/*	INIT                                                                                                                            */
/* ================================================================================================================================== */
	
$(document).ready(function() {
	/* Wait for custom menu items exists */
	waitForEl('#docs-help-menu + .menu-button[role="button"]', function() {
		setMenuItemsContentToAttribute();
	});
	
});



