function publicPrint(){
    var $printContents = $('#container');
    if(!$printContents.length){
        return;
    }

    var $head = $('head').clone();

    var $PrintContentsClone = $printContents.clone();

    var headHtml = $head[0].innerHTML;
    var PrintContentsHtml = $PrintContentsClone[0].outerHTML;

    var printWindowWidth = 1000;
    var printWindowHeight = 700;
    var printWindowTop = (window.screen.height / 2) - (printWindowHeight / 2);
    var printWindowLeft = (window.screen.width / 2) - (printWindowWidth / 2);

    var printWindow = window.open("/", "_blank", 'width=' + printWindowWidth + ', height=' + printWindowHeight + ', top=' + printWindowTop + ', left=' + printWindowLeft + '');

    printWindow.document.write(
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                headHtml +
            '</head>' +
            '<body id="body" class="print_body">' +
                PrintContentsHtml +
            '</body>' +
        '</html>'
    );
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function(){
        printWindow.print();
        printWindow.close();
    }, 1000);
}

(function($) {
	'use strict';

	$(function() {
		var $window = $(window),
			$html = $('html'),
			$container = $('#container');

		var $suvNavBtn = $('.suv_nav_btn');

		$suvNavBtn.next('.suv_nav_sublist').hide();

		// 서브 네비 열기/닫기
		$(document).on('click', '.suv_nav_item .suv_nav_btn', function(e) {
			e.preventDefault();
			var $this = $(this),
				$navItem = $this.closest('.suv_nav_item'),
				isNavOpen = $navItem.hasClass('on'),
				$sublist = $this.next('.suv_nav_sublist');

			if(!$sublist.length) {
				return;
			}

			if(!isNavOpen){
				$navItem.addClass('on');
				$this.attr('title', '하위메뉴 닫기');
				$sublist.stop(true, true).slideDown(150, 'linear');
			} else {
				$navItem.removeClass('on');
				$this.attr('title', '하위메뉴 열기');
				$sublist.stop(true, true).slideUp(150, 'linear');
			}
		});

		// 인쇄 버튼 (sub.html의 .print_btn)
		$(document).on('click', '.print_btn', function(e) {
			e.preventDefault();
			publicPrint();
		});







	});

})(window.jQuery);