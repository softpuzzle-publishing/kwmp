/* 메인 모션 */
var mainMotion = function(){
	$('.indicator>a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
			scrollTop: target.offset().top
			}, 400);
		}
		$(this).siblings("a").removeClass("active");
		$(this).addClass("active");
	});
}

$(function() {
	mainMotion();
	var $status = $('.paging-Info');
	var $slickElement = $('.slick-slider');

	$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.text(i + '/' + slick.slideCount);
	});

	$slickElement.slick({
		autoplay: true,
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000
	});
	$('.slick-wrap .toggle-btn').on('click', function(){
		if( $(this).hasClass('on')){
			$slickElement.slick('play');
		}else{
			$slickElement.slick('pause');
		}
		$(this).toggleClass('on');
	});
});

$(window).scroll(function(){
	var scene1 = $('.scene').offset();
	var scene2 = $('.scene.two').offset();
	var scene3 = $('.scene.three').offset();
	if ($(document).scrollTop() >= scene1.top) {
		$('.indicator>a').removeClass('active');
		$('.indicator .move1').addClass('active');
		$(".scroll-state").removeClass('up');
	}
	if ($(document).scrollTop() >= scene2.top) {
		$('.indicator>a').removeClass('active');
		$('.indicator .move2').addClass('active');
		$(".scroll-state").removeClass('up');
	}
	if ($(document).scrollTop() >= scene3.top) {
		$('.indicator>a').removeClass('active');
		$('.indicator .move3').addClass('active');
		$(".scroll-state").addClass('up');
	}
});
