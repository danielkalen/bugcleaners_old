var proceed,
	problem,
	$required,
	$currentStep,
	$previousStep,
	$lastField	
	;

function normalKeycodes(event){
	if (   event.keyCode === 8                              // backspace
	    || event.keyCode === 9 								// tab
	    || event.keyCode === 16 							// shift
	    || event.keyCode === 17 							// ctrl
	    || event.keyCode === 18 							// alt
	    || event.keyCode === 46                             // delete
	    || (event.keyCode >= 35 && event.keyCode <= 40)     // arrow keys/home/end

	    || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
	    || (event.keyCode >= 96 && event.keyCode <= 105)    // number on keypad
	  
	    || (event.keyCode === 32 || event.keyCode === 189 || event.keyCode === 190 || event.keyCode === 173)    // space, dash, dot
	 ) {
	  	return true;
	} else {
		return false;
	}
}



var formHasExternalButtons = true,
	multiStep;




$.fn.form = function($arg, $url) {
	$this = this;
	multiStep = $this.find('.step').length > 1; 

	$this.formPrepare();

	$this.find('.next').on('click', function(){
		$this.formNext();
	});
	$this.find('.back').on('click', function(){
		$this.formBack();
	});
	$this.find('.submit').on('click', function(){
		$this.formSubmit();
	});


	if (multiStep) {
		$window.on('resize', function(){
			if ( window.innerWidth <= 920 ) {
				saveSectionHeights( $this.find('.step') );
			}
		});
	}

}











$.fn.formPrepare = function() {	
	var $this = this;

	if ( multiStep ) {
		saveSectionHeights( $this.find('.step') );
		
		// Initial height set
		$this.find('.step').first().addClass('show').each(function(){
			var $this = $(this);
			$this.height( $this.data('height') );

			$this.siblings().height(39);
		});
	}






	$this.find('.fieldset').not('.radio, .checkbox').each(function(){
		$.fn.formPrepare.inputField($(this));
	});

	$this.find('.fieldset.checkbox').each(function(){
		$.fn.formPrepare.checkboxField($(this));
	});

	$this.find('.fieldset.radio').each(function(){
		$.fn.formPrepare.radioField($(this));
	});


	$this.find('.phone, .zip, .cardnumber, .cardcvc, .carddate').each(function(){
		$.fn.formPrepare.numberField($(this));
	});

	$this.find('.email').each(function(){
		$.fn.formPrepare.emailField($(this));
	});

	// Prevent tab switch to the next (invisible) field
	$this.find('.step').each(function(){
		$lastField = $(this).find('.fieldset').not('.checkbox').last();

		$lastField.on('keydown', function(e){
			if ( e.keyCode === 9 ) e.preventDefault();
		});
	});

	$this.find('.input').each(function(){
		// $this = $(this);
		attachEvents( $(this) );
	});


	if ( $this.find('.state').length ) {
		appendStateList();
	}
	if ( $this.find('.country').length ) {
		appendCountryList();
	}
}




$.fn.formValidate = function() {
	var $this = this;

	proceed = false;
	problem = false;
	$required = $this.find('.step.show').find('.fieldset.required');

	$required.each(function(){

		var $this = $(this);

		if ( !$this.hasClass('valid') ) {
			problem = true;
			$this.addClass('error');

		} else {
			$this.removeClass('error');
		}
	});

	if ( problem ) {
		proceed = false;
	} else {
		proceed = true;
	}
}






$.fn.formNext = function() {
	var $this = this;
	$currentStep = $this.find('.step.show');

	$this.formValidate();

	if ( proceed ) {
		var $nextStep = $currentStep.next();

		revealSection($nextStep);
	}
}





// $.fn.formOpen = function() {
// 	if ( !this.hasClass('show') ) {
// 		var $currentStep = $this.find('.step.show');

// 		$this.formValidate();

// 		if ( !proceed ) {
// 			$currentStep.addClass('incomplete');
// 		}
// 		revealSection(this);

// 		scrollUpIfNeeded(this);
// 	}
// }










$.fn.formBack = function() {
	var $this = this;

	$currentStep = $this.find('.step.show');
	$previousStep = $currentStep.prev();

	revealSection($previousStep);
	scrollUpIfNeeded($previousStep);
}









$.fn.formSubmit = function() {
	var $this = this;

	$this.formValidate();

		if ( proceed ) {
			// Submission Logic
		}

}
















function attachEvents($field){
	$field.focus(function(){
		$(this).parent().addClass('focus');
	});
	$field.blur(function(){
		$(this).parent().removeClass('focus');
	});

	$field.keyup(function(){
		if ( $(this).val() === '' ) {
			$(this).parent().removeClass('filled');
		} else {
			$(this).parent().addClass('filled');
		}
	});

	if ( $field.parent().hasClass('select') ) {
		$field.change(function(){
			if ( $(this).val() !== '' ) {
				$(this).parent().addClass('filled');
			} else {
				$(this).parent().removeClass('filled');
			}
		});
	}

	if ( $field.attr('type') !== 'checkbox' ){
		if ( $field.val() !== '' ) {
			$field.parent().addClass('filled valid');
		}
	}
}



function makeValid($field) {
	$field.addClass('valid').removeClass('invalid error');
}


function makeInvalid($field, error) {
	$field.addClass('invalid').removeClass('valid');

	if (error) {
		$field.addClass('invalid error');
	}
}






function scrollUpIfNeeded($openSection){
	if ( window.pageYOffset > $openSection.offset().top ) {
		$("html, body").animate({ scrollTop: ($openSection.offset().top - 70) }, 300);
	}
}



function saveSectionHeights($steps){

	$steps.each(function(){
			var $this = $(this);
		var $thisHeight = $this.children('div').height() + 90;

		$this.data('height', $thisHeight);
	});
}



function revealSection($section){
	showSection($section);
	$section.addClass('show')
	$section.siblings('.show').height(39).removeClass('show');

	scrollUpIfNeeded($section);
}
function showSection($section){
	$section.height( $section.data('height') );
}






function appendStateList(){

	$window.one('scroll', function(){
		$.getJSON('js/_parts-form/state.json', '', function(data){
			var items = [];
			$.each(data, function(key, val){
				items.push('<option value="' + key + '">' + val + '</option>');
			});
			$$('.fieldset.state').find('select').append(items);
		});
	});

}

function appendCountryList(){

	$window.one('scroll', function(){
		$.getJSON('js/_parts-form/country.json', '', function(data){
			var items = [];
			$.each(data, function(key, val){
				items.push('<option value="' + key + '">' + val + '</option>');
			});
			$$('.fieldset.country').find('select').append(items);
		});
	});

}

