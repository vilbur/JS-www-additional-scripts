//console.clear()
/*
	GoogleDrive link
	https://drivenotepad.github.io/app/?state={%22action%22:%22open%22,%22ids%22:[%220B_tdJXayFOj2VkRxSng4SXRKNTA%22]}
*/

/** how offen is url change detected
 */
window.url_check_refresh_interval = 1000;

/** DEFINE WHICH FUNCTION IS EXECUTED WHEN URL MATCH KEY
 */
window.ejs_function_on_url = {
	//'CsvFieldMappingsPage': 'getImportFields',
	//'CsvFieldMappingsPage': 'setImportFields',
	'newissue' : 'prefilllNewIssue'
};

/** DEFINE 'SOURCE LABEL':'TARGET COLUMN' on SCV import
 */
window.csv_import_values = {
    "Assignee": "Assignee",
    "Custom field (Epic Color)": "Epic Color",
    "Issue Type": "Issue Type",
    "Issue id": "Issue Id",
    "Summary": "Summary",
};

/*-------------------------------------------------------------------------------------------------------------------------	*/
/* AUTO FILL FORM ON IMPORT CSV PROJECT https://confluence.atlassian.com/adminjiraserver071/importing-data-from-csv-802592885.html	*/
/* CSV SOURCE MUST BE JIRA EXPORTED CSV, !!!NOT EXCEL	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

/**
 */
window.getImportFields = function (){
	$('#fieldMappings tbody tr').each(function(){
		var key = $(this).find('.column-name').html();
		var value =  $(this).find('.field-group input').text();
		if(value && value[1]!=='jim-csv-field-disabled')
			window.csv_import_values[key] = value.pop();
	});
	console.log(JSON.stringify(window.csv_import_values, null, 4));
};
/**
 */
window.setImportFields = function (){
	var answer = confirm ("Do You Want Show only common fields ?");

		var csv_import_values_keys	= Object.keys(csv_import_values);
		
		$('#fieldMappings .column-name').each(function(){
			var label_text = $(this).html();
			
			var tr = $(this).closest('tr');
			if(!answer && csv_import_values_keys.indexOf(label_text) > -1 ) {
				tr.css('background-color', 'lightblue');
			}else if (answer && csv_import_values_keys.indexOf(label_text) < 0)
				tr.hide();
				
			if(csv_import_values_keys.indexOf(label_text) > -1 ) 
				tr.find('input').val(csv_import_values[label_text]);
	});
	console.log(JSON.stringify(csv_import_values));	
};



/*-------------------------------------------------------------------------------------------------------------------------	*/
/* EDIT ISSUE SCREEN	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

/* AUTORESIZE DESCRIPTION TEXTAREA */
		
/* Kanban board On Double clik task >>> open edit task  */	
/* Releases On Double click >>> Edit Release */
//$(document).on('dblclick','.ghx-issue, .js-issue',function(){
//   // alert('test')
//	setTimeout( function(){ 
//		 $('#editIssue, .version-edit-dialog').click();
//	}, 100);
//});
/* close edit issue screen on click out of modal dialog */
//$(document).on('click','.aui-blanket',function(){
//	setTimeout( function(){ 
//		$('.cancel').click();
//	}, 100);
//});
	
//function description_autosize() {
//	//console.log('test')
//	var textarea	= $('textarea#description');
//	textarea.attr('rows', '');
//	//var textareaEl	= document.querySelector('textarea#description');
//	//textarea.css('border', '1px solid red');
//
//	textarea.css('height', '');
//	var height_default	= textarea.outerHeight();	
//	textarea.css('height', 'auto');
//	var height_auto	= textarea.outerHeight();
//	var height_scroll	= document.querySelector('textarea#description').scrollHeight;	
//	
//		if(height_scroll>height_default){
//			textarea.css('height', height_scroll +8+'px')
//				.css('overflow', 'hidden')
//			console.log('----- AUTO HEIGHT');
//		}
//		else{
//			textarea.css('height', height_default +'px');
//			console.log('----- DEFAULT HEIGHT');
//		}
//}

	
//$('document').ready(function(){
//	$(document).on( "focus", 'textarea', description_autosize);
//	$(document).on( "keydown", 'textarea',description_autosize);
//});

/*-------------------------------------------------------------------------------------------------------------------------	*/
/* CREATE ISSUE - PREFILL FORM	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
function createIssuePreFillForm(){
	//setTimeout( function(){ 
		//$('#assign-to-me-trigger')[0].click();
		
	//}, 500);
}
//$(document).keydown(function(e) {
//    if(e.which == 67) createIssuePreFillForm();
//});
//
//$('.aui-button.create-issue').on('click', function(){
//	setTimeout( function(){ 
//		createIssuePreFillForm();
//	}, 500);
//});


function colorizeElement(el){
	$(el).css('border', '1px solid orange')
		.bind('click',function(){
			$(this).css('border', '').unbind( "click" )
			
		});
}


function prefilllNewIssue(){
	
	

	
	$('#create_link.create-issue')[0].click()
	
	//var e = new KeyboardEvent('keydown',{'keyCode':32,'which':32});
	setTimeout( function(){
		$('#create-issue-dialog #assign-to-me-trigger')[0].click()
			
	
	}, 1000);
	
	setTimeout( function(){ 
	
	
		url_current = window.location.href;
		
		var value_pairs = {};
		var form_labels = {};
		
		/*
		 https://vilburwebdesign.atlassian.net/secure/RapidBoard.jspa?rapidView=27&newIssueSummary=New&Labels=Windows&Component=&Epic=&Original=5
		*/
		/* GET PAIRS [Label=Windows, Component=Autohotkey] */
		var form_pairs_url = url_current.split(/newissue/gi).pop().split(/&/gi)
		
		for(var i=0; i<form_pairs_url.length;i++) {
			var value_pair = form_pairs_url[i].split('=');
			value_pairs[value_pair[0].toLowerCase()] = value_pair[1];
		}
		
		var labels_values	= Object.keys(value_pairs).filter(function(val) {if(val) return val;}).join('|')
	
		$('#create-issue-dialog label').each(function(){
			var label_html = $(this).html();
			
			var match_string = (new RegExp("("+labels_values+")", "gi")).exec(label_html);
			if (match_string) {
				var input = $(this).closest('.field-group').find('input, textarea')
				var value_key = match_string.shift().toLowerCase()
				input.val(value_pairs[value_key])
				colorizeElement(input);
			} 
		});
	}, 1500);
	
	
	
	

}


/*-------------------------------------------------------------------------------------------------------------------------	*/
/* PUBLISH DRAFT - PREFILL FORM	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

//$('#publish_draft_workflow').on('click', function(){
//	setTimeout( function(){ 
//		$('#publish-workflow-false').attr('checked', 'checked');
//	}, 500);
//});

/*--------------------------------------------*/
/*    ISSUE DETAIL VIEW                       */
/*--------------------------------------------*/
/** COLLAPSE SECTION
*/
//$(document).on('click','.toggle-title',function(){
//	var section = $(this).closest('.ghx-detail-section');
//	var content = section.find('.mod-content');
//	content.slideToggle(0);
//	///* SET COOKIE FOR INIT */
//	var cname = 'ejs-state-'+section.attr('id');
//	setCookie( cname, content.is( ":visible" ));
//});
///** COLLAPSE SECTION ON LOAD
//*/
//$('document').ready(function(){
//	setTimeout( function(){ 
//		$('.toggle-title').each(function(){
//			var section = $(this).closest('.ghx-detail-section');
//			var state = getCookie('ejs-state-'+section.attr('id') );
//			if(state==='false')
//				section.find('.mod-content').slideToggle(0);
//		});
//	}, 1500);
//});

/*--------------------------------------------*/
/*    TEMPO TRACKER - AUTO START ON CLICK     */
/*--------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------------------------	*/
/* COOKIES	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/

//function setCookie(cname, cvalue, exdays=365) {
//    var d = new Date();
//    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//    var expires = "expires="+d.toUTCString();
//    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//}
//
//function getCookie(cname) {
//    var name = cname + "=";
//    var ca = document.cookie.split(';');
//    for(var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) === ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) === 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}
//
//function checkCookie(cname) {
//    var cookie = getCookie(cname);
//	return cookie !== "";
//}


/*-------------------------------------------------------------------------------------------------------------------------	*/
/* TRIGGERS ON URL	*/
/*-------------------------------------------------------------------------------------------------------------------------	*/
/**
 */
function triggerFunctionOnUrl(){

	var match_url_functions	= window.ejs_function_on_url;
	var match_keys	= Object.keys(match_url_functions);
	
	var match_url_current = (new RegExp( '.*('+ match_keys.join('|')+').*'  , "gi")).exec(url_current);
	console.log(match_url_current);
	if (match_url_current) 
		window[match_url_functions[match_url_current.pop().toLowerCase()]]();
	
}

/** CHECK URL CHANGE
*/
var url_last = null;
var url_current = null;
setInterval(function() {
	url_current = window.location.href;
	
	if(url_current!==url_last){
		triggerFunctionOnUrl();
		url_last = url_current;
	}
}, window.url_check_refresh_interval); 




