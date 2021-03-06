
/* Move 'Watch later' section to first position */
function moveWatchLaterTop()
{
	var watch_later = $('.branded-page-module-title-text:contains("Watch Later")').closest('.item-section').parent();
	if(watch_later.index()>0)
		watch_later.prependTo(".section-list>li:first-child");
}

/* Try remove watched videos
 *	run function n times in interval
 */
function removeWatchedVideos()
{
	if( typeof window.interval_remove_watched_videos !== 'undefined'  )
		window.clearInterval(interval_remove_watched_videos);

	var n = 0;
	window.interval_remove_watched_videos = setInterval(function ()
	{
		$('yt-formatted-string:contains("WATCHED")').closest("ytd-grid-video-renderer").remove();

		console.log( 'JS Tricks Chrome extension | Wathched videos removed' );
		if (++n === 100)
			window.clearInterval(interval_remove_watched_videos);
	}, 2000);
}

/** Sort youtube playlists by alphabet
 * 
 */
function sortListItems(event)
{
	console.log( 'JS Tricks Chrome extension | Plailist has been sorted with' );
	/** getIds
	 */
	var getIds = function(label=false)
	{
		return list_ids.map(function(id){
			return playlists[id].listitem + ( label!==false ? ' '+playlists[id].label : '');
		}).join(','); 
	}; 
	
	$(function()
	{
		$.fn.sortList = function()
		{			
			var mylist = $(this);
			var listitems = $( event.data.listitem +' '+event.data.label , mylist).get();
			//var listitems = $( getIds('label') ).get();
	
			listitems.sort(function(a, b) {
				var compA = $(a).text().toUpperCase();
				var compB = $(b).text().toUpperCase();
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(i, item) {
				mylist.append(item.closest(event.data.listitem));
			});
		};
		setTimeout( function(){
			$(event.data.list).sortList();			
		}, 1000);
	});      
}
/** Bind events to buttons which shows playlists
 */
var bindSortListItems = function(event=null)
{
	
	var playlists =
	{
		'#button[aria-label="Save"]':	{list:'#playlists',	listitem:'ytd-playlist-add-to-option-renderer',	label:'#label'},
		'#expander-item a#endpoint':	{list:'#expandable-items',	listitem:'ytd-guide-entry-renderer',	label:'a'},
	};
	
	/** bindEventToPlaylist
	 */
	var bindEventToPlaylist = function(id)
	{
		setTimeout( function(){
			$(id).css('color', 'orange').on('click',  playlists[id], sortListItems);
		}, 500);
		
	};
	
	if( event  )
		bindEventToPlaylist(event.data.id );
	else
		Object.keys(playlists).map(function(id)
		{
			bindEventToPlaylist(id);
		}); 
}; 
/** Click on side menu button bind child events for expand side menu
 */
var bindEventOnMenuButton = function()
{
	$('#guide-button .yt-icon-button').on('click', {id:'#expander-item a#endpoint'}, bindSortListItems);								
}; 

/*---------------------------------------
	RUN FUNCTIONS 
-----------------------------------------
*/

$( document ).ready(function() {
	moveWatchLaterTop();
	removeWatchedVideos();
   
    setTimeout( function(){
		bindSortListItems();
		bindEventOnMenuButton();
    }, 1000);

});


