// hide loader
$(window).on('load', function () {
	$(".loader-inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	window.setTimeout(function () { $('.s-intro-images').addClass('animate'); }, 800);
});

$(document).ready(function ($) {
	var breakpointSm = 767.98,
		breakpointMd = 1024.98,
		scroll = $(window).scrollTop(),
		$header = $('#header'),
		$introContent = $('.s-intro-content'),
		$introSection = $('.s-intro'),
		$introHomeSection = $('.s-intro-home'),
		$body = $('body');

	svg4everybody();
	stickyHeader();
	if ($(window).width() > 767) {
		introHomeAnimation(scroll);
	} else {
		mobileNavDropdownAnimation();
	}
	setIntroHomePosition(scroll);
	showYoutubeInModal();
	changeLabelPosition();
	// object fit ie 11 polyfill
	objectFitImages();
	showFiltersModal();

	deleteItem('.filters-chosen-item');

	// wow animation init
	var wow = new WOW({
		mobile: false,
	});
	wow.init();

	// form validation
	window.addEventListener('load', function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if ((form.checkValidity() === false) && $('.dateinput').hasClass('_invalid')) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);

	// typed.js init
	if ($('#lostItemsInput').length) var typedLostItems = new Typed('#lostItemsInput', {
		strings: ['Some strings without', 'Green bag or ID number', 'Something else', 'lorem ipsum'],
		typeSpeed: 60,
		backSpeed: 60,
		attr: 'placeholder',
		bindInputFocusEvents: true,
		loop: true
	});

	if ($('#foundLostItemsInput').length) var typedFoundLostItems = new Typed('#foundLostItemsInput', {
		strings: ['One two three', 'bla bla bla', 'Something else', 'lorem ipsum'],
		typeSpeed: 60,
		backSpeed: 60,
		attr: 'placeholder',
		bindInputFocusEvents: true,
		loop: true
	});

	// sticky header
	function stickyHeader() {
		if (scroll > 0) {
			$header.addClass("sticky");
		} else {
			$header.removeClass("sticky");
		}
	}

	// home intro section animation
	function introHomeAnimation(scroll) {
		if (scroll >= 0 && scroll < $introSection.outerHeight()) {
			$introContent.css("opacity", 1 - $(window).scrollTop() / 500)
			// $('.s-intro-images').css("opacity", 1 - $(window).scrollTop() / 500)
		}
	}

	function setIntroHomePosition(scroll) {
		if (scroll >= 0 && scroll < $introHomeSection.outerHeight()) {
			$introHomeSection.css({
				'position': 'fixed'
			})
		} else {
			$introHomeSection.css({
				'position': 'absolute'
			})
		}
	}

	// Gets the video src from the data-src on each button
	function showYoutubeInModal() {
		var src,
			$iframe = $("iframe");

		$('.video-btn').click(function () {
			src = $(this).data("src");
		});

		// when the modal is opened autoplay it
		$('.modal').on('shown.bs.modal', function (e) {

			// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
			if ($iframe.length) $iframe.attr('src', src + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
		})

		// stop playing the youtube video when I close the modal
		$('.modal').on('hide.bs.modal', function (e) {
			// a poor man's stop video
			if ($iframe.length) $iframe.attr('src', src);
		})
	}

	// check if intro lost item checkbox checked ot not
	var $lostItemIntroChkWrap = $('#lostItemChkWrap'),
		$lostItemIntroChk = $lostItemIntroChkWrap.find('input[type=checkbox]');

	$lostItemIntroChkWrap.click(function () {

		if ($lostItemIntroChk.prop("checked") == false) {
			$('#lostItemModal').modal('show');
		} else if ($lostItemIntroChk.prop("checked") == true) {
			$lostItemIntroChk.prop("checked", false)
		}

		$("#reportLostItemBtn").click(function () {
			$lostItemIntroChk.prop("checked", true);
		})
	});

	// mobile nav second level menu animation
	function mobileNavDropdownAnimation() {
		var dropdown,
			dropdownHeight;

		$('.dropdown').each(function () {

			$(this).on('show.bs.dropdown', function () {
				dropdown = $(this).find(".nav-dropdown-menu");
				dropdownHeight = dropdown.find(".nav-dropdown-container").outerHeight();

				dropdown.css({
					"height": dropdownHeight
				})
			});

			$(this).on('hide.bs.dropdown', function () {
				dropdown = $(this).find(".nav-dropdown-menu");
				dropdownHeight = dropdown.find(".nav-dropdown-container").outerHeight();

				dropdown.css({
					"height": "1px"
				})
			})
		});
	}

	function changeLabelPosition() {
		$("form").each(function () {
			var parentForm = $(this);

			$(this).find(".form-control").each(function () {
				$(this).on('keyup blur', function () {

					var inputValue = $(this).val();

					// fixed control label in the input top position
					if (inputValue == "") {
						$(this).parents('.form-group').removeClass('focused');
					} else {
						$(this).parents('.form-group').addClass('focused');
					}
				});
			});
		});
	}

	$(window).scroll(function () {
		scroll = $(window).scrollTop();

		stickyHeader(scroll);
		setIntroHomePosition(scroll);

		if ($(window).width() > 767) {
			introHomeAnimation(scroll);
		}
	});

	// autocomplete init
	$('input[name="lost-items-autocomplete"]').autoComplete({
		minChars: 1,
		source: function (term, suggest) {
			term = term.toLowerCase();
			var choices = ['ActionScript', 'AppleScript', 'Asp', 'lorem upsum sfsd fdsgds', 'abcdef'];
			var matches = [];
			for (i = 0; i < choices.length; i++)
				if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
			suggest(matches);
		}
	});

	// custom file init
	bsCustomFileInput.init()

	// item page intro carousel pager
	var $itemDetailCarousel = $('.item-detail-carousel').flickity(),
		$itemDetailCarouselStatus = $('.item-detail-carousel-status'),
		flkty = $itemDetailCarousel.data('flickity');

	function updateStatus() {
		var cellNumber = flkty.selectedIndex + 1;
		$itemDetailCarouselStatus.text(cellNumber + ' / ' + flkty.slides.length);
	}

	if ($('.item-detail-carousel').length) updateStatus();

	$itemDetailCarousel.on('select.flickity', updateStatus);


	// custom input file with image preview
	if (window.File && window.FileList && window.FileReader) {
		imageUploadPreview("#lostItemImages")
	} else {
		alert("Your browser doesn't support to File API")
	}

	function imageUploadPreview(inputId) {
		$(inputId).on("change", function (e) {
			var files = e.target.files,
				filesLength = files.length;
			for (var i = 0; i < filesLength; i++) {
				var f = files[i]
				var fileReader = new FileReader();
				fileReader.onload = (function (e) {
					var file = e.target;
					$("<span class=\"pip\">" +
						"<img class=\"image-thumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
						"<br/><span class=\"remove\"><i class=\"fas fa-trash-alt\"></i></span>" +
						"</span>").insertAfter(inputId);
					$(".remove").click(function () {
						$(this).parent(".pip").remove();
					});
				});
				fileReader.readAsDataURL(f);
			}
		});
	}

	// delete filter option on click
	function deleteItem(itemClass) {
		var parent = $(itemClass);
		parent.find('.btn-remove').click(function () {
			$(this).parent().remove();
		})
	}

	// initialising Flickity when switching Tab

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if ($('[data-flickity]').length > 0) {
			$('div[aria-labelledby=' + $(e.target).attr('id')).find('[data-flickity]').flickity('resize')
		}
	});

	function showFiltersModal() {
		var filterArea = $('.filter-area');

		if (filterArea.length > 0) {
			$('.filters-open-modal').click(function () {
				filterArea.addClass('show');
				$body.addClass('modal-open')
			});

			filterArea.find('.filter-area-close').click(function () {
				filterArea.removeClass('show');
				$body.removeClass('modal-open')
			});

		}
	}

	// calc dynamic customer device height/width
	// 100vh height variable

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	var vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	// document.documentElement.style.setProperty('--vh', `${vh}px`);
	document.documentElement.style.setProperty('--vh', vh + 'px');

	// We listen to the resize event
	window.addEventListener('resize', function () {
		// We execute the same script as before
		var vh = window.innerHeight * 0.01;
		// document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.setProperty('--vh', vh + 'px');
	});
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	'use strict';
	window.addEventListener('load', function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();