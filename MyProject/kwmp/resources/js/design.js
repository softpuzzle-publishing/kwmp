//table responsive
function addCellHeader(table) {
	if (!table) {
		return false;
	}

	var trs = table.getElementsByTagName('tr');
	var trsChild;
	var grid = {};
	var cells;
	for (var i = 0, cntI = trs.length; i < cntI; i++) {
		if (!grid[i]) {
			grid[i] = {};
		}
		trsChild = trs.item(i).childNodes;
		cells = 0;
		for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
			if (trsChild[j].nodeType == 1) {
				grid[i][cells++] = trsChild[j];
			}
		}
	}

	var cellHeader = '';
	for (row in grid) {
		if (row == 0) {
			continue;
		}
		for (cell in grid[row]) {
			if (cell == 0) {
				continue;
			}
			cellHeader = grid[0][cell].innerHTML + ' - ' + grid[row][0].innerHTML;
			grid[row][cell].setAttribute('data-cell-header', cellHeader);
		}
	}
}
addCellHeader(document.querySelector('.afternoon-session'));

$(window).scroll(function(){
	scroll = $(window).scrollTop();
	if (scroll >= 1) {
		$("#header").addClass("scroll");
		$("html").addClass("is-scrolled");
	} else {
		$("#header").removeClass("scroll");
		$("html").removeClass("is-scrolled");
	}
});

/* 준비 */
$(function() {
	$('#header-block').load('../_include/header.html');
	$('#nav-block').load('../_include/nav.html');
	$('#footer-block').load('../_include/footer.html');

	//gnb
	var header = function(){
		var gnb = $('#gnb');
		var nav = $('#nav');
		var gnbHeight = $("#gnb>ul>li>ul").outerHeight();
		var $subGnb = $("#gnb>ul>li>ul");
		var $gnbBg = $(".bg-gnb");
		var dep1 = $('[data-depth1]');
        var dep2 = $('[data-depth2]');
        var dep3 = $('[data-depth3]');
		gnbInit();
		navInit();

		function navInit(){
			if(dep1.length > 0){
				gnb.find('.depth1').clone().appendTo(nav.find('.dep1 ul'));
				nav.find('.dep1 .ing').text(dep1.text());
			}
			if(dep2.length > 0){
				nav.find('.dep2').show();
				nav.find('.dep2 .ing').text(dep2.text());
				gnb.find('.depth1.active .depth2 > li').clone().appendTo(nav.find('.dep2 ul'));
			}
			if(dep3.length > 0){
				nav.find('.dep3').show();
				nav.find('.dep3 .ing').text(dep3.text());
				gnb.find('.depth2 > li.active li').clone().appendTo(nav.find('.dep3 ul'));
			}

			var _isNavOpen = false;
			$('#nav .focus').on('click', function(e) {
				e.preventDefault();
				_isNavOpen = true;
				if($(this).hasClass('active')){
					$('#nav .focus').removeClass('active');
				}else{
					$('#nav .focus').removeClass('active');
					$(this).addClass('active');
				}
			});

			$(document).on('click', function(e) {
				if(_isNavOpen){
					if(!$(e.target).is('#nav a') && $(e.target).parents('#nav a').length === 0){
							$('#nav .focus').removeClass('active');
					}
				}
			});
		}

		function gnbInit(){
			gnb.find('.depth1 > a').each(function(idx,element){
				if($(this).text() === dep1.text()){
					$(element).closest('.depth1').addClass('active');
					$(element).closest('.depth1').find('.depth2 > li > a').each(function(idx,el){
						if($(this).text() === dep2.text()){
							$(this).closest('li').addClass('active');
						}
					});
				}
			});
			//gnb를 모바일에 복사
			$('#gnb .clfix').clone().appendTo($('#m-gnb'));
		}

		$("#gnb>ul, .bg-gnb").hover(function(){
			gnbOn();
		},function(){
			gnbOff();
		});

		function gnbOn(){
			$("html").addClass("open-gnb");
		}

		function gnbOff(){
			$("html").removeClass("open-gnb");
		}

		$("#header .mobile-btn, #m-gnb>.btn-close").click(function(){
			$("html").toggleClass('open-mobile-gnb');
		});
		$("#header .dimmed").click(function(){
			$("html").removeClass('open-mobile-gnb');
		});
		$("#m-gnb>ul>li>a").click(function(){
			$(this).parent("li").toggleClass("on");
			return false;
		});
		var btn = $("#header .search-btn");
		btn.click(function(){
			if(!$("html").hasClass("open-search")){
				$("html").addClass("open-search");
				$(".search-box").slideDown(150);
			} else {
				$("html").removeClass("open-search");
				$(".search-box").slideUp(150);
			}
		});
	};

	//top 버튼
	$('.go-top').on('click', function(){
		$('body, html').animate({scrollTop:0}, 600);
	});

	// 개발시 setTimeout 삭제 필요
	setTimeout(function(){
		header();

		var swiperFamily = new Swiper('.family-site .swiper-container', {
			freeMode: true,
			slidesPerView: 'auto',
			loop: true,
			speed: 6000,
			autoplay: {
				delay: 4000,
			}
        });
	},200);

});

