var $ = jQuery.noConflict(),
	proceed,
	problem,
	$required,
	$currentStep,
	$previousStep,
	$lastField,
	normalKeycodes = function(event){
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
	};

var multiStep,
Form = function($form){
	this.action = $form.data('action');
	if ( this.action ) {
		this.form = $form;
	} else {
		this.form = $form.find('form').first();
		this.action = this.form.data('action');
	}
	var $this = this;

	multiStep = this.form.find('.step').length > 1; 

	this.Prepare();

	this.form.find('.next').on('click', function($form){    		$this.Next();    	});
	this.form.find('.back').on('click', function($form){    		$this.Back();    	});
	this.form.find('.submit').on('click', function($form){    		$this.Submit();    	});

	this.form.find('input[name="referrer"]').val(document.referrer);
	this.form.find('input[name="url"]').val(document.URL);
	// if (multiStep) {
	// 	$window.on('resize', function(){
	// 		if ( window.innerWidth <= 920 ) {
	// 			saveSectionHeights( $form.find('.step') );
	// 		}
	// 	});
	// }

};













Form.prototype.Prepare = function() {	
	var $thisForm = this.form,
		$this = this;

	// if ( multiStep ) {
	// 	saveSectionHeights( $thisForm.find('.step') );
		
	// 	// Initial height set
	// 	$thisForm.find('.step').first().addClass('show').each(function(){
	// 		var $this = $(this);
	// 		$this.height( $this.data('height') );

	// 		$this.siblings().height(39);
	// 	});
	// }
	$thisForm.on('submit', function(e){
		e.preventDefault();
	});

	$thisForm.find('.fieldset').not('.radio, .checkbox').each(function(){
		$this.Prepare.inputField($(this));
	});

	$thisForm.find('.fieldset.checkbox').each(function(){
		$this.Prepare.checkboxField($(this));
	});

	$thisForm.find('.fieldset.radio').each(function(){
		$this.Prepare.radioField($(this));
	});


	$thisForm.find('.phone, .zip, .cardnumber, .cardcvc, .carddate').each(function(){
		$this.Prepare.numberField($(this));
	});

	$thisForm.find('.email').each(function(){
		$this.Prepare.emailField($(this));
	});

	// Prevent tab switch to the next (invisible) field
	$thisForm.find('.step').each(function(){
		$lastField = jQuery(this).find('.fieldset').not('.checkbox').last();

		$lastField.on('keydown', function(e){
			if (!e.shiftKey){
				if ( e.keyCode === 9 ) {
					e.preventDefault(); $lastField.find('input').blur();
				}
			}
		});
	});

	$thisForm.find('.input').each(function(){
		$this.attachEvents( $(this) );
	});

	$thisForm.find('.conditional').each(function(){
		var $conditionalWrap = $(this);
		// log($conditionalWrap);
		
		$conditionalWrap.find('.conditional-primary .input').on('change', function(){
			var $this = $(this);
			if ( $this.val() === 'other' ) {
				$conditionalWrap.addClass('show');
			} else {
				$conditionalWrap.removeClass('show');
			}
		});
	});


	if ( $thisForm.find('.state').length ) {
		appendStateList();
	}
	if ( $thisForm.find('.country').length ) {
		appendCountryList();
	}
}
// @codekit-append 'form-engine-fields.js'



Form.prototype.Validate = function() {
	var $thisForm = this.form,
		$this = this;

	proceed = false;
	problem = false;
	$required = $thisForm.find('.step.show').find('.fieldset.required');

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






Form.prototype.Next = function() {
	var $thisForm = this.form,
		$this = this;

	$currentStep = $thisForm.find('.step.show');

	this.Validate();

	if ( proceed ) {
		var $nextStep = $currentStep.next();

		revealSection($nextStep);
	}
}










Form.prototype.Back = function() {
	var $thisForm = this.form,
		$this = this;

	$currentStep = $thisForm.find('.step.show');
	$previousStep = $currentStep.prev();

	revealSection($previousStep);
	scrollUpIfNeeded($previousStep);
}









Form.prototype.Submit = function() {
	var $thisForm = this.form,
		$this = this;

	this.Validate();

		if ( proceed ) {
			var $currentStep = $thisForm.find('.step.show'),
				$results = $thisForm.find('.results'),
				loading = '<div class="loading"><div class="loading-title">Processing your information...</div><div class="loading-gif"></div></div>',
				fieldData = $thisForm.serializeArray(),
				data = {};
			
			fieldData.forEach(function(item){
				data[item.name] = item.value;
			});
			data.action = $this.action;

			$thisForm.addClass('final');
			$results.html( loading ).addClass('show');
			$currentStep.removeClass('show');

			$.post('/ajax', data, function(response){
				var type = response.success;
				if (type == true) type = 'success';
				if (type == false) type = 'error';

				if ( $thisForm.attr('id') === 'exitIntentPDF' ) {
					$.cookie('pdf_complete', 'true');
				}
				$results.html('<div class="results-message '+type+'">' + response.message + '</div>');
			}, 'json')
					.fail(function(){
						$results.html('<div class="results-message error">An unknown error has occured on the server, please contact customer support for help.</div>');
					});

		}

}
















Form.prototype.attachEvents = function($field){

	$field.focus(function(){
		$(this).parent().addClass('focus');
	});
	$field.blur(function(){
		$(this).parent().removeClass('focus');
	});

	$field.keyup(function(){
		if ( $(this).val() === '' ) {
			$(this).parent().removeClass('filled animate');
		} else {
			$(this).parent().addClass('filled animate');
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
			$field.parent().addClass('filled valid animate');
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
	// showSection($section);
	$section.addClass('show')
				.siblings('.show').removeClass('show');

	// scrollUpIfNeeded($section);
}
function showSection($section){
	$section.height( $section.data('height') );
}






function appendStateList(){

	$window.one('scroll', function(){
		$.getJSON('/js/_parts-form/state.json', '', function(data){
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
		$.getJSON('/js/_parts-form/country.json', '', function(data){
			var items = [];
			$.each(data, function(key, val){
				items.push('<option value="' + key + '">' + val + '</option>');
			});
			$$('.fieldset.country').find('select').append(items);
		});
	});

}

