function updateFreeShipping() {
	if ( $cartTotal === undefined ) {
		$cartTotal = $('.cart-list-total');

		if ( !$cartTotal.length ) return false; // Exit if still undefined
	}

	$cartTotal = parseInt($cartTotal.find('.amount').html().replace('$', '').replace(',', ''));
	$remaining = 120 - $cartTotal;

	if ( $remaining > 0 ) {
		$$('.top-bar-shipping-amount').html('$' + $remaining);
	} else {
		$$('.top-bar-shipping-amount').html('Free');
		$$('.top-bar-shipping-text').html('Shipping With Current Cart');
	}

}


updateFreeShipping();