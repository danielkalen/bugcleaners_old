addNotice($$('.notice'), true);

$$('.notices').on('click', '.notice-close', function(){
	var $parent = $(this).parent();

	removeNoticeNow($parent);
});


function notify($type, $text, timed){
	var notification = '<div class="notice notice_' + $type + '">
							<div class="notice-text">' + $text + '</div>
							<div class="notice-close"></div>
						</div>';

	$$('.notices').append(notification);
	setTimeout(function(){
		$('.notice').last().addClass('show');
	}, 200);

	if ( timed ) {
		removeNotice($('.notice').last());
	}
}



function addNotice($notice, timed){
	$notice.appendTo('.notices');
	setTimeout(function(){
		$notice.addClass('show');
	}, 200);
	
	if ( timed ) {
		removeNotice($('.notice').last());
	}
}



function removeNotice($notice){
	
	setTimeout(function(){
		removeNoticeNow($notice);
	}, 10000);

}



function removeNoticeNow($notice){
	$notice.removeClass('show');

	setTimeout(function(){
		$notice.remove();
	}, 1000);
}