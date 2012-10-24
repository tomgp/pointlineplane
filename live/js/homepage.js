$(function(){
	console.log("hello zepto");
	var story_more = $('.story_more');
	var content_width = 0;
	story_more.addClass('story_more_hidden');
	$.each(story_more, prepend_more_link);
	sizeHeadings();
	window.onresize = sizeHeadings;

	

	//if the page is wide enough, replace the images with larger ones
	//if the images are small make them clickable to enlarge

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

	function sizeHeadings(){
		var current_width = $('#main_content').width()
		if(content_width != current_width){
			content_width = current_width;
			$('h1.story_title').textFillWidth({ maxFontPixels: 200 });
		}
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

;(function($) {
    $.fn.textFillWidth = function(options) {
    	//check that this whitespace is set to no-wrap otherwise no go!
    	if($(this).css('white-space') == 'nowrap'){

    		var fontSize = options.maxFontPixels;
    		console.log('hello' + ourText);
	        var ourText = $('span', this);
	        var maxWidth = $(this).width();
	        do {
	            ourText.css('font-size', fontSize);
	            textWidth = ourText.width();
	            fontSize = fontSize - 1;
	        } while ( (textWidth > maxWidth) && fontSize > 3);
    	}
        return this;       
    }
})(Zepto);
