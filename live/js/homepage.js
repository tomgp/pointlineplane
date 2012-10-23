$(function(){
	console.log("hello zepto");
	var story_more = $('.story_more');
	story_more.addClass('story_more_hidden');
	$.each(story_more, prepend_more_link);


	//functions

	function prepend_more_link(index, item){
		var collection = $(item);
		var story_id = collection.parent().attr('id');
		collection.before("<a href='#"+story_id+"' id='link_" + story_id + "' class='more_button'>LINK</a>");
		$('#link_'+story_id).on('click', more_link_clicked);
	}

	function more_link_clicked(e){
		//check the class to see what to do
		var link = $(e.target);
		link.parent().children('.story_more').toggleClass('story_more_hidden');
		link.toggleClass('more_button');
		link.toggleClass('less_button');

/*		if(link.hasClass('more_button')){
			link.parent().children('.story_more').removeClass('story_more_hidden');
			link.removeClass('more_button').addClass('less_button');
		}else if(link.hasClass('less_button')){
			link.parent().children('.story_more').addClass('story_more_hidden');
			link.addClass('more_button').removeClass('less_button');
		}*/

		return false;
	}
});