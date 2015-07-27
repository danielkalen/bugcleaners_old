(function($){

	var $popup_overlay = '<div class="popup-overlay"></div>';
	var $popup = '<div class="popup"><div class="popup-close"></div><div class="popup-content"></div></div>';
	$$('body').prepend($popup_overlay + $popup);	
	$$('.popup-close, .popup-overlay').click(function(){
		$.fn.popup('close');
	});

	var popOpen = false,
		productCache = [],
		firstOpen = true;

	$.fn.popup = function($arg, $url, $product_id) {
		var quick = false;
		var close = false;
		
		if ( $arg === "quick" ) { // Quick View popup
			var quick = true;
		} 
		if ( $arg === "close" ) {
			var close = true;
		} 


		if (close && popOpen) {

			$$('.popup, .popup-overlay').removeClass('show quick');
			$$("body").removeClass('opened-popup');
			popOpen = false;
			firstOpen = false;

			$window.off('keydown.popup_close');
		}

		if ( popOpen === false ) {
			
			if (quick) {
				$$('body').addClass('opened-popup');
				$$('.popup, .popup-overlay').addClass('show quick');

				if ( productCache[$product_id] !== undefined ) {
					if ( $$('.popup-content').find('.product-' + $product_id.toString()).length ) {
						// return
					} else {
						$$('.popup-content').html( productCache[$product_id] );
					}
				} else {
					$$('.popup-content').html('<div class="popup-content-loading"></div>');
					$$('.popup-content').load($url + ' .single-product-content', function(){
						$$('.popup-content-loading').remove();
						productCache[$product_id] = $$('.popup-content').html();
					});
				}
				// $('.popup-content').empty().append(response);
				popOpen = true;

				$window.on('keydown.popup_close', function(e){
					if ( e.keyCode === 27 ) {
						$.fn.popup('close');
					}
				});
			}

		}

	}

}(jQuery))