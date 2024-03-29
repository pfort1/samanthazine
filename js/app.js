$(document).ready(function () {
  /*
  if (!$.cookie('alert')) {
    $('.age-gate').show();
    $('.intro-logo').show();
    var date = new Date();
    date.setTime(date.getTime() + 60 * 1000);
    $.cookie('alert', true, {
      expires: date
    });
  }*/



  Snipcart.events.on('theme.routechanged', (routesChange) => {
    if (routesChange.from === "/" && routesChange.to !== "/") {
      console.log('cart opened');
      $('.container').addClass('wide')
    }

    if (routesChange.from !== "/" && routesChange.to === "/") {
      console.log('cart closed');
      $('.container').removeClass('wide')

    }
  })

  $('.intro-logo').on('click', function () {
    $(this).hide(0);
  })
  $('#yes-button').on('click', function () {
    $('.age-gate').hide(0);
  })
  var myIndex = 0;
  var timer;

  function autoCarousel() {
    $('.book-container').addClass('no-animation')
    var i;
    var x = document.getElementsByClassName("item-lightbox");
    if (x.length != 0) {
      for (i = 0; i < x.length; i++) {
        x[i].style.opacity = "0";
      }
      myIndex++;
      if (myIndex > x.length) {
        myIndex = 1
      }
      x[myIndex - 1].style.opacity = "1";
      timer = setTimeout(autoCarousel, 250); // Change image every 250 milliseconds
    }
  }

  $('.item-link, .sub-link').not('.shop-link, .snipcart-add-item').on('mouseenter', function () {
    var image = $(this).siblings('.item-lightbox').find('img')
    var book = $(this).siblings('.item-lightbox').find('.book-container')
    book.removeClass('no-animation')
    $(image).css('filter', 'blur(0px)')
    $('.item-lightbox').css('opacity', '0')
    $(this).siblings('.item-lightbox').css('opacity', '1')
    clearTimeout(timer);
  })

  $('.item-link, .sub-link').not('.shop-link, .snipcart-add-item').on('mouseleave', function () {
    $('.item-lightbox').css('opacity', '0')
    $('.item-lightbox img').css('filter', 'blur(5px)')
    autoCarousel()
  })

  $('.item-link.shop-link').on('mouseenter', function () {
    $('.item-content, .item-lightbox').hide()
    $(this).siblings('.circle').css('background-color', 'black')
    $(this).parent().siblings('.item-lightbox').show()
    clearTimeout(timer)
  })

  $('.item-link.shop-link').on('click', function () {
    $(this).parent().siblings('.item-content').show()
    $(this).siblings('.circle').css('background-color', 'black')
  })

  $('.item-link.shop-link').not('.snipcart-add-item').on('mouseleave', function () {
    $('.item-lightbox').css('opacity', '0')
    $('.circle').css('background-color', 'transparent')
    autoCarousel();
  })
  clearTimeout(timer);
  autoCarousel()

});