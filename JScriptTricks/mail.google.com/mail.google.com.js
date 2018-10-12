/*======================================================================================*/
/*                                                                                      */
/*======================================================================================*/
$(document).keypress(function(e) {
    	e.preventDefault();
	if(e.ctrlKey && e.which == 13) {
        //alert('You pressed enter!');
		confirmSend();
    }
});


/** confirmSend
*/
function confirmSend(){
	var answer = confirm ("Send email ?");
	if (answer){
		
	}
}
