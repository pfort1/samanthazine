$(document).ready(function() {
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



});

$('.intro-logo').on('click', function() {
  $(this).hide(0);
})
$('#yes-button').on('click', function() {
  $('.age-gate').hide(0);
})
var myIndex = 0;
var timer;
autoCarousel();

function autoCarousel() {
  var i;
  var x = document.getElementsByClassName("item-lightbox");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1
  }
  x[myIndex - 1].style.display = "block";
  timer = setTimeout(autoCarousel, 250); // Change image every 250 milliseconds
}

$('.item-link, .sub-link').not('.shop-link').on('mouseenter', function() {
  $('.item-lightbox').hide(0)
  $(this).siblings('.item-lightbox').show(0)
  clearTimeout(timer)
})
$('.item-link, .sub-link').not('.shop-link').on('mouseleave', function() {
  $('.item-lightbox').hide(0)
  autoCarousel();
})
$('.item-link.shop-link').on('mouseenter', function() {
  $('.item-content, .item-lightbox').hide()
  $(this).siblings('.circle').css('background-color', 'black')
  $(this).parent().siblings('.item-lightbox').show()
  clearTimeout(timer)
})
$('.item-link.shop-link').on('click', function() {
  $(this).parent().siblings('.item-content').show()
  $(this).siblings('.circle').css('background-color', 'black')
})
$('.item-link.shop-link').on('mouseleave', function() {
  $('.item-lightbox').hide()
  $('.circle').css('background-color', 'transparent')
  autoCarousel();
})