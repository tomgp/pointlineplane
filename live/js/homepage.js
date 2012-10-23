$(function(){
	console.log("hello zepto");
	var story_more = $('.story_more');
	story_more.addClass('story_more_hidden');
	$.each(story_more, prepend_more_link);


	//functions

	function prepend_more_link(index, item){
		var more_text = $(item);
		var story_id = more_text.parent().attr('id');
		console.log();
		more_text.parent().children('.story_intro').children('p').last().append("<a href='#"+story_id+"' id='link_" + story_id + "' class='more_button'>READ MORE</a>");
		
		$('#link_'+story_id).on('click', more_selected).on('tap', more_selected);
	}

	function more_selected(ev){
		//check the class to see what to do
		var link = $(ev.target);
		link.parent().parent().parent().children('.story_more').toggleClass('story_more_hidden');
		link.toggleClass('more_button').toggleClass('less_button');
		return false;
	}
});

//zepto scroll
// http://maxdegterev.name/experiments/zscroll/static/zepto.scroll.js
;(function($) {
	var interpolate = function (source, target, shift) { 
		return (source + (target - source) * shift); 
	};

	var easing = function (pos) { 
	    return (-Math.cos(pos * Math.PI) / 2) + .5; 
	};

	$.scroll = function(endY, duration, easingF) {
		endY = endY || ($.os.android ? 1 : 0);
		duration = duration || 200;
		(typeof easingF === 'function') && (easing = easingF);

		var startY = window.pageYOffset,
			startT  = Date.now(),
			finishT = startT + duration;

		var animate = function() {
			var now = +(new Date()),
				shift = (now > finishT) ? 1 : (now - startT) / duration;

			window.scrollTo(0, interpolate(startY, endY, easing(shift)));

			(now > finishT) || setTimeout(animate, 15);
		};

		animate();
	};
}(Zepto));
