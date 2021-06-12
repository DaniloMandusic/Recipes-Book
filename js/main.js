(function ($) {
    "use strict";

    /*-------------------------------------
    Contact Form initiating
    -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function (e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                $.ajax({
                    url: "vendor/php/contact-form-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function () {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function (text) {
                        if (text === "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
    Jquery Serch Box
    -------------------------------------*/
    $('a[href="#search"]').on("click", function (event) {
        event.preventDefault();
        var target = $("#search");
        target.addClass("open");
        setTimeout(function () {
            target.find('input').focus();
        }, 600);
        return false;
    });

    $("#search, #search button.close").on("click keyup", function (event) {
        if (
            event.target === this ||
            event.target.className === "close" ||
            event.keyCode === 27
        ) {
            $(this).removeClass("open");
        }
    });

    /*-------------------------------------
    Jquery Advance Serch Box
    -------------------------------------*/
    $("#adv-serch").on('click', function () {
        var _self = $(this);
        _self.parents('.adv-search-wrap').find(".advance-search-form").slideToggle();
        _self.toggleClass('icon-alter');

    });

    /*-------------------------------------
    Quantity Holder
    -------------------------------------*/
    $('#quantity-holder').on('click', '.quantity-plus', function () {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity > 0) {
            $quantity = $quantity + 1;
            $target.val($quantity);
        } else {
            $target.val($quantity);
        }

    }).on('click', '.quantity-minus', function () {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity >= 2) {
            $quantity = $quantity - 1;
            $target.val($quantity);
        } else {
            $target.val(1);
        }
    });

    /*-------------------------------------
    On Scroll
    -------------------------------------*/
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 700) {
            $('.scrollup').addClass('back-top');
        } else {
            $('.scrollup').removeClass('back-top');
        }
    });

    /*-------------------------------------
    Rating selection
    -------------------------------------*/
    $('.rate-wrapper').on('click', '.rate .rate-item', function () {
        var self = $(this),
            target = self.parent('.rate');
        target.addClass('selected');
        target.find('.rate-item').removeClass('active');
        self.addClass('active');
    });

    /*-------------------------------------
     Select2 activation code
     -------------------------------------*/
    if ($('select.select2').length) {
        $('select.select2').select2({
            theme: 'classic',
            //dropdownAutoWidth: true,
            width: '100%'
        });

        $('.opening-hours-wrap select.select2').select2({
            theme: 'classic',
            width: '100%'
        });
    }

    /*-------------------------------------
    Active Menu
    -------------------------------------*/
    $('#site-menu li a').on('click', function () {
        $('#site-menu').find('.current').removeClass('current');
        $(this).parent().addClass('current');
    });


    $('.toggle-menu').on('click', function () {
        $('#site-menu').slideToggle(500);
        $(this).toggleClass('active');
    })

    /*-------------------------------------
    Menu fixded
    -------------------------------------*/
    if ($('header .header-main-menu').length && $('header .header-main-menu').hasClass('header-sticky')) {
        var header_position = $('header .header-main-menu').offset(),
            lastScroll = 100;
        $(window).on('scroll load', function (event) {
            var st = $(this).scrollTop();
            if (st > header_position.top) {
                ($(".header-table").length) ? $('header .header-table').addClass("header-fixed"): $('header .header-main-menu').addClass("header-fixed");
            } else {
                ($(".header-table").length) ? $('header .header-table').removeClass("header-fixed"): $('header .header-main-menu').removeClass("header-fixed");
            }

            lastScroll = st;

            if (st === 0) {
                ($(".header-table").length) ? $('header .header-table').removeClass("header-fixed"): $('header .header-main-menu').removeClass("header-fixed");
            }
        });
    }

    /*---------------------------------------
    On Click Section Switch
    --------------------------------------- */
    $('[data-type="section-switch"]').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            if (target.length > 0) {

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    /*-------------------------------------
    Carousel slider initiation
    -------------------------------------*/
    if ($.fn.owlCarousel) {
        $('.rc-carousel').each(function () {
            var carousel = $(this),
                loop = carousel.data('loop'),
                items = carousel.data('items'),
                margin = carousel.data('margin'),
                stagePadding = carousel.data('stage-padding'),
                autoplay = carousel.data('autoplay'),
                autoplayTimeout = carousel.data('autoplay-timeout'),
                smartSpeed = carousel.data('smart-speed'),
                dots = carousel.data('dots'),
                nav = carousel.data('nav'),
                navSpeed = carousel.data('nav-speed'),
                rXsmall = carousel.data('r-x-small'),
                rXsmallNav = carousel.data('r-x-small-nav'),
                rXsmallDots = carousel.data('r-x-small-dots'),
                rXmedium = carousel.data('r-x-medium'),
                rXmediumNav = carousel.data('r-x-medium-nav'),
                rXmediumDots = carousel.data('r-x-medium-dots'),
                rSmall = carousel.data('r-small'),
                rSmallNav = carousel.data('r-small-nav'),
                rSmallDots = carousel.data('r-small-dots'),
                rMedium = carousel.data('r-medium'),
                rMediumNav = carousel.data('r-medium-nav'),
                rMediumDots = carousel.data('r-medium-dots'),
                rLarge = carousel.data('r-large'),
                rLargeNav = carousel.data('r-large-nav'),
                rLargeDots = carousel.data('r-large-dots'),
                rExtraLarge = carousel.data('r-extra-large'),
                rExtraLargeNav = carousel.data('r-extra-large-nav'),
                rExtraLargeDots = carousel.data('r-extra-large-dots'),
                center = carousel.data('center'),
                custom_nav = carousel.data('custom-nav') || '';
            carousel.addClass('owl-carousel');
            var owl = carousel.owlCarousel({
                loop: (loop ? true : false),
                items: (items ? items : 4),
                lazyLoad: true,
                margin: (margin ? margin : 0),
                autoplay: (autoplay ? true : false),
                autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
                smartSpeed: (smartSpeed ? smartSpeed : 250),
                dots: (dots ? true : false),
                nav: (nav ? true : false),
                navText: ['<i class="flaticon-back" aria-hidden="true"></i>', '<i class="flaticon-next" aria-hidden="true"></i>'],
                navSpeed: (navSpeed ? true : false),
                center: (center ? true : false),
                responsiveClass: true,
                responsive: {
                    0: {
                        items: (rXsmall ? rXsmall : 1),
                        nav: (rXsmallNav ? true : false),
                        dots: (rXsmallDots ? true : false)
                    },
                    576: {
                        items: (rXmedium ? rXmedium : 2),
                        nav: (rXmediumNav ? true : false),
                        dots: (rXmediumDots ? true : false)
                    },
                    768: {
                        items: (rSmall ? rSmall : 3),
                        nav: (rSmallNav ? true : false),
                        dots: (rSmallDots ? true : false)
                    },
                    992: {
                        items: (rMedium ? rMedium : 4),
                        nav: (rMediumNav ? true : false),
                        dots: (rMediumDots ? true : false)
                    },
                    1200: {
                        items: (rLarge ? rLarge : 5),
                        nav: (rLargeNav ? true : false),
                        dots: (rLargeDots ? true : false)
                    },
                    1400: {
                        items: (rExtraLarge ? rExtraLarge : 6),
                        nav: (rExtraLargeNav ? true : false),
                        dots: (rExtraLargeDots ? true : false)
                    }
                }
            });
            if (custom_nav) {
                var nav = $(custom_nav),
                    nav_next = $('.rt-next', nav),
                    nav_prev = $('.rt-prev', nav);

                nav_next.on('click', function (e) {
                    e.preventDefault();
                    owl.trigger('next.owl.carousel');
                    return false;
                });

                nav_prev.on('click', function (e) {
                    e.preventDefault();
                    owl.trigger('prev.owl.carousel');
                    return false;
                });
            }
        });
    }

    /*-------------------------------------
    Window On Load Function
    -------------------------------------*/
    $(window).on('load', function () {

        // Page Preloader
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });

    });

    /*---------------------------------------
    Summernote
    --------------------------------------- */
    if ($.fn.summernote !== undefined) {
        $(document).ready(function () {
            $('.summernote').summernote({
                height: 300,
            });
        });
    }

    /*-------------------------------------
    Section background image
    -------------------------------------*/
    imageFunction();

    function imageFunction() {

        $('[data-bg-image]').each(function () {
            var img = $(this).data('bg-image');
            $(this).css({
                backgroundImage: 'url(' + img + ')',
            });
        });
    }

    /*-------------------------------------
    Inicijalizuj search i sort
    -------------------------------------*/

    if($('#recipes').length) {
        var options = {
            valueNames: [
                'name',
                {data: ['id']},
                {data: ['popularity']},
                {data: ['dificulty']},
            ]
        };

        var recipesList = new List('recipes', options);
    }

    /*-------------------------------------
     HTML u PDF
    -------------------------------------*/

    $('button.js-to-pdf').on('click', function() {

        var excludeItems = $('#pdfContent').find('img, .pdf-ignore');

        // privremeno skloni slike i nutricione vrednosti
        excludeItems.hide();

        var source = $('#pdfContent').html();

        var options = {
            margin:       [20, 20],
            filename:     document.title.replace('|', '-'),
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        var pdfSaved = html2pdf().set(options).from(source).save();

        // vrati slike i nutricione vrednosti
        pdfSaved.then(function() {
                excludeItems.show();
            }
        );

    });

    /*-------------------------------------
     Dodaj recept
    -------------------------------------*/

    var is_lang_sr = (document.documentElement.lang == 'sr');
    var $ingridients_container = $('.js-ingredients-container');
    var $cooking_steps = $('.js-cooking-steps');

    if($cooking_steps || $ingridients_container) {

        var label_text_ing = is_lang_sr? "Sastojak" : "Ingridient";
        var label_text_qty = is_lang_sr? "Količina" : "Quantity";

        $ingridients_container.on('click', 'button.js-add', function (e) {
            e.preventDefault();

            var $this = $(this); // dugme dodaj

            var template =
                `<div class="row no-gutters">
                <div class="col-6">
                    <div class="form-group additional-input-box icon-left">
                        <input type="text" placeholder="${label_text_ing}" class="form-control" name="ingredient[]" required>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group additional-input-box icon-right">
                        <input type="text" placeholder="${label_text_qty}" class="form-control" name="ingredient_qty[]" required>
                        <i class="fas fa-times js-delete"></i>
                    </div>
                </div>
            </div>`;

            $(template).insertBefore($this);

        }).on('click', 'i.js-delete', function (e) {

            e.preventDefault();

            var $this = $(this); // dugme obrisi

            if ($ingridients_container.find('div.row').length > 1) {
                // pronadji div koji sadrzi ceo blok u kome se nalazi dugme za brisanje
                var $parent = $this.closest('div.row');

                $parent.remove();
            }

        });


        $cooking_steps.on('click', 'button.js-add', function (e) {
            e.preventDefault();

            var $this = $(this); // dugme dodaj

            var count = $cooking_steps.find('div.additional-input-box').length + 1;

            var template =
                `<div class="form-group additional-input-box icon-right">
                  <label for="step_${count}">${count}</label>
                   <textarea id="step_${count}" name="step[]" class="textarea form-control" rows="3" required></textarea>
                   <i class="fas fa-times js-delete"></i>
            </div>`;

            $(template).insertBefore($this);

        }).on('click', 'i.js-delete', function (e) {

            e.preventDefault();

            var $this = $(this); // dugme obrisi

            if ($cooking_steps.find('div.additional-input-box').length > 1) {
                // pronadji div koji sadrzi ceo blok u kome se nalazi dugme za brisanje
                var $parent = $this.closest('div.additional-input-box');
                $parent.remove();

                let i = 1;

                // izmeni brojeve koraka
                $.each($cooking_steps.find('div.additional-input-box'), function (index, $obj) {
                    let text = 'step_' + i;
                    $($obj).find('label').attr('for', text).text(i);
                    $($obj).find('textarea').attr('id', text);
                    i++;
                });
            }

        });

        if($('.upload-img').length){
            for (let i = 1; i < 6; i++) {
                $.uploadPreview({
                    input_field: "#image-upload" + i,   // Default: .image-upload
                    preview_box: "#image-preview" + i,  // Default: .image-preview
                    label_field: "#image-label" + i,    // Default: .image-label
                    label_default: is_lang_sr?  "Izaberi sliku" : "Choose Photo",   // Default: Choose File
                    label_selected: is_lang_sr? "Promeni sliku" : "Change Photo",  // Default: Change File
                    no_label: false                 // Default: false
                });
            }
        }

    }

    if($('.js-submit').length)
    {
        $('.js-submit').on('click', function(e) {
            e.preventDefault();

            var stored_receipts = localStorage.getItem("stored_recepipts");

            // da li je vec snimano
            if(stored_receipts !== null) {
                stored_receipts = JSON.parse(stored_receipts);
            } else {
                stored_receipts = [];
            }

            // pokupi vrednosti iz forme
            var formData = $('#recipe-form').serializeArray();

            // gurni u niz
            stored_receipts.push(formData);

            // vrati u storage
            localStorage.setItem("stored_recepipts", JSON.stringify(stored_receipts));

            showToast(is_lang_sr? 'Recept je snimljen u LocalStorage' : 'Receipt saved in LocalStorage');
        })
    }

    var showToast = function(message) {
        'use strict';
        $.toast({
            heading: is_lang_sr? "OK" : "Success",
            text: message,
            showHideTransition: 'slide',
            icon: 'success',
            position: 'bottom-left',
            bgColor: '#646464',
            textColor: '#ffffff',
        });
    };

})(jQuery);
