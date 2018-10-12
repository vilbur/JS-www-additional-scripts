/*
	SCRIPT FOR BOOKMARKLET LINK:
	Open tabs of styles by its style_ids, every type has 2 versions, production and development
	All styles page: https://userstyles.org/users/435083
	

	var object styles {'Style-name': ['style_id','style_id_development']}
	
	var string pages	open 'view', 'edit' or both 'view|edit'
	var string type of page 'prod', 'dev' or both 'prod|dev''
 
	Combinations of var pages='view|edit' & var type='prod|dev' points to one or all of followed links
		https://userstyles.org/styles/143095
		https://userstyles.org/styles/143095/edit
		https://userstyles.org/styles/143337
		https://userstyles.org/styles/143337/edit

 */

javascript:

(function(){
	var type='prod|dev',pages='view|edit',
	styles = {
		'Google Search':	[143095,143337],
		'JIRA VilPro':	[143179,143341],
		'Stylish VilPro':	[143699,143348],
		'Stylish VilPro-Preset':	[143566,143414],
		'Planespotting VilPro':	[143336],
		//'TEST':	[143342],	
	};	

	var url_all = [];
	var styles_keys = Object.keys(styles);
	for(s=0; s<styles_keys.length;s++) {
		var style_name	= styles_keys[s];
		var style_ids	= styles[styles_keys[s]];

		if(type=='prod')	style_ids=[style_ids[0]];
		else if(type=='dev')	style_ids=[style_ids[1]];
		
		for(var i=0; i<style_ids.length;i++) {

			var url_view	= typeof style_ids[i] !== 'undefined'? 'https://userstyles.org/styles/'+style_ids[i] : null;
			var url_edit	= url_view? url_view+'/edit' : null;
			var urls_style	= pages==='view|edit'? [url_view,url_edit] : (pages==='view'? [url_view] : [url_edit] );
			console.log( style_name+' urls_style=\n'+urls_style )
			
			for(var u=0; u<urls_style.length;u++) {
				url_all.push(urls_style[u])
			}
		}
	}
	/* OPEN FIRST TAB AS NORMAL TAB - MAKE LINKS WORK IN SIDEBAR EXTENSION */	
	window.location.replace(url_all.shift());
	url_all.map(function(url){window.open(url);});	
	
})();