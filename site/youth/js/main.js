(function($) {
	'use strict';

	$(function() {
		var $window = $(window),
			$html = $('html'),
			$container = $('#container');

		//	비주얼
		var $visual = $('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualItem = $visual.find('.visual_item'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal = $visual.find('.visual_total'),
			$visualProgress =  $('.progress'),
			$visualPrev = $visual.find('.btn_wrap .prev'),
			$visualNext = $visual.find('.btn_wrap .next'),
			$visualAuto = $visual.find('.auto'),
			visualListSlickOpt = {
				slidesToShow: 1,
				slidesToScroll : 1,
				current : $visualCurrent,
				total : $visualTotal,
				playText : '재생',
				pauseText : '정지',
				autoArrow : $visualAuto,
				prevArrow : $visualPrev,
				nextArrow : $visualNext,
				pauseOnArrowClick : true,
				arrows : true,
				speed : 500,
				autoplay : true,
				infinite : true,
				variableWidth : false,
				pauseOnHover : false,
				fade : true,
				customState : function(state) {
					var slidesToShow = $visualList.slick('getSlick').options.slidesToShow,
						current = Math.ceil(state.current / slidesToShow),
						total = Math.ceil(state.total / slidesToShow);

					return state;
				},
				responsive: [
					{
						breakpoint: 1401,
						settings: {
						}
					},
				]
			};

		$('.visual_more').on('click',function(){
			$('html').addClass('visual_open');
		});
		$('.visual_close').on('click',function(){
			$('html').removeClass('visual_open');
		});


		$html.addClass('attraction_active');
		$visualList.slick(visualListSlickOpt).slick('setPosition').on('init', function(event, slick, current, next){
			var last = slick.slideCount - slick.options.slidesToShow;

			$visualItem.eq(1).addClass('next_item');
			$visualItem.eq(2).addClass('next_next_item');
			$visualItem.eq(last).addClass('prev_item');
			$visualItem.eq(last - 1).addClass('prev_prev_item');

		});

		$visualItem.eq(0).addClass('active');
		$visualList.slick(visualListSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, current, next){
			$html.removeClass('attraction_active');
			$visualProgress.removeClass('on');

			var last = slick.slideCount - slick.options.slidesToShow;
			$visualItem.removeClass('prev_prev_item prev_item next_item next_next_item');

			if(current < next){
				$visualItem.eq(current - 1).addClass('prev_prev_item');
				$visualItem.eq(current).addClass('prev_item');
				if(next != last - 1 && next != last){
					$visualItem.eq(current + 2).addClass('next_item');
					$visualItem.eq(current + 3).addClass('next_next_item');
				}
				if(next === last - 1){
					$visualItem.eq(current + 2).addClass('next_item');
					$visualItem.eq(0).addClass('next_next_item');
				}
				if(next === last){
					$visualItem.eq(0).addClass('next_item');
					$visualItem.eq(1).addClass('next_next_item');
				}
			}
			if(current === last && next === 0){
				$visualItem.eq(last - 1).addClass('prev_prev_item');
				$visualItem.eq(last).addClass('prev_item');
				$visualItem.eq(1).addClass('next_item');
				$visualItem.eq(2).addClass('next_next_item');
			}
			if(current > next){
				if(next != 0){
					$visualItem.eq(next - 2).addClass('prev_prev_item');
					$visualItem.eq(next - 1).addClass('prev_item');
				}
				if(next != last - 2 && next != last - 1){
					$visualItem.eq(next + 1).addClass('next_item');
					$visualItem.eq(next + 2).addClass('next_next_item');
				}
				if(next === last - 2){
					$visualItem.eq(next + 1).addClass('next_item');
					$visualItem.eq(next + 2).addClass('next_next_item');
				}
				if(next === last - 1){
					$visualItem.eq(last).addClass('next_item');
					$visualItem.eq(0).addClass('next_next_item');
				}
				if(next === 1){
					$visualItem.eq(last).addClass('prev_prev_item');
				}
				if(next === 0){
					$visualItem.eq(last - 1).addClass('prev_prev_item');
					$visualItem.eq(last).addClass('prev_item');
				}
			}

			if(current === 0 && next === last){
				$visualItem.eq(last - 2).addClass('prev_prev_item');
				$visualItem.eq(last - 1).addClass('prev_item');
				$visualItem.eq(last).removeClass('prev_prev_item');
				$visualItem.eq(current).removeClass('prev_item');
				$visualItem.eq(0).removeClass('prev_item');
			}
		}).on('afterChange', function(event, slick, current, next){
			$html.addClass('attraction_active');
			if(!$visualProgress.hasClass('pause')){
				$visualProgress.addClass('on');
			}
		});

		$visualAuto.on('click', function(event){
			if($visualProgress.hasClass('pause')){
				$visualProgress.removeClass('pause');
			} else {
				$visualProgress.addClass('pause');
			};
		});

		//visual 모아보기 레이어팝업
		$('.visual .visual_count .more').click(function (){
			$(this).siblings('.visual_popupzone').addClass('on').attr('title','열림');
			$('html').addClass('popupzone_on');
		});
		$('.visual_popupzone .close').click(function (){
			$('.visual_popupzone').removeClass('on').attr('title','닫힘');
			$('html').removeClass('popupzone_on');
		});


		/*공지사항*/
		var $board = $('.board'),
			$noticeSlide = $board.find('.notice_list'),
			$noticeCtrl = $board.find('.notice_control');

		// slick 옵션을 변수로 정의
		var slickOptions = {
			autoplay: false,
			dots: false,
			swipe: true,
			draggable: true,
			rows: 1,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: false,
			infinite: true,
			prevArrow: $noticeCtrl.find('.notice_prev'),
			nextArrow: $noticeCtrl.find('.notice_next'),
			responsive: [
				{
					breakpoint: 1541,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 801,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 641,
					settings: {
						rows: 3,
						arrows: false,
						dots: false,
						swipe: false,
						draggable: false
					}
				}
			]
		};

// 슬릭 초기화
		$noticeSlide.slick(slickOptions);

		// 윈도우 크기 변경에 따른 슬릭 재설정
		$(window).on('load resize', function() {
			if ($(window).width() < 641) {
				$noticeSlide.slick('unslick');
			} else {
				$noticeSlide.not('.slick-initialized').slick(slickOptions);
			}
		});

		/* 청년활동 */
		var $activity = $('.activity'),
			$activitySlide = $activity.find('.activity_list'),
			$activityCtrl = $activity.find('.activity_control');

		$activitySlide.slick({
			//기본
			autoplay : false,
			dots : false,
			swipe : true,
			draggable : true,
			slidesToShow : 2,
			slidesToScroll : 1,
			variableWidth: false,
			infinite: true,
			prevArrow : $activityCtrl.find('.activity_prev'),
			nextArrow : $activityCtrl.find('.activity_next'),
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						slidesToShow : 1,
					}
				},
				{
					breakpoint: 641,
					settings: {
						slidesToShow : 1,
						variableWidth : true,
					}
				},
			],
		});

		
		
		/*접수중인 청년정책*/
		$(document).ready(function () {
			var $policy = $('.policy'),
				$policyList = $policy.find('.policy_list'),
				$policyItems = $policy.find('.policy_item'),
				$policyBtn = $policy.find('.policy_more'),
				initialDisplayCount = 5, // 처음에 표시할 항목 수
				additionalDisplayCount = 30; // 추가로 표시할 항목 수

			// 초기 설정: 처음 5개만 표시
			$policyItems.each(function (index) {
				if (index >= initialDisplayCount) {
					$(this).hide(); 
				}
			});

			// 더보기 버튼 클릭 이벤트
			$policyBtn.on('click', function (e) {
				e.preventDefault();

				// 추가 항목 표시
				$policyItems.each(function (index) {
					if (index < initialDisplayCount + additionalDisplayCount) {
						$(this).show(); // jQuery 스타일로 표시 처리
					}
				});

				// 더보기 버튼 숨기기
				$policyBtn.hide();
			});
		});







	});

})(window.jQuery);