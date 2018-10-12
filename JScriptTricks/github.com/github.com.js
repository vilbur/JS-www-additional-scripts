/** sort GitHUb repositories list by alphabet order
* 
*/
function sortRepositoriesByName(){
  $(function() {
      $.fn.sortList = function() {
        var mylist = $(this);
        var listitems = $('li a', mylist).get();
        listitems.sort(function(a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            return (compA < compB) ? -1 : 1;
        });
        $.each(listitems, function(i, itm) {
            mylist.append(itm.closest('li'));
        });
     };
  
      $("#user-repositories-list ul").sortList();
  
  });      
        

}
$( document ).ready(function() {
	setTimeout( function(){
		if (window.location.href.match(/https:\/\/github.com\/[^\?]+\?tab=repositories/gi) )
			sortRepositoriesByName();		
	}, 500);
	
});
