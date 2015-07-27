/* ==========================================================================
   Sidebar
   ========================================================================== */

// ==== Sidebar Scroll =================================================================================

if ( $$('.sidebar').length ) {
	$sidebarTop = $$('.sidebar').offset().top;
	$sidebarWidth = $$('.sidebar-wrap').width();
	$sidebarHeight = $$('.sidebar').height() + 2;
	$footerTop = $$('.footer').offset().top;

		// Update vars upon resize
		$window.on('resize', function(){
			$sidebarWidth = $$('.sidebar-wrap').width();
			$footerTop = $$('.footer').offset().top;
		});

	$window.on('scroll', function(){
		if ( window.innerWidth > 736 ) {	// Tablet and Desktop only

			$footerTop = $$('.footer').offset().top;
			$sidebarHeight = $$('.sidebar').height() + 2;

			if ( window.pageYOffset > $sidebarTop -10 && $sidebarHeight < $$('#main').height() ) {	// Scrolled
				$$('.sidebar').addClass('fixed').css('max-width', $sidebarWidth);

				if ( (window.pageYOffset + $$('.sidebar').height()) > ($footerTop - 40) ) {
					$$('.sidebar').css('top', ($footerTop - 30) - (window.pageYOffset + $sidebarHeight));
				} else {
					$$('.sidebar').css('top', 10);
				}
			} else {	// Not Scrolled
				$$('.sidebar').removeClass('fixed')
							  .css('top', 0);
			}

		}
	});
}