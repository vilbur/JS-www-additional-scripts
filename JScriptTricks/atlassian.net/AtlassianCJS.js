console.clear();
/*-------------------------------------------------------------------------------------*/
/*  script for chrome extension 'Custom JavaScript for websites'                       */
/*  https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija                                                                                   */
/*                                                                                     */
/*                                                                                     */
/*  Troubleshooting                                                                    */
/*    Issue detail view is not loading: Do not load external JQuery                    */
/*                                                                                     */
/*                                                                                     */
/*-------------------------------------------------------------------------------------*/
/** how offen is url change detected
 */
window.url_check_refresh_interval = 1000;

window.ejs_function_on_url = {
	//'CsvFieldMappingsPage': 'getImportFields',
	'CsvFieldMappingsPage': 'setImportFields',
	'newissue' : 'createNewIssue'
};


/*-------------------------------------------------------------------------------------------------------------------------	*/
/*  JIRA VilPro Issue detail view - Part	*/
/* 	*/
/* Scripts for Stylish style: https://userstyles.org/styles/143342/jira-vilpro-issue-detail-view-part	*/
/* 	*/
/* These scripts must be loaded into JIRA for additional features of style extension	*/
/* 	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
/* Mark for styles that scripts for this section are installed */
(function issueDetailCollapsable(){
	$('#page').addClass('stylish-installed');
	/* COLLAPSE ALL DETAILS */
	$(document).on('click','#ghx-detail-issue #details-module_heading',function(e){
		if (e.target !== this)
			return;
		$('#js-detail-nav-content').toggleClass('stylish-details');
	});
	/* COLLAPSE DETAILS */
	$(document).on('click','#ghx-detail-issue .mod-header h2',function(e){
		$(this).closest('.ghx-detail-section').toggleClass('stylish-colapsed');
	});
	/* ENTER FILTER MODE */
	$(document).on('click','a[data-tooltip="Tempo"]',function(e){
		$('#page').toggleClass('stylish-tempo');
		$('#js-detail-nav-content').addClass('stylish-details');
	});
})();
/*-------------------------------------------------------------------------------------------------------------------------	*/
/* EDIT ISSUE SCREEN	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

/* AUTORESIZE DESCRIPTION TEXTAREA */
		
/* Kanban board On Double clik task >>> open edit task  */	
/* Releases On Double click >>> Edit Release */
var EventsIssueScreen = (function EventsIssueScreen() {

	/* Close edit issue screen on click out of modal dialog */
	$(document).on('dblclick','.aui-blanket',function(){
		setTimeout( function(){
			
			var btn_submit	= $('#edit-issue-submit');
			
			if (btn_submit.length)
				btn_submit[0].click();
			else
				$('.jira-dialog .cancel')[0].click();
			
		}, 100);
	});


	$(document).on('dblclick','.js-issue',function(){
		//alert('test')
		//setTimeout( function(){ 
			  //pressKey($('#editIssue'), 'e',500)
			 $('#editIssue')[0].click();		 
			 //window.createNewIssue();
		//}, 100);
	});
   return EventsIssueScreen;
})();   



/*-------------------------------------------------------------------------------------------------------------------------	*/
/* AUTORESIZE DESCRIPTION TEXTAREA	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

/** Autoresize textarea height as user is typing
 */
function texarea_autosize() {
	//console.log('test')
	var textarea	= $('textarea');
	textarea.attr('rows', '');
	//var textareaEl	= document.querySelector('textarea');
	//textarea.css('border', '1px solid red');

	textarea.css('height', '');
	var height_default	= textarea.outerHeight();	
	textarea.css('height', 'auto');
	var height_auto	= textarea.outerHeight();
	var height_scroll	= document.querySelector('textarea').scrollHeight;	
	
		if(height_scroll>height_default){
			textarea.css('height', height_scroll +8+'px')
				.css('overflow', 'hidden');
			console.log('----- AUTO HEIGHT');
		}
		else{
			textarea.css('height', height_default +'px');
			console.log('----- DEFAULT HEIGHT');
		}
}
/* EVENT ON FOCUS TEXTAREA */
$('document').ready(function(){
	$(document).on( "focus",	'textarea', texarea_autosize);
	$(document).on( "keydown",	'textarea',texarea_autosize);
});



/*-------------------------------------------------------------------------------------------------------------------------	*/
/* CREATE ISSUE - PREFILL FORM	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
window.createNewIssue = function(){
	$('#create_link.create-issue')[0].click();
	prefillNewIssueByUrl();

};
/** Fill create issue form based on link
 * IMPORTANT: arguments string in URL must be prefixed with 'newIssue'
 * 
 * [JIRA BASE URL]/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&[newIssue]&[FIELD KEY]=[FIELD+ESCAPED+VALUE]&[FIELD KEY SECOND]=[VALUE+SECOND]
 * 
 * https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssue&Summary=Test%20Create%20Issue&Component=Autohotkey
 * 
	https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssue&Summary=Test%20Create%20Issue&Component=Autohotkey&Labels=Windows
	https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssue&Summary=Test%20Create%20Issue&Component=Autohotkey&Labels=Windows&Epic=EpicTest
	https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssue&Summary=Test%20Create%20Issue&Component=Autohotkey&Labels=Windows&Epic=EpicTest&Original=5&description=Test description
	https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssue&Summary=Test%20Create%20Issue&Component=Autohotkey&Labels=Windows&Epic=EpicTest&Original=5&description=Test description		https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&view=planning.nodetail&newIssueSummary=Test%20Create%20Issue&Component=Autohotkey&Labels=Windows&Epic=EpicTest&Original=5&description=Test description&Priority=High		

*/
prefillNewIssueByUrl = function(){
	clickOnAssignToMe();
	//console.clear();

	setTimeout( function(){ 
		url_current = window.location.href;
		var value_pairs	= {};
		var timeout	= 0;

		/* URL SPLIT TO KEY VALUR PAIRS [Label=Windows, Component=Autohotkey] */
		var form_pairs_url = url_current.split(/newissue&/gi).pop().split(/&/gi);
		
		for(var i=0; i<form_pairs_url.length;i++) {
			var value_pair = form_pairs_url[i].split('=');
			value_pairs[value_pair[0].toLowerCase()] = value_pair[1];
		}
		
		var labels_values	= Object.keys(value_pairs).filter(function(val) {if(val) return val;}).join('|');

		$('#create-issue-dialog label, #create-subtask-dialog label').each(function(){
			var label_html = $(this).html();
			
			var match_string = (new RegExp("("+labels_values+")", "gi")).exec(label_html);
			console.log( '-----------------------------\n match_string='+JSON.stringify( match_string, null, 4));

			if (match_string) {
				var input = $(this).closest('.field-group').find('input:not([type="hidden"]), textarea');
				var value_key = match_string.shift().toLowerCase();
				var value = unEscapeHtmlString(value_pairs[value_key]);

				var match_label= (new RegExp(value_key, "gi")).exec(label_html);
				
				setTimeout( function(){ 
					console.log(label_html);
					console.log(value_key);
					var idv = '#'+input.attr('id');
					/* IF TEXTAREA LIKE 'COMPONENTS' OR 'LABELS' */
					if (idv.match(/.*-textarea/gi))
						fillTextarea(idv, value);
					
					/* IF INPUT LIKE CUSOM FIELD 'EPIC' */
					else if($(idv).hasClass('aui-ss-field'))
						fillTextareaEpic(idv, value, timeout);
						
					/* OTHER NORMAL INPUTS */
					else 
						fillTextareaLabels(idv, value, timeout);

				}, timeout);			
						
				timeout += 300;
				/* Set focus summeary at least */

				setTimeout( function(){
					$('#summary').focus();
					$('#summary')[0].click();
				}, timeout+500);

			} 
		});

	}, 1000 );

};



 /* Replace escaped HTML characters '%20' >>> ' '
 */
function unEscapeHtmlString(string){
	return string.replace(/(%20|\+)/gi, ' ');
}
/** FILL TEXTAREA LIKE 'COMPONENTS' OR 'LABELS'
*/
function fillTextarea(idv, value){
	if ($(idv).closest('.form-group').find('select options').length > 0 )
		fillTextareaDropdownComponents(idv, value);
	else
		fillTextareaLabels(idv, value );
}

/**IF INPUT LIKE CUSOM FIELD 'EPIC'
 * 
 */
function fillTextareaEpic(id, value, timeout=0) {
		$(id).val(value);
		//$(id).focus()
		$(id)[0].click();
		 
		setTimeout( function(){ 
			var epic_html = $('#suggestions .aui-list-item.aui-list-item-li-epictest:first-child span').html().replace(/[\(\)]/gi, '');		
			$(id).val(epic_html);
			
			setTimeout( function(){ 
				$(id).closest('.field-group').find('.error').hide();
			}, 150);			
		}, 200);
			$(id)[0].click();
		setTimeout( function(){ 
			colorizeInput($(id));
		}, 300);
}


/**  IF TEXTAREA LIKE 'COMPONENTS'
 *
 */
function  fillTextareaDropdownComponents(text_area_id, value) {
	
	console.log( '-----------------------------\n value='+value);

	var li_item = '<li class="item-row" role="option" aria-describedby="label-0" id="item-row-0">'+
			'<button type="button" tabindex="-1" class="value-item">'+
				'<span><span class="value-text">'+value+'</span></span>'+
			'</button>'+
			'<em class="item-delete" aria-label=" " original-title=""></em>'+
		'</li>';
		
	var option_item = '<option value="'+value+'" title="'+value+'" selected="selected">'+value+'</option>';
	
	/* Add Items To textarea */
		$(text_area_id).closest('.field-group').find('.representation .items').append(li_item);
		$(text_area_id).closest('.field-group').find('option:contains('+value+')').attr('selected', 'selected');			

	$(text_area_id).focus();			
	pressKey($(text_area_id), 'tab',  300 );
	colorizeInput($(text_area_id));
		
}
/* Rebind delete item event */
$(document).off( "click", ".item-delete" ).on( 'click', '.item-delete', function(){
	$(this).closest('.item-row').remove();
});
/** Simulate any key press
 *
 */
function pressKey(element, key, timeout = 0){
	
	var key_codes = {
		'space':32,
		'enter':13,
		'tab':84,
		'backspace':8,
		'arrow-up':38,
		'e':6,
		'num-plus':107,										
	};
	var keypress_event = $.Event("keypress", {
	  keycode: key_codes[key],
	  which: key_codes[key]
	});

	setTimeout( function(){
			element.trigger(keypress_event);
	}, timeout);

}
/**  IF TEXTAREA LIKE 'LABELS'
 *
 */
function fillTextareaLabels(id, values, timeout=0) {
	$(id).val( values );
	$(id)[0].click();
	colorizeInput($(id));
}


/** click On Assign To Me Link on create issue screen
 *
 */
function clickOnAssignToMe(){
	setTimeout( function(){
		if($('#assign-to-me-trigger').length)
			$('#assign-to-me-trigger')[0].click();
			colorizeInput($('#assignee-field'));

	}, 1000);	
}
/** Border to Screpi edited input
*/
function colorizeInput(el){
	$(el).css('border', '1px solid orange')
		.bind('click',function(){
			$(this).css('border', '').unbind( "click" );	
		});
}




/*-------------------------------------------------------------------------------------------------------------------------	*/
/* ADD SUBTASK	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
/** On button click 'Create Sub-Task'
 */

(function EventsCreateIssue(){
	
	$(document).on( 'click', '.aui-button.js-create-subtask', function(){
		clickOnAssignToMe();
	});
	
	/** ON Keystroke pressed Ctrl+C CREATE SUBTASK 
	 */
	$(document).keydown (function(e) {
	  if(e.which == 67 && e.ctrlKey)
		 createSubtask();
	});
	
	
})();
/**
 */
function createSubtask(){
	$('.aui-button.js-create-subtask')[0].click();
		clickOnAssignToMe();
}

	



/*-------------------------------------------------------------------------------------------------------------------------	*/
/* ALL SCRIPTS EXECUITION	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
/** CHECK URL CHANGE
*/
url_last	= null;
url_current	= null;
setInterval(function() {
	url_current = window.location.href;
	
	if(url_current!==url_last){
		triggerFunctionOnUrl();
		url_last = url_current;
	}
}, window.url_check_refresh_interval); 

/** Execute function on Url
 */
function triggerFunctionOnUrl(){

	var match_url_functions	= window.ejs_function_on_url;
	var match_keys	= Object.keys(match_url_functions);
	
	var match_url_current = (new RegExp( '.*('+ match_keys.join('|')+').*'  , "gi")).exec(url_current);
	console.log( '-----------------------------\nmatch_url_current='+JSON.stringify( match_url_current, null, 4));
	if (match_url_current) 
		window[match_url_functions[match_url_current.pop().toLowerCase()]]();
	
}









/*-------------------------------------------------------------------------------------------------------------------------	*/
/* UNUSED FUNCTIONS	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
//function pressKey(element, key, timeout = 0){
//	
//	var key_codes = {
//		'space':32,
//		'enter':13			
//	}
//	
//	var keypress_event = $.Event("keypress", {
//	  keycode: key_codes[key],
//	  which: key_codes[key]
//	});
//
//	setTimeout( function(){
//			element.trigger(keypress_event);
//	}, timeout);
//
//}
