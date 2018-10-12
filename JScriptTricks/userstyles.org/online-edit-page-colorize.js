/*
	COLORIZE BODY OF PRODUCTION VERSION OF STYLE
	ADDE TO CJS EXTENSION for https://userstyles.org/
	Because of prevetion collision with JS Tricks Scripts
*/

if ( window.location.href.match(/.*userstyles.org.*edit/gi) && document.title.match(/.*aDev.*/gi)===null) {
	$('body').css( "background-color", '#ffdbb2' )
}

