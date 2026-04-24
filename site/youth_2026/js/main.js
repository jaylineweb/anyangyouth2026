(function($) {
	'use strict';

	$(function() {
		var $window = $(window),
			$html = $('html'),
			$container = $('#container');

		$('.visual_list').slick({
			//기본
			autoplay : true,
			prevArrow : $('.slide_prev'),
			nextArrow : $('.slide_next'),
		

			//추가 기능
			autoArrow : $('.auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			pauseText : '정지',
			playText : '재생',
			total : $('.total'),
			current : $('.current'),
			customState : function(state) {
				//현재 슬라이드 위치가 10보다 작을 때
				if(state.current < 10) {
					state.current = '0' + state.current;
				}

				//슬라이드 갯수가 10보다 작을 때
				if(state.total < 10) {
					state.total = '0' + state.total;
				}

				return state;
			}
		});


		$('.program_list').slick({
			
			autoplay : true,
			draggable: true,
			swipe: true,
			infinite:false,
			slidesToShow:4,
			prevArrow : $('.rowgroup2 .program_prev'),
			nextArrow : $('.rowgroup2 .program_control .controlbox .program_next'),

			//추가 기능
			//autoArrow : $('.auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			//pauseText : '정지',
			//playText : '재생',
			//total : $('.total'),
			//current : $('.current'),
			customState : function(state) {
				//현재 슬라이드 위치가 10보다 작을 때
				if(state.current < 10) {
					state.current = '0' + state.current;
				}

				//슬라이드 갯수가 10보다 작을 때
				if(state.total < 10) {
					state.total = '0' + state.total;
				}

				return state;
			},
			responsive: [
				{
					breakpoint: 1561,
					settings: {
						slidesToShow: 3
					}
				},
				
				{
					breakpoint: 1001,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 641,
					settings: {
						slidesToShow: 2,
						variableWidth: true,
					}
				}
			]
		});

		// $('.week_list').slick({
		// 	autoplay : false,
		// 	draggable: false,
		// 	swipe: false,
		// 	infinite:true,
		// 	slidesToShow:7,
		// 	arrows:true,
		// 	prevArrow : $('.rowgroup3 .board .board_contents .month_nav .btn_prev'),
		// 	nextArrow : $('.rowgroup3 .board .board_contents .month_nav .btn_next'),
		// 	variableWidth:true,

		// 	isRunOnLowIE : false,
		// 	pauseOnArrowClick : true,
		// 	pauseOnDirectionKeyPush : true,
		// 	pauseOnSwipe : true,
		// 	pauseOnDotsClick : true,
		// 	customState : function(state) {
		// 		if(state.current < 10) {
		// 			state.current = '0' + state.current;
		// 		}

		// 		if(state.total < 10) {
		// 			state.total = '0' + state.total;
		// 		}

		// 		return state;
		// 	}
		// });
		

		$('.gallery_list').slick({
			autoplay : false,
			draggable: true,
			swipe: true,
			infinite:false,
			slidesToShow:2,
			prevArrow : $('.gallery_controls .prev'),
			nextArrow : $('.gallery_controls .next'),
			variableWidth:true,

			//추가 기능
			//autoArrow : $('.auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			//pauseText : '정지',
			//playText : '재생',
			//total : $('.total'),
			//current : $('.current'),
			customState : function(state) {
				//현재 슬라이드 위치가 10보다 작을 때
				if(state.current < 10) {
					state.current = '0' + state.current;
				}

				//슬라이드 갯수가 10보다 작을 때
				if(state.total < 10) {
					state.total = '0' + state.total;
				}

				return state;
			}
		});

		/* 공간소개 hover 처리 */
		var $spaceList = $('.rowgroup5 .space_list');
		var $spaceItems = $('.rowgroup5 .space_list .space_item');

		
		$spaceItems.find('.logo_box img').each(function() {
			var originalSrc = $(this).attr('src');
			var onSrc = originalSrc.replace('.png', '_on.png'); 

			$(this).data('original-src', originalSrc); 
			$(this).data('on-src', onSrc);
		});

		
		function setSpaceInactive() {
			$spaceItems.removeClass('over');
			$spaceList.removeClass('is-active');
			$spaceItems.find('.logo_box img').each(function() {
				$(this).attr('src', $(this).data('original-src'));
			});
		}

		function setSpaceActive($target) {
			$spaceItems.removeClass('over');
			$target.addClass('over');
			$spaceList.addClass('is-active');

			$spaceItems.find('.logo_box img').each(function() {
				$(this).attr('src', $(this).data('original-src'));
			});

			$spaceItems.not($target).find('.logo_box img').each(function() {
				$(this).attr('src', $(this).data('on-src'));
			});
		}

		$spaceItems.on('mouseenter focusin', function() {
			if (window.innerWidth < 641) return;
			setSpaceActive($(this));
		});

		$spaceList.on('mouseleave', function() {
			if (window.innerWidth < 641) return;
			setSpaceInactive();
		});

		$spaceItems.on('focusout', function() {
			if (window.innerWidth < 641) return;
			setTimeout(function() {
				var $focused = $(document.activeElement);
				if (!$focused.closest('.rowgroup5 .space_list .space_item').length) {
					setSpaceInactive();
				}
			}, 0);
		});

		
		$(window).on('resize', function() {
			if (window.innerWidth < 641) {
				
				setSpaceInactive();
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