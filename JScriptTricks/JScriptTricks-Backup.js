#Default#
{"script":"","sfile":"","css":""}
#cacheCss#
#prompt-dialog-no-button:after{
  content:'Double click on dialog for keepboth';
  display:block;
  position:absolute;
  top: 32px;
  left: 12px;
  color:red;
}
#cacheScript#
/*==================================================================================================================================

	STYLISH CUSTOM STYLE REQUIRED FOR SCRIPTS: https://userstyles.org/styles/148176

==================================================================================================================================

	MAINS TOOLBAR:
		Add custom icons
		
 ------------------------------------------------------------------------
	
	DATA LINKING:
		Click on 'Keep Both' when double click on dialog
				
 ------------------------------------------------------------------------
	
	FLOATING DIALOGS:
		set predefined positions, aligned to left or right side of window
		
 ------------------------------------------------------------------------
 
 	SHAPE POSITION:
		check position and colorize inputs with non round values                                                      
	
 ------------------------------------------------------------------------
 
	BREADCUMS:
		Change DEFAULT breadcumns to DETAILED breadcums, DETAILED shows more about actual position in group hierarchy
		DEFAULT:	PAGE > GROUP	> GROUP > GROUP		// default just show that GROUP in hierarchy is selected
		DETAILED:	PAGE > SET	> GROUP > SHAPE		// detailed shows more about selection: PAGE level > SET of groups > GROUP of shapes > SHAPE itself
		
 ------------------------------------------------------------------------
 
	GROUPS:
		Go to page level of selection - KEYBOARD SHORTCUT: Alt+Shift+G
		
 ------------------------------------------------------------------------
 
	SELECTION:
		Lock|Unlock selection toggle - KEYBOARD SHORTCUT: Shift+Space
		
 ------------------------------------------------------------------------
 
	RIGHT SIDEBAR:
		Auto expand page settings
		
 ------------------------------------------------------------------------
 
	ORG CHART:
		ON IMPORT - skip next steps, import directly after set of data
		FLOATING SETTINGS DIALOG: set 'Clean up layout' and close dialog
		
==================================================================================================================================*/


/* ================================================================================================================================== */
/*	DATA LINKING:
/* ================================================================================================================================== */
/** 'Keep or replace field' dialog - Click on 'Keep both' after double click on dialog
 *
 */
$(document).on('dblclick',$('#prompt-dialog-no-button').closest('.dialog-wrapper'),function(){
	/* Submit dialog */
	$('#prompt-dialog-no-button').click();
	var last_prop_sel = '.shape-data-list .content table tr:last-of-type .prop-val-name .edit-text-container';
	setTimeout( function(){ 
		$(last_prop_sel).find('span').click(); // click on input
		var match_string = (new RegExp(/([^\d\s]+)\d*\s+\(.*/gi)).exec($(document).find(last_prop_sel).text()); // E.G: get 'Peoperty' from 'Property (1)'
		$(document).find(last_prop_sel+' input').val( match_string[1].trim() );
	}, 500);

});



/* ================================================================================================================================== */
/*	ORG CHART:
/* ================================================================================================================================== */
/** IMPORT 'ORG CHART' DATA - skips next 
*/
$(document).on('click','lucid-org-chart-upload .highlight.footer-button.next-button', function(e) {
	//var answer = confirm ("Skip next steps ?");
	//if (answer)
		for(var i=1; i<=4;i++) {
			var btn_name = i<4?'next':'finish';
			$('.highlight.footer-button.'+btn_name+'-button').click();		
		}
});


/** SETTINGS DIALOG On middle click in 'Org chart options floating dialog'
*/
$(document).on('mousedown','.dock-panel.double.context-panel', function(e) {
    //if (e.which === 1)
		//setWindowTitle();
    if (e.which === 2){
		/* Cleanup layout */
		$('.dock-panel.double.context-panel .button.btn-block').click();
		/* Uncheck 'Role' checkbox */
		$('.dock-panel.double.context-panel td[title="Role"]+td+td input').click();
		setTimeout( function(){ 
			/* Close dialog */		
			$('.dock-panel.double.context-panel .panel-close').click();
		}, 100);
	}
});


/* ================================================================================================================================== */
/*	FLOATING DIALOGS:
/* ================================================================================================================================== */

/* Dialogs positions
 *
 */
var dialog_align = 'right'; // set dialog position by top left OF top right corner
/* dialog positions [x,y] iIF x==0 then dialog align to side of working area */
var dialog_positons={
	"Shape Options":	[-5, 100],
	"Fill Color":	[-5, 318],
	"Line Options":	[-5, 520],
	"Line Color":	[-5, 585],
	"Text Options":	[-5, 760],
	"Text Color":	[-5, 918],
	"Find & Replace":	[-5, 1090],	
};
/* Set popout dialogs positions
*/
function setDialogPositions(){
	/* Set popout dialog header height */
	//$('span:contains("Line Options")').closest('lucid-callout.pinned').css('border','1px solid red').css('width','96px !important');	// set same width
	//$('span:contains("Fill Color")').closest('lucid-callout.pinned').css('z-index','998');	// adjust z-index for expanded area
	//$('span:contains("Shape Options")').closest('lucid-callout.pinned').css('z-index','999');	// adjust z-index for expanded area

	var dialog_positons_keys = Object.keys(dialog_positons);
	var offset_left	= $('.toolbox-container').width() + 16;
	var offset_right	= window.innerWidth - ( $('.toggle-panel:not(.open)').length ? 52 : 302 );
	
	
	for(p=0; p<dialog_positons_keys.length;p++) {
		var header_text	= dialog_positons_keys[p];
		
		/* GET DIALOG */
		var dialog	= header_text!="Find & Replace" ? $('span:contains("'+header_text+'")').closest('lucid-callout.pinned') : $('lucid-floating-dialog');
		
		var pos_x	= dialog_positons[header_text][0];
		/* GET POSITION X */
		//var pos_x	= pos_x==0 ? (dialog_align!=='right'? offset_left: offset_right - dialog.width()) : pos_x;
		var pos_x_offseted	= dialog_align!=='right'? offset_left + pos_x : offset_right - dialog.width() - pos_x;		
		
		dialog.attr('vil-stylish',header_text.toLowerCase().replace(/&/,' ').replace(/\s+/,'-')) // attribute for styling via stylish 
			.css('left',pos_x_offseted)
			.css('top', dialog_positons[header_text][1]);
	}
	
}
/** shapesSideBarToggle
*/
function shapesSideBarToggle(){
	//alert( "shapesSideBarToggle" );
	//$('lucid-left-panel').css('min-width','0');
	var width_current	= parseInt($('lucid-left-panel').css('width'));
	var width_new	= width_current > 135 ? 135	: 500;
	var display	= width_current > 135 ? 'none'	: 'block';
	
	$('lucid-left-panel').css('min-width',width_new+'px');
	$('#shapes-header-manage-shape-libraries >span:not(.arrow-container)').css('display', display);
	
}

/* Auto pin popout dialog for "Text Color", "Text Options", "Shape Options", "Fill Color", "Line Color" 
 */
if (document.addEventListener) {
	document.addEventListener("click", function(event) {
		var targetElement = event.target || event.srcElement;
		// console.log(targetElement);
		//  $(targetElement).closest('.click-icon').css('border','1px solid red')
		if ($(targetElement).closest('lucid-simple-color-picker, #option-text-options, #option-shape-callout, #option-line-options').length > 0) {
			//console.log(targetElement);
			$(targetElement).closest('.click-icon');
				//.css('border', '1px solid red')
			setTimeout(function() {
				$('.pin-container .pin-icon')[0].click();
				setDialogPositions();
			}, 500);
		}
	});
}

/* ================================================================================================================================== */
/*	SELECTION:
/* ================================================================================================================================== */

/** Lock\Unlock Selection
*/
function selectionLockToggle(){
	$('#option-lock-button lucid-icon').click();
}

/* ================================================================================================================================== */
/*	MAINS TOOLBAR:
/* ================================================================================================================================== */
/**
 *
 */
function addVilButtons(){
	
	var document_state = window.location.href.match(/\/edit\//gi)?'edit':'view';
												
	var links_menu_bar = {
		'view-edit-document':	[window.location.href.replace(/\/(?:edit|view)/gi, '/'+(document_state=='edit'?'view':'edit')),	(document_state=='edit'?'View':'Edit')+' Document',	document_state=='edit'?'https://cdn0.iconfinder.com/data/icons/office-fill/100/document-EYE-128.png':'https://freeiconshop.com/wp-content/uploads/edd/document-edit-solid.png'],
		//////'google-drive-lucid-folder':	['https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2Vl9wdjVKTUhGM2c',	'Open GoogleDrive\\Documents\\Lucidchart',	'https://lh3.googleusercontent.com/OscWUyHwrZ50CaatnNWE45UxaSBKX1gfyKg4W7hJRA0LoGeYg3uPrifEhPA6PEd54C8b0hL6=w128-h128-e365'],
		'lucidchart-search':	['https://www.lucidchart.com/documents#docs?folder_id=search&browser=list&sort=name-desc&document_search=',	'Lucidchart Search Current Document',	'https://lh3.googleusercontent.com/OscWUyHwrZ50CaatnNWE45UxaSBKX1gfyKg4W7hJRA0LoGeYg3uPrifEhPA6PEd54C8b0hL6=w128-h128-e365'],												
		'google-drive-documents':	['https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2MGpETF9zdmVuY0E',	'Open GoogleDrive\\Documents Folder',	'https://cdn1.iconfinder.com/data/icons/logotypes/32/google-drive-128.png'],
		'google-drive-find-current-doc':	['https://drive.google.com/drive/u/0/search?q=',	'Find current document on GoogleDrive',	'http://icons.veryicon.com/png/System/Google%20JFK/search%20pointer.png'],
	};
						


	/* Wide\Narrow sidebar toggle */
	$('#shapes-header-search').after('<div _ngcontent-c14 class="item vil-btn" id="shapes-sidebar-toggle"><img class="vil-icon" title="Shapes Sidebar - Wide &#92; Narrow" src="http://cdn.mysitemyway.com/icons-watermarks/simple-black/layouts-outline/layouts-outline_header-left-sidebar/layouts-outline_header-left-sidebar_simple-black_128x128.png"></img></div>');
	
	/* Main bar icons (before "saved" label) */
	$('lucid-menu-bar').append(
		'<span class="vil-bar-separator"></span>' +
		'<div _ngcontent-c64 class="item vil-btn" id="set-dialogs-positions"><img class="vil-icon" title="Set Floating Dialogs Positions" src="http://www.uidownload.com/files/350/28/39/open-website-window-with-arrow-to-the-left-icon.png"></img></div>'+
		
		($.map( links_menu_bar, function( data, id ) {
			return '<a _ngcontent-c64 href="'+data[0]+'" class="item vil-link" id="'+id+'" target="_blank"><img class="vil-icon" title="'+data[1]+'"	src="'+data[2]+'"></img></a>';
		})).join()
	);
	
	
	/* Links to lucidchart files
		var library_files = {
			'link/tofile/without/sheet/id':[
				[ 'link-id', 'link title', 'link-icon' ] // index is sheet number
			]
		}
	*/
	var library_files = {
		'https://www.lucidchart.com/documents/edit/ace0c491-88f3-48bc-9e1d-6b782037f97d':[
			['library-loops',	'LIBRARY LINK - Shape Groups: Loops',	'https://image.flaticon.com/icons/png/128/380/380021.png' ],
			['library-filetree',	'LIBRARY LINK - Shape Groups: FileTrees',	'https://image.flaticon.com/icons/svg/106/106917.svg' ],			
			['library-files',	'LIBRARY LINK - Shape Groups: Files',	'https://image.flaticon.com/icons/svg/509/509605.svg' ],			
			
		],
		'https://www.lucidchart.com/documents/edit/e919df98-4665-42d4-9531-3f79678dd7c5':[
			['library-custom-shapes',	'LIBRARY LINK - Custom Shapes',	'https://image.flaticon.com/icons/svg/109/109724.svg' ],
		]
	};
	$('lucid-menu-bar').append(
		($.map( library_files, function( pages, link ) {
			return '<span class="vil-bar-separator"></span>' + ($.map( pages, function( data, i ) {
				return '<a _ngcontent-c64 href="'+link+'/'+i+'" class="item vil-link" id="'+data[0]+'" target="_blank"><img class="vil-icon" title="'+data[1]+'"	src="'+data[2]+'"></img></a>';
			})).join();
		})).join()
	);
	
	/* Options bar icons */	
	$('lucid-more-options .more-button').after(
		/* GROUPS: Go to page level */
		'<div _ngcontent-c64 class="item vil-btn" id="go-to-page-level"><img class="vil-icon" title="Go to page Level (Alt+Shift+G) - Close group (Alt+G)" src="https://image.flaticon.com/icons/svg/335/335609.svg"></img></div>'+
		/* Lock | Unlock selection toggle */
		'<div _ngcontent-c64 class="item vil-btn" id="lock-toggle"><img class="vil-icon" title="Lock\\Unlock (Shift+Space)" src="https://image.flaticon.com/icons/png/512/166/166238.png"></img></div>'				
	);
		

}



/* ================================================================================================================================== */
/*	 SHAPE POSITION:
/* ================================================================================================================================== */

var selectors_shape = '#position-options-width-spinner, #position-options-height-spinner, #position-options-x-position-spinner, #position-options-y-position-spinner, #position-options-rotation-spinner';

/**
 *
 */
function inputAllCheckValue(){
	//console.log('inputAllCheckValue()');
	$(selectors_shape).find('input').each(function(){
		shapePositionCheckValue($(this)); 
	});
}

/** Colorize Shape otions input values by value
 *
 */
function shapePositionCheckValue(input){
	//console.log('shapePositionCheckValue()');
	//var round = input.closest('#position-options-rotation-spinner').length ? 5 : 25; // round position OR rotation
	//var value	= parseInt(input.val()) / round;
	//var color	= parseInt(value) === value  ?'':'#D0691C';
	
	var color	= 'red';
	var round_5	= parseInt(input.val()) / 5;
	var round_25	= parseInt(input.val()) / 25;	
	

	if(parseInt(round_25) === round_25)
		color	= '';
	else if(parseInt(round_5) === round_5)
		color	= 'orange';		
	input.css('color',color);
	
}

/** onShapeSelected
*/
function onShapeSelected(event){
	setTimeout(function(){
		
		var spinner = $(event.target).closest('lucid-spinner');
		/* If position spinner */
		if ( spinner.closest('lucid-position-options').length )
				shapePositionCheckValue(spinner.find('input'));
		else if ( $('#position-options-width-spinner>div').hasClass('disabled')!==true){ // if shape is selected
			/* If clicked  element is not in bars and dialogs */
			if($(event.target).closest('#editor-title-bar, .right-panel-container, .chart-option-bar, lucid-callout').length === 0)
				inputAllCheckValue();
		}
	}, 100);
	
}



/* ================================================================================================================================== */
/*	RIGHT SIDEBAR:
/* ================================================================================================================================== */

/** Expand page settings on right sidebar
*/
function expandPageSettings(){
	$('#settings-panel lucid-collapse-header.collapsed').click();
	checkPageSettings();
}

/** check Page Settings and colorize uncommon settings
 * 1) check if units are "pixels"
 * 2) check grid size
*/
function checkPageSettings(){
	/* PAGE UNITS SETTING Mark RED if 'px' units not set */
	$('#page-settings-page-units-dropdown .text:not(:contains("px"))').css('background-color','red');
	/* PAGE GRIDSETTING Mark RED if '25 px' not set */	
	if ($('.grid-spacing-spinner input').val()!='25 px')$('.grid-spacing-spinner input').css('background-color','red');
}



/* ================================================================================================================================== */
/*	BREADCUMS:
/* ================================================================================================================================== */

/** breadcumsEditClass
*/
function breadcumsEditClass(breadcums,breadcums_data){
	$(breadcums).each(function(index){
		//console.log(index)
		var class_val = breadcums_data[index];
		if(typeof class_val!=='undefined'){
			$(this).removeClass('bc-set bc-group bc-shape');
			$(this).addClass(class_val).html(class_val.replace('bc-',''));
		}
	});
}

/** breadcumsSetNamedGroups
*/
function breadcumsSetNamedGroups(){
	
	var groups_count	= $('.groupNav-container span:contains("Group")').length;
	var breadcums_data	= $('lucid-focus-breadcrumb').data('breadcrumbs-store');

	var time_count = typeof breadcums_data !='undefined' && (breadcums_data.length > groups_count) ? 100 : 150;
	
	setTimeout( function(){ 
	
		var groups_count	= $('.groupNav-container span:contains("Group")').length;
		var breadcums_cont	= $('lucid-focus-breadcrumb .container');
		var breadcums_all	= breadcums_cont.find('.breadcrumb'); // not page element
		var breadcums	= breadcums_cont.find('.breadcrumb:gt('+(breadcums_all.length - groups_count-1)+')'); // select group element after "page" AND "layer"
		var breadcums_length	= breadcums.length;
		//var breadcums_data	= $('lucid-focus-breadcrumb').data('breadcrumbs-store');
		var breadcums_classes	= [ 'bc-set','bc-group','bc-shape'];	
	
		if( typeof breadcums_data =='undefined' || breadcums_all.length === 0 )
			breadcums_data = [];
			//console.log('BREADCUMS RESET');
		if(breadcums_length > 0 ){
			//console.log('GROUP SELECTED');
			var shape_selected	= $('#option-line-options>div').hasClass('disabled') && $('#option-action-button>div').hasClass('disabled')===false;
			//console.log('shape_selected='+shape_selected);
			
			//if( breadcums_length != breadcums_data.length ){
				console.log('GROUP EDITED '+breadcums_length +' > ' +  breadcums_data.length);
				console.log( 'breadcums_data IN =\n'+JSON.stringify(breadcums_data , null, 2) );
				
				if(!shape_selected && breadcums_classes.length > breadcums_length)
					breadcums_classes.splice(-1);
	
				breadcums_data = breadcums_classes.slice(breadcums.length*-1);
				console.log( 'breadcums_data OUT =\n'+JSON.stringify(breadcums_data , null, 2) );			
			//}
			breadcumsEditClass(breadcums,breadcums_data);
		}
		$('lucid-focus-breadcrumb').data('breadcrumbs-store',breadcums_data);
		
	}, time_count);
}



/* ================================================================================================================================== */
/*		GROUPS: 
/* ================================================================================================================================== */
/** Go to page level of selection
 * Function clicks on breadcum 'PAGE'
*/
function breadcumsClick(index){
	if (index<0)
		index = $('.breadcrumb').length + index;
	$('.breadcrumb:eq('+index+')').click();
}



/* ================================================================================================================================== */
/*	EVENTS 
/* ================================================================================================================================== */

/**
 */
$( document ).ready(function() {
	
	/* add vil buttons */	
	addVilButtons();	
	
	/* ON CLICK - ON RIGHT SIDEBAR OPEN - by one of icon */
	$( ".tabs-container .tabs li" ).on( "click", function(){
		setDialogPositions();
	}); 

	/* ON CLICK - Page settings - */
	$( "lucid-right-panel .toggle-panel:not(.open) + #settings-tab-button" ).on( "click", function() {
		expandPageSettings();
	});

	/* ON INIT - EXPAND Right Sidebar on Page settings IF "Blank Diagram" ELSE Lyers sections*/
	$('#document_title span').html() == "Blank Diagram" ? $("#settings-tab-button").click() : $('#layers-tab-button').click();
	expandPageSettings();
	
	/* set dialogs */
	setDialogPositions();

	
	/* ON INIT - COLORIZE INPUT VALUES */
	inputAllCheckValue();

	/* ON MOUSEUP - Check on value changed */	
	$(document).mouseup(function(event) {
		onShapeSelected(event);
	});
	/* ON MOUSEUP - Check on value changed */	
	$(document).mouseup(function(event) {
			breadcumsSetNamedGroups();
	});
	/*
		ON DOCUMENT SEARCH PAGE
		https://www.lucidchart.com/documents#docs?folder_id=search&browser=list&sort=name-desc&document_search=Test
	 */
	var search_document =  /document_search=(.*)/gi.exec( window.location.href);
	if(search_document)
		$('#search-text').val(search_document[1]).focus();
	
	/*
	 * KEYPRESS EVENTS http://www.epigroove.com/blog/check-for-modifier-keys-when-using-jquerys-keypress
	 **/
	$(document).keydown(function(e) {
		//e.preventDefault(); 
		if ( e.which == 71) { // 'G'
		    //e.preventDefault(); 
			if (e.altKey && e.shiftKey   ) {
				//console.log('Alt+SHIFT+G');
				breadcumsClick(0);
				breadcumsSetNamedGroups();
			} else if (e.altKey) {
				//console.log('Alt+G');
				breadcumsClick(-2);
				breadcumsSetNamedGroups();
			}
		} else if ( e.which == 32 ) { //'space'
		    //e.preventDefault(); 
			if (e.shiftKey )
				selectionLockToggle();
		} else if ( e.which == 70 ) { //'f'
		    //e.preventDefault(); 
			if (e.ctrlKey  )
				setDialogPositions(); // set dialog positions, "Find & Replace" dialog does not show sometimes
		}
	});
});

/* Reposition dialogs on Window resize */
$(window).resize(function() {
	setDialogPositions();
});


/* ================================================================================================================================== */
/*	EVENTS - CUSTOM BUTTONS
/* ================================================================================================================================== */

$( document ).ready(function() {

	$( ".vil-btn" ).on( "click", function() {
		var id = $(this).attr('id');
		if (id=='set-dialogs-positions')
			setDialogPositions();
		else if (id=='shapes-sidebar-toggle')
			shapesSideBarToggle();
		else if (id=='go-to-page-level')
			breadcumsClick(0);
			
	});
	
	$( ".vil-link" ).on( "click", function(e) {
		var id = $(this).attr('id');
		if (id=='lucidchart-search'||id=='google-drive-find-current-doc'){
			e.preventDefault();
			 window.open($(this).attr('href')+$('#document_title span').html());
		} else if (id=='view-edit-document'){
			e.preventDefault();
			 window.open( $(this).attr('href').replace( /\d+#*$/, $('.page-tab.selected').index()) );
		}

		
		
	});	
});



#chrome.google.com#
{"script":"/** StylishPresets\n */\nwindow.StylishPresets = (function() {\n\n\t/* CONSTRUCT */\n\tfunction StylishPresets(){\n\t\t/*--------   PRIVATE PROPERTIES   -------------------------------------------------------------------------------------*/\n\t\tvar _this\t= this;\n\t\tthis.id\t= parseInt($('#style-id').html());\n\t\t/*--------   PUBLIC PROPERTIES   --------------------------------------------------------------------------------------*/\n\t\t\n\t\t/*--------   PROTOTYPE PROPERTIES   -----------------------------------------------------------------------------------*/\n\t\t\n\t\t/*--------   PUBLIC METHODS   -----------------------------------------------------------------------------------------*/\n\t\t/** settingsSave\n\t\t */\n\t\tthis.settingsSave = function(cname){\n\t\t\tvar settings={};\n\t\t\t$('#advancedsettings_area').find('select, input:not([type=\"file\"])').each(function(){\n\t\t\t\tvar type = $(this).attr('type');\n\t\t\t\tif(type==\"radio\"){\n\t\t\t\t\tsettings[$(this).attr('id')] = $(this).is(':checked');\n\t\t\t\t} else {\n\t\t\t\t\tsettings[$(this).attr('id')] = $(this).val();\n\t\t\t\t}\n\t\t\t\t\n\t\t\t});\n\t\t\tsetCookie(cname, JSON.stringify( settings));\n\t\t};\n\t\t\n\t\t/** settingsLoad\n\t\t */\n\t\tthis.settingsLoad = function(cname){\n\t\t\t//alert( \"load \"+cname );\t\t\t\n\t\t\tvar settings = JSON.parse(getCookie(cname));\n\t\t\t//console.log( 'settings=\\n'+JSON.stringify( settings, null, 2) )\n\t\t\t$('#advancedsettings_area').find('select, input').each(function(){\n\t\t\t\tvar input\t= $(this);\n\t\t\t\tvar type\t= input.attr('type');\n\t\t\t\tvar value\t= settings[input.attr('id')];\n\t\t\t\tif(type==\"radio\"){\n\t\t\t\t\t//settings[$(this).attr('id')] = $(this).is(':checked');\n\t\t\t\t\tinput.attr('checked', value);\n\t\t\t\t} else{\n\t\t\t\t\tif(typeof value == 'string') value = value.replace('+', '');\n\t\t\t\t\tinput.val(value);\n\t\t\t\t\t/* set color to color picker */\n\t\t\t\t\tif (typeof value == 'string' && value.match(/#[\\w]+/gi)) {\n\t\t\t\t\t\tvar color_picker\t= input.closest('div').find('div div');\n\t\t\t\t\t\tvar style_attr\t= color_picker.attr('style');\n\t\t\t\t\t\tcolor_picker.attr('style', style_attr.replace(/background:[^;]+/gi, 'background:'+value ));\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\t\t/*--------   PRIVATE METHODS   ----------------------------------------------------------------------------------------*/\n\t\t/** addButtons\n\t\t*/\n\t\tfunction addButtons(){\n\t\t\t$('#style-settings').prepend( '<button id=\"preset-defaults\"class=\"white_button\"title=\"LMB\\\\RMB: Load defult settings\"style=\"float:left\">Default</button>'+\n\t\t\t\t([1,2,3].map(function(v){\n\t\t\t\t\treturn '<button id=\"preset-'+_this.id+'-'+v+'\" class=\"white_button s-preset\" style=\"float:left\"title=\"LMB: Save Preset\\nRMB: Load Preset\" >Preset '+v+'</button>';\n\t\t\t\t})).join('')\n\t\t\t)\n\t\t};\n\t\t\n\t\t/** bindEvents\n\t\t*/\n\t\tfunction bindEvents(){\n\t\t\t/** SAVE preset on click\n\t\t\t */\t\t\t\n\t\t\t$(document).on('click','.s-preset', function(e){\n\t\t\t\tif (confirm (\"Do You want to save \"+ $(this).html()+\" ?\")){\n\t\t\t\t\tsettingsSave( $(this).attr('id') );\n\t\t\t\t}\n\t\t\t});\n\t\t\t/** LOAD preset on rightclick\n\t\t\t */\n\t\t\t$(document).on('contextmenu','.s-preset', function(e){\n\t\t\t\te.preventDefault();\n\t\t\t\tsettingsLoad( $(this).attr('id') );\t\n\t\t\t});\n\n\t\t\t/**\tSave current settings on style update\n\t\t\t */\n\t\t\t$(document).on('click','#update_style_button', function(){\n\t\t\t\tsettingsSave('preset-'+_this.id+'-current');\n\t\t\t\t setTimeout( function(){ \n\t\t\t\t \tlocation.reload();\n\t\t\t\t }, 500);\n\t\t\t\t \n\t\t\t});\n\t\t\t/**\tLoad defaut settings\n\t\t\t */\n\t\t\t$(document).on('click contextmenu','#preset-defaults', function(e){\n\t\t\t\te.preventDefault();\n\t\t\t\tsetCookie('preset-'+_this.id+'-defaults', 'true');\n\t\t\t\tlocation.reload();\n\t\t\t});\n\n\t\t};\n\t\t\n\t\t/** Load current settings \n\t\t*/\n\t\tfunction loadCurrent(){\n\t\t\tif(getCookie('preset-'+_this.id+'-defaults')!='true'){\n\t\t\t\t//setTimeout( function(){ \n\t\t\t\t\t_this.settingsLoad('preset-'+this.id+'-current');\n\t\t\t\t//}, 200)\n\n\t\t\t}\n\t\t\t\n\t\t\tsetCookie('preset-'+_this.id+'-defaults', -1);\n\t\t}\n\t\t\n\t\t\n\t\t/** COOKIES\n\t\t*/\n\t\tfunction setCookie(cname, cvalue, exdays) {\n\t\t\tif (typeof exdays== 'undefined') exdays = 365;\n\t\t\tvar d = new Date();\n\t\t\td.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));\n\t\t\tvar expires = \"expires=\"+d.toUTCString();\n\t\t\tdocument.cookie = cname + \"=\" + cvalue + \";\" + expires + \";path=/\";\n\t\t};\n\t\t\n\t\tfunction getCookie(cname) {\n\t\t\tvar name = cname + \"=\";\n\t\t\tvar ca = document.cookie.split(';');\n\t\t\tfor(var i = 0; i < ca.length; i++) {\n\t\t\t\tvar c = ca[i];\n\t\t\t\twhile (c.charAt(0) === ' ') {\n\t\t\t\t\tc = c.substring(1);\n\t\t\t\t};\n\t\t\t\tif (c.indexOf(name) === 0) {\n\t\t\t\t\treturn c.substring(name.length, c.length);\n\t\t\t\t};\n\t\t\t};\n\t\t\treturn \"\";\n\t\t};\n\n\t\t\n\t\t/*--------   CONSTRUCT METHODS  ---------------------------------------------------------------------------------------*/\n\t\taddButtons();\n\t\tbindEvents();\n\t\tloadCurrent();\n\t};\n\t\n\treturn StylishPresets;\n})();\n\n\n\t\t\tStylishPresets();\n\n\t","autostart":true,"css":"","sfile":"jquery.js"}
#docs.google.com#
{"script":"/*==================================================================================================================================*/\n/*\n/* MENU:\n/*    Add current script name to window title                                                                                       \n/*\n/* ------------------------------------------------------------------------\n/*\n/*\n/*==================================================================================================================================*/\n\n/** https://gist.github.com/chrisjhoughton/7890303\n *\n */\nvar waitForEl = function(selector, callback) {\n  if (jQuery(selector).length) {\n    callback();\n  } else {\n    setTimeout(function() {\n      waitForEl(selector, callback);\n    }, 100);\n  }\n};\n\n/* ================================================================================================================================== */\n/*\tMENU:                                                                                                                     \n/* ================================================================================================================================== */\n/** setMenuItemsContentToAttribute\n*/\nfunction setMenuItemsContentToAttribute(){\n\tsetTimeout( function(){ \n\t\t$('#docs-menubar > .menu-button').each(function(){\n\t\t\t$(this).attr('js-tricks-label', $(this).html());\n\t\t});\n\t}, 500);\n}\n\n\n\n\n\n\n/* ================================================================================================================================== */\n/*\tINIT                                                                                                                            */\n/* ================================================================================================================================== */\n\t\n$(document).ready(function() {\n\t/* Wait for custom menu items exists */\n\twaitForEl('#docs-help-menu + .menu-button[role=\"button\"]', function() {\n\t\tsetMenuItemsContentToAttribute();\n\t});\n\t\n});\n\n\n\n","autostart":true,"css":"","sfile":"jquery.js"}
#fjnbnpbmkenffdnngjfgmeleoegfcffe#
{"script":"/* Auto pin popout dialog for \"Text Color\", \"Text Options\", \"Shape Options\", \"Fill Color\", \"Line Color\" \n *\n */\nif (document.addEventListener) {\n\tdocument.addEventListener(\"click\", function(event) {\n\t\tvar targetElement = event.target || event.srcElement;\n\t\t// console.log(targetElement);\n\t\t//  $(targetElement).closest('.click-icon').css('border','1px solid red')\n\t\tif ($(targetElement).closest('lucid-simple-color-picker, #option-text-options, #option-shape-callout, #option-line-options').length > 0) {\n\t\t\t//console.log(targetElement);\n\t\t\t$(targetElement).closest('.click-icon')\n\t\t\t\t//.css('border', '1px solid red')\n\t\t\tsetTimeout(function() {\n\t\t\t\t$('.pin-container .pin-icon')[0].click();\n\t\t\t\tsetDialogPositions();\n\t\t\t}, 300)\n\t\t}\n\t});\n}\n\n/* Dialogs positions\n *\n */\nvar dialog_align = 'right' // set dialog position by top left OF top right corner\n/* dialog positions [x,y] iIF x==0 then dialog align to side of working area */\nvar dialog_positons={\n\t\"Line Options\":[0,103],\n    \"Shape Options\":[0,170],\n\t\"Fill Color\":[0,388],\n\t\"Line Color\":[0,590],\n\t\"Text Options\":[0,765],\n\t\"Text Color\":[0,925],\n\t\"Find & Replace\":[0,1100],\t\n\t\n};\n\n/* Set popout dialogs positions\n*/\nfunction setDialogPositions(){\n\t/* Set popout dialog header height */\n\t//$('span:contains(\"Line Options\")').closest('lucid-callout.pinned').css('border','1px solid red').css('width','96px !important');\t// set same width\n\t$('span:contains(\"Fill Color\")').closest('lucid-callout.pinned').css('z-index','998');\t// adjust z-index for expanded area\n\t$('span:contains(\"Shape Options\")').closest('lucid-callout.pinned').css('z-index','999');\t// adjust z-index for expanded area\n\t\n\t\n\tvar dialog_positons_keys = Object.keys(dialog_positons);\n\tvar offset_left\t= $('.toolbox-container').width() + 16;\n\tvar offset_right\t= window.innerWidth - ( $('.toggle-panel:not(.open)').length ? 52 : 302 );\n\t\n\t\n\tfor(p=0; p<dialog_positons_keys.length;p++) {\n\t\tvar header_text\t= dialog_positons_keys[p];\n\t\t\n\t\t/* GET DIALOG */\n\t\tvar dialog\t= header_text!=\"Find & Replace\" ? $('span:contains(\"'+header_text+'\")').closest('lucid-callout.pinned') : $('lucid-floating-dialog');\n\t\t\n\t\tvar pos_x\t= dialog_positons[header_text][0]\n\t\t/* GET POSITION X */\n\t\t//var pos_x\t= pos_x==0 ? (dialog_align!=='right'? offset_left: offset_right - dialog.width()) : pos_x;\n\t\tvar pos_x_offseted\t= dialog_align!=='right'? offset_left + pos_x : offset_right - dialog.width() - pos_x;\t\t\n\t\t\n\t\tdialog .css('left',pos_x_offseted).css('top', dialog_positons[header_text][1]);\n\t}\n\t\n}\n\n/**\n *\n */\n$( document ).ready(function() {\n\t\n\t$( \".tabs-container .tabs li\" ).on( \"click\", function(){\n\t\tsetDialogPositions();\n\t}); \n\t/* Page settings on click - Expand page settings */\n\t$( \"#settings-tab-button, lucid-right-panel .toggle-panel:not(.open)\" ).on( \"click\", function() {\n\t\t$('#settings-panel lucid-collapse-header.collapsed').click();\n\t\t/* Mark RED if 'px' units not set */\n\t\t$('#page-settings-page-units-dropdown .text:not(:contains(\"px\"))').css('background-color','red');\n\t\tif ($('.grid-spacing-spinner input').val()!='25 px')$('.grid-spacing-spinner input').css('background-color','red');\n\t\n\t\t\n\t}); \n\n\t/* EXPAND Right Sidebar */\n\t$('#layers-tab-button').click()\n\tsetDialogPositions();\n\t\n});\n\n\n/* Reposition dialogs on Window resize */\n$(window).resize(function() {\n\tsetDialogPositions();\n});\n\n/* CUSTOM BUTTONS */\nvar links={\n\t'google-drive-documents':'https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2MGpETF9zdmVuY0E',\t\n\t'google-drive-lucid':'https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2Vl9wdjVKTUhGM2c',\n\t'google-drive-current-doc':'https://drive.google.com/drive/u/0/search?q=',\t\n};\n\n/* CUSTOM STYLE - ADDENBY STYLISH */\n/*\n$( document ).ready(function() {\n\t$('body').append('<style>.vil-icon{height:20px;padding-top:10px}.save-status{color:#ff7f00}lucid-color-picker,lucid-text-options .textoptions>div{padding:5px!important}</style>');\n});\n*/\n\n\n//$('lucid-menu-bar').append( '<div _ngcontent-c64 class=\"item vil-link\" id=\"google-drive-documents\" ><span>GoogleDrive</span></div>');\n$('lucid-menu-bar').append(\n\t\t\t\t\t\t'<div _ngcontent-c64 class=\"item vil-btn\" id=\"set-dialogs-positions\"><img class=\"vil-icon\" title=\"Set Floating Dialogs Positions\" src=\"http://www.uidownload.com/files/350/28/39/open-website-window-with-arrow-to-the-left-icon.png\"></img></div>' \n\t\t\t\t\t   +'<div _ngcontent-c64 class=\"item vil-link\" id=\"google-drive-lucid\"><img class=\"vil-icon\" title=\"Open GoogleDrive\\\\Documents\\\\Lucidchart\" src=\"https://lh3.googleusercontent.com/OscWUyHwrZ50CaatnNWE45UxaSBKX1gfyKg4W7hJRA0LoGeYg3uPrifEhPA6PEd54C8b0hL6=w128-h128-e365\"></img></div>'\n\t\t\t\t\t   +'<div _ngcontent-c64 class=\"item vil-link\" id=\"google-drive-documents\"><img class=\"vil-icon\" title=\"Open GoogleDrive\\\\Documents Folder\" src=\"https://cdn1.iconfinder.com/data/icons/logotypes/32/google-drive-128.png\"></img></div>'\n\t\t\t\t\t   +'<div _ngcontent-c64 class=\"item vil-link\" id=\"google-drive-current-doc\"><img class=\"vil-icon\" title=\"Find GoogleDrive current document\" src=\"http://icons.veryicon.com/png/System/Google%20JFK/search%20pointer.png\"></img></div>'\n\t\t\t\t\t);\n\n$('#shapes-header-search').after('<div _ngcontent-c14 class=\"item vil-btn\" id=\"shapes-sidebar-toggle\"><img class=\"vil-icon\" title=\"Show\\Hide Shapes\" src=\"https://marketplace.canva.com/MACLa5FuFo4/1/thumbnail_large/canva-left-sidebar-icon-MACLa5FuFo4.png\"></img></div>');\n\t\n$( \".vil-btn\" ).on( \"click\", function() {\n\tvar id = $(this).attr('id');\n\tif (id=='set-dialogs-positions')\n\t\tsetDialogPositions();\n\telse if (id=='shapes-sidebar-toggle')\n\t\tshapesSideBarToggle();\n\n\t\n}); \n/** shapesSideBarToggle\n*/\nfunction shapesSideBarToggle(){\n\t$('lucid-left-panel').css('min-width','0')\n\tif (parseInt($('lucid-left-panel').css('width')) < > 100);\n\t\t$('lucid-left-panel').width('50px!important')\n\telse\n\t\t$('lucid-left-panel').width('500px!important')\t\t\n}\n\n$( \".vil-link\" ).on( \"click\", function() {\n\tvar id = $(this).attr('id');\n\t\n\tswitch (id) {\n\t\tcase 'google-drive-current-doc':\n\t\t\turl = links[id]+'\"'+$('#document_title span').html()+'\"';break;\n\t\tdefault:\n\t\t\turl = links[id];\n\t}\n\twindow.open( url, '_blank')\n}); \n\n\t\n","autostart":false,"css":"","sfile":"jquery.js"}
#info#
0.9.87
#mail.google.com#
{"script":"/*======================================================================================*/\n/*                                                                                      */\n/*======================================================================================*/\n$(document).keypress(function(e) {\n    \te.preventDefault();\n\tif(e.ctrlKey && e.which == 13) {\n        //alert('You pressed enter!');\n\t\tconfirmSend();\n    }\n});\n\n\n/** confirmSend\n*/\nfunction confirmSend(){\n\tvar answer = confirm (\"Send email ?\");\n\tif (answer){\n\t\t\n\t}\n}\n","autostart":false,"css":"","sfile":"jquery.js"}
#mrcoles.com#
{"script":"/* Prefill form for bookmarklets creations on http://mrcoles.com/bookmarklet/\n *\n */\n\nvar open_links_script = \"var links = [\"+\n\t\t\t\t\t\t\"\\n\t'link',\"+\n\t\t\t\t\t\t\"\\n\t'link',\"+\n\t\t\t\t\t\t\"\\n];\"+\n\t\t\t\t\t\t\"\\nwindow.location.replace(links[0]);\"+\n\t\t\t\t\t\t\"\\nfor(var l=1; l<links.length;l++) {\"+\n\t\t\t\t\t\t\"\\n\tif(links[l])window.open(links[l]);\"+\n\t\t\t\t\t\t\"\\n}\";\n\t\t\t\t\t\t\t\n$('#alpha .header').append('<h3 style=\"color:green\">Site is tweaked by JScript Tricks Extension - vilbur`s script</h3>');\n\n/* Hide unnecessary elements */\n$('#beta, #disqus_thread').hide();\n$('#bk-results').nextAll().hide()\n$('#alpha').css('width','100%');\n/* fill form */\n$('#bk-code').css('width','100%')\n\t\t\t .val(open_links_script)\n\t\t\t .focusout(function() {\n\t\t\t\t$('#bk-form button[type=\"submit\"]').click();\n\t\t\t});\n","autostart":true,"css":"","sfile":"jquery.js"}
#script.google.com#
{"script":"/*==================================================================================================================================*/\n/*                                                                         \n/* BROWSER WINDOW:\n/*    Add current script name to window title\n/*                  \n/* ------------------------------------------------------------------------\n/*                  \n/* RESOURCE LIST:\n/*    Add tooltip of file prefix on hovered item                           \n/*    Context menu on double click           \n/*                  \n/* ------------------------------------------------------------------------\n/*                  \n/* FILE TABS:\n/*    Close tab on middle click              \n/*    Add Tooltip about prefix to reource list items                       \n/*                  \n/* ------------------------------------------------------------------------\n/*                  \n/* CODE AREA:\n/*    Add class '.this' to <span>this</span> \n/*    Add Tooltip about prefix to reource list items                       \n/*                  \n/* ------------------------------------------------------------------------\n/* FIND & REPLACE DIALOG:\n/*    'Replace In All' scripts button added  \n/*    Mark script link where 'Replaced all' was used                       \n/*    Mark active script link                \n/*                  \n/* ------------------------------------------------------------------------\n/*                  \n/* LIBRARY DIALOG:\n/*   Auto select highest versions of libraries                             \n/*                  \n/*                  \n/*==================================================================================================================================*/\n\n\n\n/** https://gist.github.com/chrisjhoughton/7890303\n *\n */\nvar waitForEl = function(selector, callback) {\n  if (jQuery(selector).length) {\n    callback();\n  } else {\n    setTimeout(function() {\n      waitForEl(selector, callback);\n    }, 100);\n  }\n};\n\n\n\n\n/* ================================================================================================================================== */\n/*\tBROWSER WINDOW:\n/* ================================================================================================================================== */\n\n/** set Window Title by Project name and selected script\n*/\nfunction setWindowTitle(){\n\tsetTimeout( function(){ \n\t\tvar name_project\t= $('#docs-title-inner').html();\n\t\tvar name_script\t= $('.gwt-TabLayoutPanelTab-selected .gwt-Label.name').html();\n\t\tif (!name_script.match(/^\\!.*/gi)) \n\t\t\tdocument.title = name_project +' - '+ name_script;\n\t}, 500);\n}\n\n/*\n\t====== EVENTS ======\n*/\n/**  Add current script name to window title\n*/\n$(document).on('click','.project-items-list>div', function() {\n\tsetWindowTitle();\n\tsetTabColor(this);\n});\n\n\n\n\n/* ================================================================================================================================== */\n/*\tRESOURCE LIST:\n/* ================================================================================================================================== */\n\n/** Show dropdown menu on file in filelist\n* // select opened Tabs does not work\n*/\n$(document).on('dblclick','.project-items-list>div', function() {\n\t//var last_tab = $('.gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab:last-of-type()');\n\t$(this).find('.gwt-Image.dropdown').click();\n});\n\n\n/**  Add Tooltip on hovered item in Resourcel list\n*/\n$(document).on('mouseover','.project-items-list>div', function() {\n\t//setWindowTitle();\n\t//setTabColor(this);\n\tvar resource_title\t= $(this).find('.name');\n\tvar title\t= resource_title.html();\n\tvar tooltip\t= '';\n\tvar prefix_chars\t= [ '!', '─', '~!~', '~', '_' ];\n\t\n\tvar match_title = (new RegExp('^('+prefix_chars.join('|')+')', 'gi')).exec(title);\n\tif (match_title) \n\t\tswitch (match_title.pop()){\n\t\t\tcase prefix_chars[0]: tooltip = \"MAIN SCRIPT FILE - Same name as project\";break;\n\t\t\tcase prefix_chars[1]: tooltip = \"Library file - Same content in all scripts\";break;\n\t\t\tcase prefix_chars[2]: tooltip = \"PLACE THIS FILE TO MAIN SCRIPT\";break;\n\t\t\tcase prefix_chars[3]: tooltip = \"Interface file - Same functions in files, different cotnent per script\";break;\n\t\t\tcase prefix_chars[4]: tooltip = \"Html file\";break;\n\t\t}\n\n\tif(tooltip!==''){\n\t\ttooltip = '    // \"'+match_title.pop()+'\" prefix for: '+ tooltip+' ';\n\t\tresource_title.attr('title', title + tooltip );\n\t}\n\n});\n\n\n\n\n\n\n\n/* ================================================================================================================================== */\n/*\tFILE TAB:\n/* ================================================================================================================================== */\n/** setTabColor\n * for Stylish styling\n*/\nfunction setTabColor(menuitem){\n\tsetTimeout( function(){ \n\t\t$('.gwt-TabLayoutPanelTab-selected .name').attr('title', $(menuitem).find('.name').attr('title'));\n\t}, 500);\n}\n\n/*\n\t====== EVENTS ======\n*/\n/** On script tab click\n*/\n$(document).on('mousedown','.gwt-TabLayoutPanelTabs>div', function(e) {\n    if (e.which === 1)\n\t\tsetWindowTitle();\n    if (e.which === 2) //  Close tab on middle click\n\t\t$(this).find('.gwt-Image.close-button').click();\n});\n\n\n\n/* ================================================================================================================================== */\n/*\tCODE AREA:\n/* ================================================================================================================================== */\n/** addClassToSpan_this\n*/\nfunction addClassToSpan_this(){\n\t$('.code-area').find('.cm-variable-2:not(.this):contains(\"this\")').addClass('this');\n}\n\n/*\n\t====== EVENTS ======\n*/\n/** Show dropdown menu on file in filelist\n* // select opened Tabs does not work\n*/\n$(document).on('click','.code-area', function() {\n\taddClassToSpan_this();\n});\n\n/* ================================================================================================================================== */\n/*\tFIND & REPLACE DIALOG:\n/* ================================================================================================================================== */\n\n/** Add button 'replace in all scripts' \n*/\nfunction addButtonReplaceInAllScripts(){\n\t//setTimeout( function(){\n\tif($('#replace-in-all-scripts').length===0)\n\t\t$('.findreplace-box .buttons button:last-of-type').before('<button type=\"button\" id=\"replace-in-all-scripts\" class=\"gwt-Button\">Replace In All</button>');\n\t//}, 500);\n}\n/** repalceInAll\n*/\nfunction repalceInAll(){\n\n\tvar input_replace = $('.gwt-TextBox.input[aria-label=\"Replace\"]');\n\tvar links = $('.findreplace-box .gwt-Anchor');\n\t\n\tif(input_replace.val()!==''){\n\tvar answer = confirm (\"Replace in all scripts ?\");\n\t\tif (answer){\n\t\t\tlinks.each(function(index){\n\t\t\t\tclickOnLink(this, index);\n\t\t\t});\n\t\t}\n\t} else\n\t\tinput_replace.focus();\n}\n/** clickOnLink\n*/\nfunction clickOnLink(link,index){\n\tvar timeout = 1000*index;\n\tsetTimeout( function(){\n\t\t$(link)[0].click();\n\t}, timeout);\n\tsetTimeout( function(){\n\t\t$('.findreplace-box .gwt-Button:nth-of-type(3)').click();\n\t}, timeout+500);\n\t\n\t\n}\n/** selectReplaceInput\n*/\nfunction selectReplaceInput(){\n\tif( $('.findreplace-box .input[aria-label=\"Find\"]').val()!=='')\n\t\t$('.findreplace-box .input[aria-label=\"Replace\"]').focus();\n}\t\n/** fillReplaceInput\n*/\nfunction fillReplaceInput(){\n\tif( $('.findreplace-box .input[aria-label=\"Find\"]').val() === 'NewScript')// auto fill replace with script name if search for NewScript\n\t\t$('.findreplace-box .input[aria-label=\"Replace\"]').val($('#docs-title-inner').html());\n}\n\n/*\n\t====== EVENTS ======\n*/\n\n/* Add class '.active' to link of 'Find & Replace dialog'\n*/\n$(document).on('click', '.findreplace-box .gwt-Anchor', function(){\n\t$( '.findreplace-box .gwt-Anchor').removeClass('active');\n\t$(this).addClass('active');\n});\n\n/* Add class 'replaced' to link, when 'Replace all' button is clicked\n*/\n$(document).on('click', '.findreplace-box .gwt-Button:nth-of-type(3)', function(){\n\t$('.findreplace-box .gwt-Anchor.active').addClass('replaced');\n});\n\n/* Focus INPUT REPLACE if\n*/\n$(document).on('focus', '.findreplace-box .input[aria-label=\"Find\"]', function(){\n\tif($('#replace-in-all-scripts').length===0){\n\t\tsetTimeout( function(){\n\t\t\tfillReplaceInput();\n\t\t\tselectReplaceInput();\n\t\t}, 100);\n\t}\n});\n\n\n/* Add replace button on INPUT REPLACE focused\n*/\n$(document).on('focus', '.findreplace-box .input[aria-label=\"Replace\"]', function(){\n\taddButtonReplaceInAllScripts();\n});\n\n/* Auto FIND on INPUT FIND blured\n*/\n$(document).on('blur', '.gwt-TextBox.input[aria-label=\"Find\"]', function(){\n\t$('.findreplace-box .gwt-Button:nth-of-type(1)').click();\n});\n/* Add class 'replaced' to link, when 'Replace all' button is clicked\n*/\n$(document).on('click', '#replace-in-all-scripts', function(){\n\trepalceInAll();\n});\n\n\n\n\n\n\n/* ================================================================================================================================== */\n/*\tMANAGE VERSIONS DIALOG:\n/* ================================================================================================================================== */\n/** Automatically add text to first version of script.\n *  1st version of script should be 'EMPTY' NON WORKING script, THIS ALLOWS TEMPORARY DISABLE SCRIPT IN LIBRARY \n */\nfunction setDescriptionOfFrisrtVersion(){\n\tif($('.version-dialog .header-row + tr').length===0){\n\t\t$('.version-dialog .smart-textbox').css('color','red').val('DISABLED version of script.');\n\t}\n}\n\n\n/*\n\t====== EVENTS ======\n*/\n/** Set auto description if first revision\n *\n */\n$(document).on('click', 'span.goog-menuitem-label:contains(\"Manage versions...\")', function(){\n\tsetTimeout( function(){ \n\t\tsetDescriptionOfFrisrtVersion();\n\t}, 1000);\n});\n\n\n/* ================================================================================================================================== */\n/*\tLIBRARY DIALOG:\n/* ================================================================================================================================== */\n\n/** auto select highest library version\n*/\nfunction autoSelectHigherLibraryVersion(){\n\t\n\t/* Wait for library table exists */\n\twaitForEl('.maestro-dialog .lined-table .header-row + tr', function() {\n\t\tvar answer = confirm (\"Set all libraries to highest version ?\");\n\t\tif (answer){\n\t\t\tvar timeout;\n\t\t\t/* Click on every dropdown */\n\t\t\t$('.row .version input').each(function(index){\n\t\t\tvar input\t= $(this);\n\t\t\ttimeout\t= ((index+1)*500);\n\t\t\t\tsetTimeout( function(){\n\t\t\t\t\t/* Click on every dropdown */\n\t\t\t\t\tinput.click();\n\t\t\t\t\t/* Choose highest version */\n\t\t\t\t\tsetTimeout( function(){ \n\t\t\t\t\t\t$('.version-picker .versions tr.version:first-of-type .description').click();\n\t\t\t\t\t}, timeout+200);\n\t\t\t\t},timeout);\n\t\t\t});\n\t\t\t/* Click on Save button */\n\t\t\tsetTimeout( function(){ \n\t\t\t\t$('.maestro-dialog .buttons .gwt-Button:first-of-type').click();\n\t\t\t}, timeout+1000);\n\t\t}\n\t});\n\t\n\t\n}\n\n/*\n\t====== EVENTS ======\n*/\n/** On libraries open, update all versions\n *\n */\n$(document).on('click', 'span.goog-menuitem-label:contains(\"Libraries...\")', function(){\n\tsetTimeout( function(){ \n\t\tautoSelectHigherLibraryVersion();\n\t}, 1000);\n});\n\n\n/* ================================================================================================================================== */\n/*\tINIT                                                                                                                              */\n/* ================================================================================================================================== */\n\t\n$(document).ready(function() {\n\tsetTimeout( function(){ \n\t\tsetWindowTitle();\n\t}, 500);\n});\n\n\n\n","autostart":true,"css":"","sfile":"jquery.js"}
#userstyles.org#
{"script":"$('#option-1646548').attr('checked', 'true')","autostart":false,"css":"","sfile":"jquery.js"}
#www.kaloricketabulky.cz#
{"script":"/*==================================================================================================================================*/\n/*\n/* ADDMENU:\n/*    Add title attribute to menu items for Stylish styling\n/*\n/* ------------------------------------------------------------------------\n/*\n/*\n/*==================================================================================================================================*/\n\n\n/* ================================================================================================================================== */\n/*\tJIDELNICEK:                                                                                                                     \n/* ================================================================================================================================== */\n/** \n*/\nfunction addTitlesToMenuItems(){\n\t$('.denik_left .draggable').each(function(){\n\t\t$(this).attr('title', $(this).clone()\n\t\t\t\t\t\t.children()\n\t\t\t\t\t\t.remove()\n\t\t\t\t\t\t.end()\n\t\t\t\t\t\t.text()\n\t\t\t\t\t\t.trim() \n\t\t\t\t\t);\n\t});\n}\n\n\n/* ================================================================================================================================== */\n/*\tINIT                                                                                                                            */\n/* ================================================================================================================================== */\n\t\n$(document).ready(function() {\n\taddTitlesToMenuItems();\n});\n\n\n\n","autostart":true,"css":"","sfile":"jquery.js"}
#www.lucidchart.com#
{"script":"/*==================================================================================================================================\n\n\tSTYLISH CUSTOM STYLE REQUIRED FOR SCRIPTS: https://userstyles.org/styles/148176\n\n==================================================================================================================================\n\n\tMAINS TOOLBAR:\n\t\tAdd custom icons\n\t\t\n ------------------------------------------------------------------------\n\t\n\tDATA LINKING:\n\t\tClick on 'Keep Both' when double click on dialog\n\t\t\t\t\n ------------------------------------------------------------------------\n\t\n\tFLOATING DIALOGS:\n\t\tset predefined positions, aligned to left or right side of window\n\t\t\n ------------------------------------------------------------------------\n \n \tSHAPE POSITION:\n\t\tcheck position and colorize inputs with non round values                                                      \n\t\n ------------------------------------------------------------------------\n \n\tBREADCUMS:\n\t\tChange DEFAULT breadcumns to DETAILED breadcums, DETAILED shows more about actual position in group hierarchy\n\t\tDEFAULT:\tPAGE > GROUP\t> GROUP > GROUP\t\t// default just show that GROUP in hierarchy is selected\n\t\tDETAILED:\tPAGE > SET\t> GROUP > SHAPE\t\t// detailed shows more about selection: PAGE level > SET of groups > GROUP of shapes > SHAPE itself\n\t\t\n ------------------------------------------------------------------------\n \n\tGROUPS:\n\t\tGo to page level of selection - KEYBOARD SHORTCUT: Alt+Shift+G\n\t\t\n ------------------------------------------------------------------------\n \n\tSELECTION:\n\t\tLock|Unlock selection toggle - KEYBOARD SHORTCUT: Shift+Space\n\t\t\n ------------------------------------------------------------------------\n \n\tRIGHT SIDEBAR:\n\t\tAuto expand page settings\n\t\t\n ------------------------------------------------------------------------\n \n\tORG CHART:\n\t\tON IMPORT - skip next steps, import directly after set of data\n\t\tFLOATING SETTINGS DIALOG: set 'Clean up layout' and close dialog\n\t\t\n==================================================================================================================================*/\n\n\n/* ================================================================================================================================== */\n/*\tDATA LINKING:\n/* ================================================================================================================================== */\n/** 'Keep or replace field' dialog - Click on 'Keep both' after double click on dialog\n *\n */\n$(document).on('dblclick',$('#prompt-dialog-no-button').closest('.dialog-wrapper'),function(){\n\t/* Submit dialog */\n\t$('#prompt-dialog-no-button').click();\n\tvar last_prop_sel = '.shape-data-list .content table tr:last-of-type .prop-val-name .edit-text-container';\n\tsetTimeout( function(){ \n\t\t$(last_prop_sel).find('span').click(); // click on input\n\t\tvar match_string = (new RegExp(/([^\\d\\s]+)\\d*\\s+\\(.*/gi)).exec($(document).find(last_prop_sel).text()); // E.G: get 'Peoperty' from 'Property (1)'\n\t\t$(document).find(last_prop_sel+' input').val( match_string[1].trim() );\n\t}, 500);\n\n});\n\n\n\n/* ================================================================================================================================== */\n/*\tORG CHART:\n/* ================================================================================================================================== */\n/** IMPORT 'ORG CHART' DATA - skips next \n*/\n$(document).on('click','lucid-org-chart-upload .highlight.footer-button.next-button', function(e) {\n\t//var answer = confirm (\"Skip next steps ?\");\n\t//if (answer)\n\t\tfor(var i=1; i<=4;i++) {\n\t\t\tvar btn_name = i<4?'next':'finish';\n\t\t\t$('.highlight.footer-button.'+btn_name+'-button').click();\t\t\n\t\t}\n});\n\n\n/** SETTINGS DIALOG On middle click in 'Org chart options floating dialog'\n*/\n$(document).on('mousedown','.dock-panel.double.context-panel', function(e) {\n    //if (e.which === 1)\n\t\t//setWindowTitle();\n    if (e.which === 2){\n\t\t/* Cleanup layout */\n\t\t$('.dock-panel.double.context-panel .button.btn-block').click();\n\t\t/* Uncheck 'Role' checkbox */\n\t\t$('.dock-panel.double.context-panel td[title=\"Role\"]+td+td input').click();\n\t\tsetTimeout( function(){ \n\t\t\t/* Close dialog */\t\t\n\t\t\t$('.dock-panel.double.context-panel .panel-close').click();\n\t\t}, 100);\n\t}\n});\n\n\n/* ================================================================================================================================== */\n/*\tFLOATING DIALOGS:\n/* ================================================================================================================================== */\n\n/* Dialogs positions\n *\n */\nvar dialog_align = 'right'; // set dialog position by top left OF top right corner\n/* dialog positions [x,y] iIF x==0 then dialog align to side of working area */\nvar dialog_positons={\n\t\"Shape Options\":\t[-5, 100],\n\t\"Fill Color\":\t[-5, 318],\n\t\"Line Options\":\t[-5, 520],\n\t\"Line Color\":\t[-5, 585],\n\t\"Text Options\":\t[-5, 760],\n\t\"Text Color\":\t[-5, 918],\n\t\"Find & Replace\":\t[-5, 1090],\t\n};\n/* Set popout dialogs positions\n*/\nfunction setDialogPositions(){\n\t/* Set popout dialog header height */\n\t//$('span:contains(\"Line Options\")').closest('lucid-callout.pinned').css('border','1px solid red').css('width','96px !important');\t// set same width\n\t//$('span:contains(\"Fill Color\")').closest('lucid-callout.pinned').css('z-index','998');\t// adjust z-index for expanded area\n\t//$('span:contains(\"Shape Options\")').closest('lucid-callout.pinned').css('z-index','999');\t// adjust z-index for expanded area\n\n\tvar dialog_positons_keys = Object.keys(dialog_positons);\n\tvar offset_left\t= $('.toolbox-container').width() + 16;\n\tvar offset_right\t= window.innerWidth - ( $('.toggle-panel:not(.open)').length ? 52 : 302 );\n\t\n\t\n\tfor(p=0; p<dialog_positons_keys.length;p++) {\n\t\tvar header_text\t= dialog_positons_keys[p];\n\t\t\n\t\t/* GET DIALOG */\n\t\tvar dialog\t= header_text!=\"Find & Replace\" ? $('span:contains(\"'+header_text+'\")').closest('lucid-callout.pinned') : $('lucid-floating-dialog');\n\t\t\n\t\tvar pos_x\t= dialog_positons[header_text][0];\n\t\t/* GET POSITION X */\n\t\t//var pos_x\t= pos_x==0 ? (dialog_align!=='right'? offset_left: offset_right - dialog.width()) : pos_x;\n\t\tvar pos_x_offseted\t= dialog_align!=='right'? offset_left + pos_x : offset_right - dialog.width() - pos_x;\t\t\n\t\t\n\t\tdialog.attr('vil-stylish',header_text.toLowerCase().replace(/&/,' ').replace(/\\s+/,'-')) // attribute for styling via stylish \n\t\t\t.css('left',pos_x_offseted)\n\t\t\t.css('top', dialog_positons[header_text][1]);\n\t}\n\t\n}\n/** shapesSideBarToggle\n*/\nfunction shapesSideBarToggle(){\n\t//alert( \"shapesSideBarToggle\" );\n\t//$('lucid-left-panel').css('min-width','0');\n\tvar width_current\t= parseInt($('lucid-left-panel').css('width'));\n\tvar width_new\t= width_current > 135 ? 135\t: 500;\n\tvar display\t= width_current > 135 ? 'none'\t: 'block';\n\t\n\t$('lucid-left-panel').css('min-width',width_new+'px');\n\t$('#shapes-header-manage-shape-libraries >span:not(.arrow-container)').css('display', display);\n\t\n}\n\n/* Auto pin popout dialog for \"Text Color\", \"Text Options\", \"Shape Options\", \"Fill Color\", \"Line Color\" \n */\nif (document.addEventListener) {\n\tdocument.addEventListener(\"click\", function(event) {\n\t\tvar targetElement = event.target || event.srcElement;\n\t\t// console.log(targetElement);\n\t\t//  $(targetElement).closest('.click-icon').css('border','1px solid red')\n\t\tif ($(targetElement).closest('lucid-simple-color-picker, #option-text-options, #option-shape-callout, #option-line-options').length > 0) {\n\t\t\t//console.log(targetElement);\n\t\t\t$(targetElement).closest('.click-icon');\n\t\t\t\t//.css('border', '1px solid red')\n\t\t\tsetTimeout(function() {\n\t\t\t\t$('.pin-container .pin-icon')[0].click();\n\t\t\t\tsetDialogPositions();\n\t\t\t}, 500);\n\t\t}\n\t});\n}\n\n/* ================================================================================================================================== */\n/*\tSELECTION:\n/* ================================================================================================================================== */\n\n/** Lock\\Unlock Selection\n*/\nfunction selectionLockToggle(){\n\t$('#option-lock-button lucid-icon').click();\n}\n\n/* ================================================================================================================================== */\n/*\tMAINS TOOLBAR:\n/* ================================================================================================================================== */\n/**\n *\n */\nfunction addVilButtons(){\n\t\n\tvar document_state = window.location.href.match(/\\/edit\\//gi)?'edit':'view';\n\t\t\t\t\t\t\t\t\t\t\t\t\n\tvar links_menu_bar = {\n\t\t'view-edit-document':\t[window.location.href.replace(/\\/(?:edit|view)/gi, '/'+(document_state=='edit'?'view':'edit')),\t(document_state=='edit'?'View':'Edit')+' Document',\tdocument_state=='edit'?'https://cdn0.iconfinder.com/data/icons/office-fill/100/document-EYE-128.png':'https://freeiconshop.com/wp-content/uploads/edd/document-edit-solid.png'],\n\t\t//////'google-drive-lucid-folder':\t['https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2Vl9wdjVKTUhGM2c',\t'Open GoogleDrive\\\\Documents\\\\Lucidchart',\t'https://lh3.googleusercontent.com/OscWUyHwrZ50CaatnNWE45UxaSBKX1gfyKg4W7hJRA0LoGeYg3uPrifEhPA6PEd54C8b0hL6=w128-h128-e365'],\n\t\t'lucidchart-search':\t['https://www.lucidchart.com/documents#docs?folder_id=search&browser=list&sort=name-desc&document_search=',\t'Lucidchart Search Current Document',\t'https://lh3.googleusercontent.com/OscWUyHwrZ50CaatnNWE45UxaSBKX1gfyKg4W7hJRA0LoGeYg3uPrifEhPA6PEd54C8b0hL6=w128-h128-e365'],\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t'google-drive-documents':\t['https://drive.google.com/drive/u/0/folders/0B_tdJXayFOj2MGpETF9zdmVuY0E',\t'Open GoogleDrive\\\\Documents Folder',\t'https://cdn1.iconfinder.com/data/icons/logotypes/32/google-drive-128.png'],\n\t\t'google-drive-find-current-doc':\t['https://drive.google.com/drive/u/0/search?q=',\t'Find current document on GoogleDrive',\t'http://icons.veryicon.com/png/System/Google%20JFK/search%20pointer.png'],\n\t};\n\t\t\t\t\t\t\n\n\n\t/* Wide\\Narrow sidebar toggle */\n\t$('#shapes-header-search').after('<div _ngcontent-c14 class=\"item vil-btn\" id=\"shapes-sidebar-toggle\"><img class=\"vil-icon\" title=\"Shapes Sidebar - Wide &#92; Narrow\" src=\"http://cdn.mysitemyway.com/icons-watermarks/simple-black/layouts-outline/layouts-outline_header-left-sidebar/layouts-outline_header-left-sidebar_simple-black_128x128.png\"></img></div>');\n\t\n\t/* Main bar icons (before \"saved\" label) */\n\t$('lucid-menu-bar').append(\n\t\t'<span class=\"vil-bar-separator\"></span>' +\n\t\t'<div _ngcontent-c64 class=\"item vil-btn\" id=\"set-dialogs-positions\"><img class=\"vil-icon\" title=\"Set Floating Dialogs Positions\" src=\"http://www.uidownload.com/files/350/28/39/open-website-window-with-arrow-to-the-left-icon.png\"></img></div>'+\n\t\t\n\t\t($.map( links_menu_bar, function( data, id ) {\n\t\t\treturn '<a _ngcontent-c64 href=\"'+data[0]+'\" class=\"item vil-link\" id=\"'+id+'\" target=\"_blank\"><img class=\"vil-icon\" title=\"'+data[1]+'\"\tsrc=\"'+data[2]+'\"></img></a>';\n\t\t})).join()\n\t);\n\t\n\t\n\t/* Links to lucidchart files\n\t\tvar library_files = {\n\t\t\t'link/tofile/without/sheet/id':[\n\t\t\t\t[ 'link-id', 'link title', 'link-icon' ] // index is sheet number\n\t\t\t]\n\t\t}\n\t*/\n\tvar library_files = {\n\t\t'https://www.lucidchart.com/documents/edit/ace0c491-88f3-48bc-9e1d-6b782037f97d':[\n\t\t\t['library-loops',\t'LIBRARY LINK - Shape Groups: Loops',\t'https://image.flaticon.com/icons/png/128/380/380021.png' ],\n\t\t\t['library-filetree',\t'LIBRARY LINK - Shape Groups: FileTrees',\t'https://image.flaticon.com/icons/svg/106/106917.svg' ],\t\t\t\n\t\t\t['library-files',\t'LIBRARY LINK - Shape Groups: Files',\t'https://image.flaticon.com/icons/svg/509/509605.svg' ],\t\t\t\n\t\t\t\n\t\t],\n\t\t'https://www.lucidchart.com/documents/edit/e919df98-4665-42d4-9531-3f79678dd7c5':[\n\t\t\t['library-custom-shapes',\t'LIBRARY LINK - Custom Shapes',\t'https://image.flaticon.com/icons/svg/109/109724.svg' ],\n\t\t]\n\t};\n\t$('lucid-menu-bar').append(\n\t\t($.map( library_files, function( pages, link ) {\n\t\t\treturn '<span class=\"vil-bar-separator\"></span>' + ($.map( pages, function( data, i ) {\n\t\t\t\treturn '<a _ngcontent-c64 href=\"'+link+'/'+i+'\" class=\"item vil-link\" id=\"'+data[0]+'\" target=\"_blank\"><img class=\"vil-icon\" title=\"'+data[1]+'\"\tsrc=\"'+data[2]+'\"></img></a>';\n\t\t\t})).join();\n\t\t})).join()\n\t);\n\t\n\t/* Options bar icons */\t\n\t$('lucid-more-options .more-button').after(\n\t\t/* GROUPS: Go to page level */\n\t\t'<div _ngcontent-c64 class=\"item vil-btn\" id=\"go-to-page-level\"><img class=\"vil-icon\" title=\"Go to page Level (Alt+Shift+G) - Close group (Alt+G)\" src=\"https://image.flaticon.com/icons/svg/335/335609.svg\"></img></div>'+\n\t\t/* Lock | Unlock selection toggle */\n\t\t'<div _ngcontent-c64 class=\"item vil-btn\" id=\"lock-toggle\"><img class=\"vil-icon\" title=\"Lock\\\\Unlock (Shift+Space)\" src=\"https://image.flaticon.com/icons/png/512/166/166238.png\"></img></div>'\t\t\t\t\n\t);\n\t\t\n\n}\n\n\n\n/* ================================================================================================================================== */\n/*\t SHAPE POSITION:\n/* ================================================================================================================================== */\n\nvar selectors_shape = '#position-options-width-spinner, #position-options-height-spinner, #position-options-x-position-spinner, #position-options-y-position-spinner, #position-options-rotation-spinner';\n\n/**\n *\n */\nfunction inputAllCheckValue(){\n\t//console.log('inputAllCheckValue()');\n\t$(selectors_shape).find('input').each(function(){\n\t\tshapePositionCheckValue($(this)); \n\t});\n}\n\n/** Colorize Shape otions input values by value\n *\n */\nfunction shapePositionCheckValue(input){\n\t//console.log('shapePositionCheckValue()');\n\t//var round = input.closest('#position-options-rotation-spinner').length ? 5 : 25; // round position OR rotation\n\t//var value\t= parseInt(input.val()) / round;\n\t//var color\t= parseInt(value) === value  ?'':'#D0691C';\n\t\n\tvar color\t= 'red';\n\tvar round_5\t= parseInt(input.val()) / 5;\n\tvar round_25\t= parseInt(input.val()) / 25;\t\n\t\n\n\tif(parseInt(round_25) === round_25)\n\t\tcolor\t= '';\n\telse if(parseInt(round_5) === round_5)\n\t\tcolor\t= 'orange';\t\t\n\tinput.css('color',color);\n\t\n}\n\n/** onShapeSelected\n*/\nfunction onShapeSelected(event){\n\tsetTimeout(function(){\n\t\t\n\t\tvar spinner = $(event.target).closest('lucid-spinner');\n\t\t/* If position spinner */\n\t\tif ( spinner.closest('lucid-position-options').length )\n\t\t\t\tshapePositionCheckValue(spinner.find('input'));\n\t\telse if ( $('#position-options-width-spinner>div').hasClass('disabled')!==true){ // if shape is selected\n\t\t\t/* If clicked  element is not in bars and dialogs */\n\t\t\tif($(event.target).closest('#editor-title-bar, .right-panel-container, .chart-option-bar, lucid-callout').length === 0)\n\t\t\t\tinputAllCheckValue();\n\t\t}\n\t}, 100);\n\t\n}\n\n\n\n/* ================================================================================================================================== */\n/*\tRIGHT SIDEBAR:\n/* ================================================================================================================================== */\n\n/** Expand page settings on right sidebar\n*/\nfunction expandPageSettings(){\n\t$('#settings-panel lucid-collapse-header.collapsed').click();\n\tcheckPageSettings();\n}\n\n/** check Page Settings and colorize uncommon settings\n * 1) check if units are \"pixels\"\n * 2) check grid size\n*/\nfunction checkPageSettings(){\n\t/* PAGE UNITS SETTING Mark RED if 'px' units not set */\n\t$('#page-settings-page-units-dropdown .text:not(:contains(\"px\"))').css('background-color','red');\n\t/* PAGE GRIDSETTING Mark RED if '25 px' not set */\t\n\tif ($('.grid-spacing-spinner input').val()!='25 px')$('.grid-spacing-spinner input').css('background-color','red');\n}\n\n\n\n/* ================================================================================================================================== */\n/*\tBREADCUMS:\n/* ================================================================================================================================== */\n\n/** breadcumsEditClass\n*/\nfunction breadcumsEditClass(breadcums,breadcums_data){\n\t$(breadcums).each(function(index){\n\t\t//console.log(index)\n\t\tvar class_val = breadcums_data[index];\n\t\tif(typeof class_val!=='undefined'){\n\t\t\t$(this).removeClass('bc-set bc-group bc-shape');\n\t\t\t$(this).addClass(class_val).html(class_val.replace('bc-',''));\n\t\t}\n\t});\n}\n\n/** breadcumsSetNamedGroups\n*/\nfunction breadcumsSetNamedGroups(){\n\t\n\tvar groups_count\t= $('.groupNav-container span:contains(\"Group\")').length;\n\tvar breadcums_data\t= $('lucid-focus-breadcrumb').data('breadcrumbs-store');\n\n\tvar time_count = typeof breadcums_data !='undefined' && (breadcums_data.length > groups_count) ? 100 : 150;\n\t\n\tsetTimeout( function(){ \n\t\n\t\tvar groups_count\t= $('.groupNav-container span:contains(\"Group\")').length;\n\t\tvar breadcums_cont\t= $('lucid-focus-breadcrumb .container');\n\t\tvar breadcums_all\t= breadcums_cont.find('.breadcrumb'); // not page element\n\t\tvar breadcums\t= breadcums_cont.find('.breadcrumb:gt('+(breadcums_all.length - groups_count-1)+')'); // select group element after \"page\" AND \"layer\"\n\t\tvar breadcums_length\t= breadcums.length;\n\t\t//var breadcums_data\t= $('lucid-focus-breadcrumb').data('breadcrumbs-store');\n\t\tvar breadcums_classes\t= [ 'bc-set','bc-group','bc-shape'];\t\n\t\n\t\tif( typeof breadcums_data =='undefined' || breadcums_all.length === 0 )\n\t\t\tbreadcums_data = [];\n\t\t\t//console.log('BREADCUMS RESET');\n\t\tif(breadcums_length > 0 ){\n\t\t\t//console.log('GROUP SELECTED');\n\t\t\tvar shape_selected\t= $('#option-line-options>div').hasClass('disabled') && $('#option-action-button>div').hasClass('disabled')===false;\n\t\t\t//console.log('shape_selected='+shape_selected);\n\t\t\t\n\t\t\t//if( breadcums_length != breadcums_data.length ){\n\t\t\t\tconsole.log('GROUP EDITED '+breadcums_length +' > ' +  breadcums_data.length);\n\t\t\t\tconsole.log( 'breadcums_data IN =\\n'+JSON.stringify(breadcums_data , null, 2) );\n\t\t\t\t\n\t\t\t\tif(!shape_selected && breadcums_classes.length > breadcums_length)\n\t\t\t\t\tbreadcums_classes.splice(-1);\n\t\n\t\t\t\tbreadcums_data = breadcums_classes.slice(breadcums.length*-1);\n\t\t\t\tconsole.log( 'breadcums_data OUT =\\n'+JSON.stringify(breadcums_data , null, 2) );\t\t\t\n\t\t\t//}\n\t\t\tbreadcumsEditClass(breadcums,breadcums_data);\n\t\t}\n\t\t$('lucid-focus-breadcrumb').data('breadcrumbs-store',breadcums_data);\n\t\t\n\t}, time_count);\n}\n\n\n\n/* ================================================================================================================================== */\n/*\t\tGROUPS: \n/* ================================================================================================================================== */\n/** Go to page level of selection\n * Function clicks on breadcum 'PAGE'\n*/\nfunction breadcumsClick(index){\n\tif (index<0)\n\t\tindex = $('.breadcrumb').length + index;\n\t$('.breadcrumb:eq('+index+')').click();\n}\n\n\n\n/* ================================================================================================================================== */\n/*\tEVENTS \n/* ================================================================================================================================== */\n\n/**\n */\n$( document ).ready(function() {\n\t\n\t/* add vil buttons */\t\n\taddVilButtons();\t\n\t\n\t/* ON CLICK - ON RIGHT SIDEBAR OPEN - by one of icon */\n\t$( \".tabs-container .tabs li\" ).on( \"click\", function(){\n\t\tsetDialogPositions();\n\t}); \n\n\t/* ON CLICK - Page settings - */\n\t$( \"lucid-right-panel .toggle-panel:not(.open) + #settings-tab-button\" ).on( \"click\", function() {\n\t\texpandPageSettings();\n\t});\n\n\t/* ON INIT - EXPAND Right Sidebar on Page settings IF \"Blank Diagram\" ELSE Lyers sections*/\n\t$('#document_title span').html() == \"Blank Diagram\" ? $(\"#settings-tab-button\").click() : $('#layers-tab-button').click();\n\texpandPageSettings();\n\t\n\t/* set dialogs */\n\tsetDialogPositions();\n\n\t\n\t/* ON INIT - COLORIZE INPUT VALUES */\n\tinputAllCheckValue();\n\n\t/* ON MOUSEUP - Check on value changed */\t\n\t$(document).mouseup(function(event) {\n\t\tonShapeSelected(event);\n\t});\n\t/* ON MOUSEUP - Check on value changed */\t\n\t$(document).mouseup(function(event) {\n\t\t\tbreadcumsSetNamedGroups();\n\t});\n\t/*\n\t\tON DOCUMENT SEARCH PAGE\n\t\thttps://www.lucidchart.com/documents#docs?folder_id=search&browser=list&sort=name-desc&document_search=Test\n\t */\n\tvar search_document =  /document_search=(.*)/gi.exec( window.location.href);\n\tif(search_document)\n\t\t$('#search-text').val(search_document[1]).focus();\n\t\n\t/*\n\t * KEYPRESS EVENTS http://www.epigroove.com/blog/check-for-modifier-keys-when-using-jquerys-keypress\n\t **/\n\t$(document).keydown(function(e) {\n\t\t//e.preventDefault(); \n\t\tif ( e.which == 71) { // 'G'\n\t\t    //e.preventDefault(); \n\t\t\tif (e.altKey && e.shiftKey   ) {\n\t\t\t\t//console.log('Alt+SHIFT+G');\n\t\t\t\tbreadcumsClick(0);\n\t\t\t\tbreadcumsSetNamedGroups();\n\t\t\t} else if (e.altKey) {\n\t\t\t\t//console.log('Alt+G');\n\t\t\t\tbreadcumsClick(-2);\n\t\t\t\tbreadcumsSetNamedGroups();\n\t\t\t}\n\t\t} else if ( e.which == 32 ) { //'space'\n\t\t    //e.preventDefault(); \n\t\t\tif (e.shiftKey )\n\t\t\t\tselectionLockToggle();\n\t\t} else if ( e.which == 70 ) { //'f'\n\t\t    //e.preventDefault(); \n\t\t\tif (e.ctrlKey  )\n\t\t\t\tsetDialogPositions(); // set dialog positions, \"Find & Replace\" dialog does not show sometimes\n\t\t}\n\t});\n});\n\n/* Reposition dialogs on Window resize */\n$(window).resize(function() {\n\tsetDialogPositions();\n});\n\n\n/* ================================================================================================================================== */\n/*\tEVENTS - CUSTOM BUTTONS\n/* ================================================================================================================================== */\n\n$( document ).ready(function() {\n\n\t$( \".vil-btn\" ).on( \"click\", function() {\n\t\tvar id = $(this).attr('id');\n\t\tif (id=='set-dialogs-positions')\n\t\t\tsetDialogPositions();\n\t\telse if (id=='shapes-sidebar-toggle')\n\t\t\tshapesSideBarToggle();\n\t\telse if (id=='go-to-page-level')\n\t\t\tbreadcumsClick(0);\n\t\t\t\n\t});\n\t\n\t$( \".vil-link\" ).on( \"click\", function(e) {\n\t\tvar id = $(this).attr('id');\n\t\tif (id=='lucidchart-search'||id=='google-drive-find-current-doc'){\n\t\t\te.preventDefault();\n\t\t\t window.open($(this).attr('href')+$('#document_title span').html());\n\t\t} else if (id=='view-edit-document'){\n\t\t\te.preventDefault();\n\t\t\t window.open( $(this).attr('href').replace( /\\d+#*$/, $('.page-tab.selected').index()) );\n\t\t}\n\n\t\t\n\t\t\n\t});\t\n});\n\n\n","autostart":true,"css":"#prompt-dialog-no-button:after{\n  content:'Double click on dialog for keepboth';\n  display:block;\n  position:absolute;\n  top: 32px;\n  left: 12px;\n  color:red;\n\n  \n}","sfile":"jquery.js"}
#www.n2yo.com#
{"script":"$('#oauth2relay534106018').before('test')","autostart":false,"css":"","sfile":"jquery.js"}
#www.youtube.com#
{"script":"/* Move 'Watch later' section to first position */\nvar watch_later = $('.branded-page-module-title-text:contains(\"Watch Later\")').closest('.item-section').parent();\n\t\t\t\nwatch_later.css('border','1px solid #947e55')\n\t\t\t\nif(watch_later.index()>0)\n\twatch_later.prependTo(\".section-list>li:first-child\");","autostart":true,"css":"","sfile":"jquery.js"}