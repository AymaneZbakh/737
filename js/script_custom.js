//$(function() {
//    $( "#tabs1, #tabs2" ).tabs();
//});


 $("ul.book-dropdown > li").click(function() {
     var scrollToNumber = $(this).attr("class").split('-');
     var scrollToName = "#to"+scrollToNumber[2];
//     alert($('#Limitations .scrollable').scrollTop());
    // alert($(scrollToName).parent().parent().attr('class'));
    $('#Limitations > .scrollable').animate({
        scrollTop: $(scrollToName).position().top},
        'slow');
    });


/** continue button - show MENU **/
	$('#welcome-button').on('click', function() {
		$('.left-menu').show();
		$('.left-menu').animate({'left' : "0px" //moves right
		},800);			
	});

