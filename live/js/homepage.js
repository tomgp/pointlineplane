if(!window.console){
	window.console = {}
	window.console.log = function(s){
		//do nothing, just sticking this in here so we can hopefully avoid trying to do console logs in IE on the more 'work in progress' pages
	}
}
$(function(){
	console.log("hello zepto");
	$('span.more').on('mouseover', showMore).on('mouseout', showLess).on('tap', toggleMore);

	function showMore(e){
		var the_span = $(e.target);
		$('body').prepend("<div class='more_popup'>" + the_span.attr('more') + "</div>");
		//var pos = $(e.target).position();
		the_span.addClass("more_highlight");
		var the_popup_width = $('.more_popup').offset().width;
		var the_popup_height = $('.more_popup').offset().height;
		var view_width = $(window).width();
		var view_height = $(window).height();

		var top_pos = e.clientY + 20;
		var left_pos = e.clientX + 20; 

		if((left_pos + the_popup_width) > view_width){
			left_pos -= ((left_pos + the_popup_width) - view_width);
		} 

		if((top_pos + the_popup_height) > view_height){
			top_pos = top_pos - (40 + the_popup_height);
		}

		$('div.more_popup').css({
			top:top_pos,
			left:left_pos
		});
	}

	function showLess(e){
		console.log("LESS " + e.target);
		$(e.target).removeClass("more_highlight");
		$('div.more_popup').remove();
	}

	function toggleMore(e){
		if($('div.more_popup')){
			showLess();
		}else{
			showMore();
		}
	}
	
	if(typeof init == 'function'){
		console.log('initialise page level JS');
		init(); //if there's an init function run it
	}else{
		console.log('no page level JS');
	}
});