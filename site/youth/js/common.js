/* (주)한신정보기술 이경선 - 2019.06.01 */
/*
$(function() {

	var $search =  $('.search'),
		$searchKeyboard =  $search.find('.search_keyboard'),
		$searchQuery =  $search.find('.search_query'),
		nvk = new NeoVirtualKeyboard({
			inputElement: $searchQuery,
			keyLayoutType: 'MULTI'
		});

	$searchKeyboard.on('click.departmentCommon', function (event) {
		nvk.showKeyboard(this);
	});

});*/


// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(function(){

	/* 브라우저마다 클래스 추가 */
	var $window = $(window),
		$html = $('html'),
		$header = $('header'),
		$gnb = $header.find('.gnb');

	// $('.lang_btn').attr('title', '열기');
	// $('.lang_btn').on('click.main', function(event) {
	// 	var $this = $(this),
	// 		$langContent = $this.next('.lang_content');
	//
	// 	//애니메이션이 끝났을 때
	// 	if(!$langContent.is(':animated')) {
	// 		$langContent.slideToggle(250, 'easeInOutExpo').parent('li').toggleClass('active');
	// 	}
	// 	if($(this).parent().hasClass('active')){
	// 		$(this).attr('title', '닫기');
	// 	}else {
	// 		$(this).attr('title', '열기');
	// 	}
	// });


	$('.footer_banner_list').slick({
		slidesToShow : 8,
		variableWidth : true,
		playText : '재생',
		pauseText : '정지',
		autoArrow : $('.footer_banner_auto'),
		prevArrow : $('.footer_banner_prev'),
		nextArrow : $('.footer_banner_next')
	});

	// site_link
	$('.footer_site_btn').attr('title', '열기');
	$('.footer_site_btn').on('click.main', function(event) {
		var $this = $(this),
			$footerSiteContent = $this.next('.footer_site_content');

		//애니메이션이 끝났을 때
		if(!$footerSiteContent.is(':animated')) {
			$this.attr('title', ($footerSiteContent.parent('li').hasClass('active')) ? '열기' : '닫기');
			$footerSiteContent.slideToggle(250, 'easeInOutExpo').parent('li').toggleClass('active').siblings('li').removeClass('active').children('.footer_site_content').slideUp(250, 'easeInOutExpo').prev('.footer_site_btn').attr('title', '열기');
		}
	});


	$('.footer_site_close').on('click.main', function(event) {
		var $this = $(this),
			$footerSiteContent = $this.parents('.footer_site_content');

		//애니메이션이 끝났을 때
		if(!$footerSiteContent.is(':animated')) {
			$footerSiteContent.slideUp(250, 'easeInOutExpo').parent('li').removeClass('active');
			$footerSiteContent.siblings('.footer_site_btn').attr('title', '열기');
		}
	});

	$(function() {
			var $SitePrev = $('.site_banner .site_banner_prev'),
				$SiteAuto = $('.site_banner .site_banner_auto'),
				$SiteNext = $('.site_banner .site_banner_next');
	
	        $('.site_banner_list').slick({
	            slidesToShow : 6,
	            variableWidth : true,
				playText : '재생',
				pauseText : '정지',
	            autoArrow : $SiteAuto,
	            prevArrow : $SitePrev,
	            nextArrow : $SiteNext
	        });
	
	        // site_link
	        $('.site_site_btn').on('click.main', function(event) {
	            var $this = $(this),
	                $SiteContent = $this.next('.site_site_content');
	
	            //애니메이션이 끝났을 때
	            if(!$SiteContent.is(':animated')) {
	                $SiteContent.slideToggle(250, 'easeInOutExpo').parent('li').toggleClass('active').siblings('li').removeClass('active').children('.site_site_content').slideUp(250, 'easeInOutExpo');
	            }
	        });
	
	        $('.site_site_close').on('click.main', function(event) {
	            var $this = $(this),
	                $SiteContent = $this.parents('.site_site_content');
	
	            //애니메이션이 끝났을 때
	            if(!$SiteContent.is(':animated')) {
	                $SiteContent.slideUp(250, 'easeInOutExpo');
	            }
	        });
	
	
		var $window = $(window),
			$htmlAndBody = $('html, body'),
			$footerTop = $('.footer_top');
	
		$footerTop.find('a').on('click', function(event) {
			$htmlAndBody.stop().animate({
				scrollTop : 0
			}, 250);
	
			event.preventDefault();
		});
	
		$window.on("scroll.common", function(event) {
			var scrollTop = $window.scrollTop();
	
			if(scrollTop > 0) {
				$footerTop.fadeIn();
			}else{
				$footerTop.fadeOut();
			}
		}).triggerHandler('scroll.common');
		/* 검색 */
		/* var $search = $header.find('.search'),
			$searchOpen = $search.find('.search_open'),
			$searchBtn = $search.find('.search_btn'),
			$searchClose = $search.find('.search_close');
	
		$searchBtn.on('click', function(event) {
			$search.toggleClass('active');
			$html.addClass('search_open');
			$gnb.css('z-index', '30');
		});
		$searchClose.on('click', function(event) {
			$search.removeClass('active');
			$html.removeClass('search_open');
			$gnb.css('z-index', '70');
		}); */
	});

});
