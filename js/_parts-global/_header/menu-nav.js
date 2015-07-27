/* ==========================================================================
   Mega Menu + Menu Bar
   ========================================================================== */


// ==== Mega Menu replacement =================================================================================
$megaMenu = $$('.menu-mega');
$$('#site-navigation').find('.sub-menu').first().replaceWith($megaMenu);


// ==== Menu Bar Links =================================================================================
$$('#menu-main-nav').children('.menu-item')
			.on('click', function(e){
				$this = $(this);
				$href = $this.children('a').attr('href');
				// alert($this.hasClass('menu-item-7255'));

				if (isMobileWidth && $this.hasClass('menu-item-7255')) {
				} else {
					window.location = $href;
				}

			});


// ==== Class Appension to enable hover triggers =================================================================================
$$('#menu-main-nav').children('.menu-item-has-children')
			.addClass('hover-trigger_menu')
			.children('.menu-mega')
				.addClass('hover-box_menu')
				.find('.menu-mega-list-item')
					.addClass('hover-trigger_menu')
					.find('.menu-mega-list-item-level')
					.addClass('hover-box_menu');



// ==== Highlight Woo Pages as current shop items =================================================================================

if ( $$('body').hasClass('woocommerce') || $$('body').hasClass('woocommerce-page') ) {
	$$('#menu-item-208').addClass('current-menu-item');
}




/* ==========================================================================
   Hover / Click display triggers
   ========================================================================== */

if (!isMobileWidth) {

	$$('.hover-trigger_menu').on('mouseenter',function(e){
		$this = $(this);
		$this.addClass('hover');

		showChildMenu($this);
	});


	$$('.hover-trigger_menu').on('mouseleave',function(e){
		// e.stopPropagation();
		$this = $(this);
		$this.removeClass('hover');


		hideChildMenu($this);

		if ( $this.hasClass('menu-item-has-children') ) {
			hideChildMenu($this.find('.hover-trigger_menu'));
		}
	});





} else { // Mobile event triggers

	$$('.hover-trigger_menu').on('click',function(e){
		e.stopPropagation();
		e.preventDefault();
		$this = $(this);
		$this.addClass('hover');
		$$('body').addClass('mobile-menu-open');

		if ($this.hasClass('menu-mega-list-item')) {
			$$('#menu-main-nav').addClass('submenu-open');
		}

		showChildMenu($this);
	});

	$$('.menu-mega-close').on('click', function(e){ // Close click
		e.stopPropagation();
		$this = $(this).parent().parent();
		$this.removeClass('hover');
		$$('body').removeClass('mobile-menu-open');

		hideChildMenu($this);
	});

	$$('.menu-mega-list-item-level-back').on('click', function(e){ // Back Click
		e.stopPropagation();
		$this = $(this).parent().parent();
		$$('#menu-main-nav').removeClass('submenu-open');
		$this.removeClass('hover');

		hideChildMenu($this);
	});

	$$('.menu-mega-list-item-level-submenu-item-link, .menu-mega-list-item-level-title').on('click', function(e){
		e.stopPropagation();
	});

}

$$('.header-search-mobile_menu_trigger').on('click', function(){ // Alternate trigger
	var $menu = $$('#menu-main-nav').find('.hover-trigger_menu').first();
	$menu.addClass('hover');
	showChildMenu($menu);
});




			// ==== Helper functions =================================================================================
			function showChildMenu($this){
				clearTimeout(menuTimeoutShow);
				clearTimeout(menuTimeoutHide);

				menuTimeoutShow = setTimeout(function() {
					if ( $this.hasClass('hover') ) {
						hideOtherMenus($this);
						$this.children('.hover-box_menu').stop().css('visibility', 'visible').animate({'opacity': 1}, 150);
					}
				}, 0);
			}

			function hideChildMenu($this){
				clearTimeout(menuTimeoutShow);
				// clearTimeout(menuTimeoutHide);

				menuTimeoutHide = setTimeout(function() {
					if ( !$this.hasClass('hover') ) {
						$this.children('.hover-box_menu').stop().animate({
							'opacity': 0
						}, 100, function(){
							$(this).css('visibility', 'hidden');
						});
					}
				}, 200);
			}


			function hideOtherMenus($this){
				$sibling = $this.siblings('.hover-trigger_menu');
				visible = $sibling.children('.hover-box_menu').filter(function(){return $(this).css('visibility') === 'visible'}).length;

				if (visible) {
					$sibling.children('.hover-box_menu').stop().animate({
							'opacity': 0
						}, 100, function(){
							$(this).css('visibility', 'hidden');
					});
				}
			}