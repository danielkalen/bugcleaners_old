/* ==========================================================================
   Add-to-cart button click
   ========================================================================== */

$$('.products-item-img-hover-actions-add').on('click', function(){
	$addedProduct = $(this).parents('.products-item').find('.products-item-content-title').html();
});