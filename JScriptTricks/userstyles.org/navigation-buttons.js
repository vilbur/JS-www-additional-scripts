
/*-----------------------------------------------------------------------------------*/
/*     Add View\Edit script button                                                   */
/*-----------------------------------------------------------------------------------*/
if (window.location.href.match(/.*styles\/(\d+)\/.*/gi)){
	$('#create_new_style').after('<div class="header_button cjs-style-view"><a href="#">'+(window.location.href.match(/\/edit/gi)?'View style':'Edit style')+'</a></div>'	)
	

}

$('#create_new_style').after('<div class="header_button cjs-style-view"><a href="https://userstyles.org/users/435083">All Styles</a></div>'	)

/* ADD LOGOUT BUTTON */
$('.loggedIn').closest('#account').after('<div class="header_button"><a href="/logout">Logout</a></div>'	)

$(document).on('click','.cjs-style-view a', function(e){
		e.preventDefault();
		var url	= window.location.href;		
		var match_url = /.*styles\/(\d+)\/.*/gi.exec(url);
		window.location.href = url.match(/\/edit/gi) ? url.replace(/\/edit/gi, '') : 'https://userstyles.org/styles/'+match_url.pop()+'/edit'
});

