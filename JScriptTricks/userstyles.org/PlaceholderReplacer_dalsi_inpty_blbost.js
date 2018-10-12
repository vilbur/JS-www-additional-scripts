/* ====== PlaceholderReplacer.js ======  */

/** PlaceholderReplacer
 */
window.PlaceholderReplacer = (function() {

	/* CONSTRUCT */
	function PlaceholderReplacer(){
		/*--------   PRIVATE PROPERTIES   -------------------------------------------------------------------------------------*/
		console.clear();
		var _this	= this;
		this.iframe = $('#iframe').contents();
		this.settings_list	= iframe.find( "#edit-style-settings" );		
		/*--------   PUBLIC PROPERTIES   --------------------------------------------------------------------------------------*/
		
		/*--------   PROTOTYPE PROPERTIES   -----------------------------------------------------------------------------------*/
		
		/*--------   PUBLIC METHODS   -----------------------------------------------------------------------------------------*/
		/** placeholdersSave
		 */
		this.placeholdersSave = function(){

			var placeholders=[];
			
			this.settings_list.find( ">li:not(:last-of-type)" ).each(function(){
				var placeholder={"_class":$(this).attr('class'),"data":[]};

				if (placeholder._class.match(/edit-(text|color)-setting/gi))
					placeholder.data = getInputsData(this);
				else if (placeholder._class.match(/edit-(dropdown|image)-setting/gi)){
					placeholder.options_count	= $(this).find('.edit-style-options>li:not(.new-option)').length;
					placeholder.data	= getInputsData(this);
				}
				placeholders.push(placeholder);
			});
			
			console.log( 'placeholders=\n'+JSON.stringify( placeholders, null, 2) );
			//setCookie(cname, JSON.stringify( placeholders));
			placeholdersSplitAndSave(placeholders);
			
		};
		/** fromRebuild
		 */
		this.fromRebuild = function(){
			
			formClear();
			
			
			var placeholders	= placeholdersLoadAndJoin();
			console.log( 'placeholders count=\n'+placeholders.length );

			console.log( 'fromRebuild() placeholders=\n'+JSON.stringify( placeholders, null, 2) );
			
			for(var s=0; s<placeholders.length;s++) {
				var placeholder = placeholders[s];
			
				var match_textOrColor	= /edit-(text|color)-setting/gi.exec(placeholder._class);
				var match_dropdownOrImage	= /edit-(dropdown|image)-setting/gi.exec(placeholder._class);				
				
				if (match_textOrColor)
					setData_TextOrColor(match_textOrColor[1]);
				else if(match_dropdownOrImage)
					setData_DropdownOrImage( match_dropdownOrImage[1], placeholder.options_count);
			}
			
			for(var p=0; p<placeholders.length;p++) {
				setData(this.settings_list.find( '>li').eq(p) , placeholders[p].data);
			}
			

		};
		/*--------   PRIVATE METHODS   ----------------------------------------------------------------------------------------*/
		/** formClear
		*/
		function formClear(){
			this.settings_list.find('input[onclick*="removeSetting"]').each(function(){
				$(this).click();
			});
		}	
		
		
		
		/** splitAndSavePlaceholders
		*/
		function placeholdersSplitAndSave(placeholders){
			//setCookie(cname, JSON.stringify( placeholders));
			var i = 0;
			while(placeholders.length) {
				i++;
				setCookie('placeholders-'+i, JSON.stringify( placeholders.splice(0,10) ));				
			}
			setCookie('placeholders-count',i);
		}
		/** splitAndSavePlaceholders
		*/
		function placeholdersLoadAndJoin(){
			var placeholders	= [];
			var count	= parseInt(getCookie('placeholders-count'));

			//var placeholders	= JSON.parse(getCookie(cname));
			var i = 1;
			while(i<=count) {
				//placeholders.push();
				Array.prototype.push.apply(placeholders, JSON.parse(getCookie('placeholders-'+i)));
				
				i++;
				//setCookie('placeholders-'+i, JSON.stringify( placeholders.splice(0,10) ));				
			}
			//setCookie('placeholders-count',i);
			return placeholders;
		}
				

		/**
		 */		
		function getInputsData (element){
			var data = [];
			$(element).find('textarea, input:not([type="button"]):not(:hidden)').each(function(){
				data.push($(this).val());
				console.log( 'placeholder=\n'+ $(this).val() );
			});

			return data;
		}
		function addPlaceholder(type){
			iframe.find('input[value="New '+(type==='dropdown'?'Drop-Down':toCapital(type))+' Setting"]').click();
		}
		/**
		 */		
		function setData_TextOrColor(type){
			addPlaceholder(type);
			//setData(settings_list.find( 'li:last-of-type').prev(), data);
		}
		
		/**
		 */
		function setData_DropdownOrImage(type, options_count){
			//iframe.find('input[value="New Drop-Down Setting"]').click();
			addPlaceholder(type);
			
			var placeholder_el = settings_list.find( 'li:last-of-type').prev();
			var o = type==='dropdown'? 2 : 0; /* Dropdown has 2 option predefined already */
			
			
			 for( o; o<options_count;o++) {
				 placeholder_el.find('input[value="Add Option"]').click();
			 }
			 //setData(placeholder_el, data);
		}
		/**
		 */
		function setData(element, data){
			console.log( 'setData() '+ element.attr('class')+' =\n'+JSON.stringify( data, null, 2) );

			element.find('textarea, input:not([type="button"]):not(:hidden)').each(function(index ){
				$(this).val(data[index]);
			});
		}


		
		/** addButtons
		*/
		function addButtons(){
				$('#header').after('<div class="vil-edit-btns" class="vil-form-btns" style="position:fixed;left:0px;top:68px;">'+
								   '<button class="vil-edit-btn" id="vil-btn-css">Css</button>'+
								   '<button class="vil-edit-btn" id="vil-btn-description">Description</button>'+								   
								   '<button class="vil-edit-btn" id="vil-btn-info">Info</button>'+								   
								   '<button id="vil-btn-placeholders">Placeholders</button>'+
								   '<button id="vil-btn-clear">Clear</button>'+								   
								   '</div>'+
								   '<button id="vil-submit-form" title="Save form" style="width:128px;height:40px;position:fixed;right:0px;top:68px;border: 1px solid #ff890c !important;">SAVE</button>');
		};
		
		/** getInputId
		*/
		function getInputId(input_name){
			switch (input_name) {
				case 'css':	return '#css';
				case 'description':	return '#style_long_description';
				case 'info':	return '#style_additional_info';										
			}
		}
		
		/** bindEvents
		*/
		function bindEvents(){
			/** SAVE PLACEHOLDERS
			 */			
			$(document).on('click','.vil-edit-btn', function(e){
				var input_name = $(this).attr('id').split('-').pop();
				//var answer = confirm ('SAVE '+input_name+' ?');
					if (confirm ('SAVE '+input_name+' ?')){
						if(input_name==='placeholders')
							_this.placeholdersSave('placeholders');
						else
							setCookie('vilpro-'+input_name, _this.iframe.find(getInputId(input_name)).val())
	
					}
			});
			/** LOAD PLACEHOLDERS
			 */
			$(document).on('contextmenu','.vil-edit-btn', function(e){
				e.preventDefault();
				var input_name = $(this).attr('id').split('-').pop();
				//var answer = confirm ('LOAD '+input_name+' ?');
				if (confirm ('LOAD '+input_name+' ?')){
					if(input_name==='placeholders')
						_this.fromRebuild('placeholders');
					else
						_this.iframe.find(getInputId(input_name)).val(getCookie('vilpro-'+input_name))
				}
			});
			/*
			id=""
			id=""
			id="css"
			
			
			/** CLEAR PLACEHOLDERS
			 */
			$(document).on('click','#btn-clear', function(e){
				e.preventDefault();
				//var answer = confirm ("Clear Plaehoders ?");
				//	if (answer){formClear();}
			});
			
			
			
			///**	Save current placeholder on style update
			// */
			$(document).on('click','#vil-submit-form', function(e){
				_this.iframe.find('form').submit();
			});
			
		};
		
		/** COOKIES
		*/
		function setCookie(cname, cvalue, exdays=365) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		};
		
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1);
				};
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				};
			};
			return "";
		};
		/**
		 */
		function toCapital(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
		/*--------   CONSTRUCT METHODS  ---------------------------------------------------------------------------------------*/
		
		addButtons();		
		bindEvents();
		/* Load current placeholder */
		//this.settingsLoad('preset-current-'+$('#style-id').html())
	};
	/*--------   PROTOTYPE METHODS  -------------------------------------------------------------------------------------------*/
	
	/*--------   RETURN THIS CLASS  -------------------------------------------------------------------------------------------*/

	return PlaceholderReplacer;
})();

setTimeout( function(){
	if (window.location.href.match(/https:\/\/userstyles.org\/styles\/\d+\/edit/gi))
			window.PlaceholderReplacer();
}, 2000);

	
	
	
	
	
	
	
	
	
	
	