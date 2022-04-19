$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false
        },
      },
    ],
  });

  $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function() {
    $(this)
      .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
      .closest('div.container').find('div.catalogue__content').removeClass('catalogue__content_active').eq($(this).index()).addClass('catalogue__content_active');
  });
});
