/* ==========================================================================
   Search Ajax
   ========================================================================== */


// ==== Elements Append =================================================================================

$$('body').prepend('<div class="header-search-overlay"></div>');
$$('.header-search').append('<div class="header-search-results"></div>');



// ==== Submit Event =================================================================================
$$('.header-search .product-search').on('submit', function(e){
	e.preventDefault();
	$$('.header-search .product-search-field').trigger('keydown');
});

$$('.header-search .product-search-submit').on('click', function(){
	$$('.header-search .product-search').submit();
});





// ==== Field typing event =================================================================================
$resultsBox = $$('.header-search-results');
$viewMore = '<div class="header-search-results-more">View More</div>';

$$('.header-search .product-search-field').on('keyup', function(){ 
    $this = $(this);
    $parent = $this.parent().parent();

    term = $this.val();

    if ( term && term.length > 2){
    	$$('body').removeClass('found-results').addClass('loading');

        $.get( '/', { s: term }, function( data ){
            $resultsBox.html( $(data).find('#main') );
            $resultsBox.append( $viewMore );
            $$('body').addClass('found-results').removeClass('loading');  
        });
    }

});


// ==== View more click event =================================================================================
$$('.header-search').on('click', '.header-search-results-more', function(){
	var term = $$('.header-search .product-search-field').val();

	window.location = '//' + window.location.host + '/?s=' + term + '&post_type=product';
});


// ==== Close results =================================================================================
$$('.header-search-overlay').on('click', function(){
	$$('body').removeClass('found-results');
});