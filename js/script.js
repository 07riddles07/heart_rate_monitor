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
          arrows: false,
        },
      },
    ],
  });

  $("ul.catalogue__tabs").on(
    "click",
    "li:not(.catalogue__tab_active)",
    function () {
      $(this)
        .addClass("catalogue__tab_active")
        .siblings()
        .removeClass("catalogue__tab_active")
        .closest("div.container")
        .find("div.catalogue__content")
        .removeClass("catalogue__content_active")
        .eq($(this).index())
        .addClass("catalogue__content_active");
    }
  );

  // Switching the cards
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalogue-item__content")
          .eq(i)
          .toggleClass("catalogue-item__content_active");
        $(".catalogue-item__list-descr")
          .eq(i)
          .toggleClass("catalogue-item__list-descr_active");
      });
    });
  }

  toggleSlide(".catalogue-item__link");
  toggleSlide(".catalogue-item__back");

  // Modal windows
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text(
        $(".catalogue-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });

  // Forms validation
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

// Mask for phone numbers in the forms
  $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scrolling and page up
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
  });

  $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });

  new WOW().init();

});
