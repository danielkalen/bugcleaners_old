/* ==========================================================================
   Top Bar
   ========================================================================== */

// ==== Top Bar Hover =================================================================================

$$('.hover-trigger').on('mouseenter click',function(e){
	$this = $(this);
	wasClicked = e.type === "click";
	firstClick = !$this.hasClass('hover');

	if (isMobile) {
		if (wasClicked && firstClick) e.preventDefault();

		$$('.hover-overlay_mobile').one('touchstart', function(){
			hideBox($this);
		});
		$sibling = $this.siblings('.hover-trigger');
		$sibling.removeClass('hover');
	}

	showBox($this);
});


$$('.hover-trigger').on('mouseleave',function(e){
	$this = $(this);

	hideBox($this);
});



		function showBox($this){
			$this.addClass('hover');
			clearTimeout(menuTimeoutShow);
			clearTimeout(menuTimeoutHide);
			if (isMobile) $$('.hover-overlay_mobile').addClass('show');


			menuTimeoutShow = setTimeout(function() {
				if ( $this.hasClass('hover') ) {
					if (isMobile) $$('.hover-overlay_mobile').addClass('show');
					hideOthers($this);
					$this.children('.hover-box').stop().css('visibility', 'visible').animate({'opacity': 1}, 150);
				}
			}, 0);
		}

		function hideBox($this){
			$this.removeClass('hover');
			clearTimeout(menuTimeoutShow);
			clearTimeout(menuTimeoutHide);


			menuTimeoutHide = setTimeout(function() {
				if ( !$this.hasClass('hover') ) {
					if (isMobile) $$('.hover-overlay_mobile').removeClass('show');
					$this.children('.hover-box').stop().animate({
						'opacity': 0
					}, 100, function(){
						$(this).css('visibility', 'hidden');
					});
				}
			}, 200);
		}

		function hideOthers($this){
			$sibling = $this.siblings('.hover-trigger');
			visible = $sibling.children('.hover-box').css('visibility') === 'visible';

			if (visible) {
				$sibling.children('.hover-box').stop().animate({
						'opacity': 0
					}, 100, function(){
						$(this).css('visibility', 'hidden').removeClass('hover');
				});
			}
		}