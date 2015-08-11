// @codekit-prepend '_plugins/jquery.js'

// @codekit-prepend '_plugins/jquery-cache.js'

// @codekit-prepend '_plugins/fastclick.js'

// @codekit-prepend '_plugins/css_browser_selectors.js'

// @codekit-prepend '_plugins/is.min.js'

// @codekit-prepend '_parts-global/_helpers.js'



$window = $$(window);

var	$this,
	isMobileWidth = window.innerWidth <= 736,
	isMobile = $$('html').hasClass('mobile')
;




// @codekit-prepend '_parts-global/_form/form-engine.js'
// @codekit-append '_parts-global/header.js'

$$('form').each(function(){
	var $this = jQuery(this);
	new Form($this);
});	




(function(){
	var setFaqHeight = function(){
		$$('.cta-support-faq-list-item').each(function(){
			var $this = jQuery(this),
				contentHeight = $this.find('.cta-support-faq-list-item-content').height() + 50;
			
			$this.css('height', contentHeight);
			log('height was set');
		});	
	};

	$window.on('resize', util.debounce(setFaqHeight, 250));

	$$('.cta-support-faq-list-item').each(function(){
		var $this = jQuery(this);
		$this.css('height', $this.height())
					.addClass('closed');

		$this.data('closed', true);
	});	

	$$('.cta-support-faq-list-item').on('click touchstart', function(){
		var $this = jQuery(this),
			closed = $this.data('closed');
		
		if (closed) {
			$this.removeClass('closed')
					.siblings().addClass('closed').removeClass('show')
												  .data('closed', true);

			setTimeout(function(){
				$this.addClass('show')
			}, 100);

		} else {
			$this.addClass('closed').removeClass('show');
		}

		$this.data('closed', !closed);

	});
})();


