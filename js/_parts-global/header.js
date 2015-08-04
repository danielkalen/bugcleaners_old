(function(){ // Mobile nav display logic
	$$('.mobile-nav').on('click touchstart', function(){
		var $this = $(this),
			clicked = $this.data('clicked');

		if (!clicked) {
			$$('.mobile-nav-overlay').addClass('show');
		} else {
			$$('.mobile-nav-overlay').removeClass('show');
		}

		$this.data('clicked', !clicked);
	});

	$$('.mobile-nav-close').on('click touchstart', function(event){
		event.stopPropagation();
		
		var clicked = $$('.mobile-nav').data('clicked');

		$$('.mobile-nav-overlay').removeClass('show');
		$$('.mobile-nav').data('clicked', !clicked)
	});
}());


(function(){ // Get Quote button click
	$$('.header-nav-item.button, .hero-button').on('click', function(){
		$$('html, body').animate({scrollTop: $$('#cta').offset().top}, 500);
	});
}());