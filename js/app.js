


  const params = new URLSearchParams(window.location.search)
  console.log(params)

  if ( params.has('tab') ) {
    
    var currenttab = params.get('tab')

    document.querySelector('.nav-link#'+currenttab).classList.add('active')

    document.querySelectorAll('.tabpane').forEach(function(el){
      el.style.display = 'none';
    })

    document.querySelector('.tabpane#'+currenttab).style.display = 'block';

  } else if (!document.querySelector('#Stories.active')) {
    document.querySelector('.nav-link#Info').classList.add('active')
  }

$(document).ready(function () {



// const arrow = document.querySelector(".boockup");
// var w = window.innerWidth;
// var h = window.innerHeight;
// const arrowCenter = getCenter(arrow);
// w.addEventListener("mousemove", ({clientX, clientY}) => {
//     const angleY = (clientY / h) * 180;
//     const angleX = (clientY / h) * 180;
//     arrow.style.transform = `rotate(-${angleX}deg)`;
// });

const defaultPerspective = '-150px';
// Track the mouse movemont
let mouseX = 0;
let mouseY = 0;
let lastXDeg = 360;
let lastYDeg = 360;
// The speed of the cube following movement
const speed = 0.1;
$(document).ready(()=>{
  setInterval(rotateCube, 33)
})
$(document).mousemove(updateMousePosition);
// Follow mouse movement
function updateMousePosition(e) {
  mouseX = e.pageX/getWidth();
  mouseY = e.pageY/getHeight();
}
function rotateCube() {
  lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg
) * speed;
  lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg
) * speed;
    let newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`
  $('.boockup').css('transform', newStyle);
}
// this function return the corresponding angle for an x value
function getAngle(x) {
  return 360 - 180 * x;
}
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
}
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  )
}



  if ( $.cookie('activeuser') !== 'true' ) {
    $('.intro-logo').show();
  } else {
    $('.intro-logo').hide();
  }
  

  if ($.cookie('age-alert') === 'true') {
    $('.age-gate').hide();
  } else {
    $('.age-gate').show();
  }



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
    $.cookie('activeuser', true)
  })

  $('.age-gate').on('click', function () {

    $('.age-gate').hide(0);
    var date = new Date();
    date = date.setTime(date.getTime() /*+ 1000 * 60 * 60*/ );
    $.cookie('age-alert', true, {
      expires: date
    });

  })

  $('.age-gate a').not('#yes-button').on('click', function () {
    alert('Sorry! Come back in a few years!');
  })


  var myIndex = 0;
  var timer;

  function autoCarousel() {
    $('.container-book').addClass('no-animation')
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
      timer = setTimeout(autoCarousel, 500); // Change image every 250 milliseconds
    }
  }

  $('.story-link, .sub-link').not('.shop-link, .snipcart-add-item, .nohover').on('mouseenter', function () {
    var image = $(this).siblings('.item-lightbox').find('img')
    var book = $(this).siblings('.item-lightbox').find('.book-container')
    book.removeClass('no-animation')
    $(image).css('filter', 'blur(0px)')
    $('.item-lightbox').css('opacity', '0')
    $(this).siblings('.item-lightbox').show().css('opacity', '1');
    clearTimeout(timer);
  })

  $('.story-link, .sub-link').not('.shop-link, .snipcart-add-item, .nohover').on('mouseleave', function () {
    $('.item-lightbox').css('opacity', '0')
    $('.item-lightbox img').css('filter', 'blur(5px)')
    if ($('html').attr('data-current') == 'story') {
      autoCarousel();
    }
    
  })

  $('.story-link.shop-link').on('mouseenter', function () {
    $('.item-content, .item-lightbox').hide()
    $(this).siblings('.circle').css('background-color', 'black')
    $(this).parent().siblings('.item-lightbox').show()
    clearTimeout(timer)
  })

  $('.story-link.shop-link').on('click', function () {
    $(this).parent().siblings('.item-content').show()
    $(this).siblings('.circle').css('background-color', 'black')
  })

  $('.story-link.shop-link').not('.snipcart-add-item').on('mouseleave', function () {
    $('.item-lightbox').css('opacity', '0')
    $('.circle').css('background-color', 'transparent')
    autoCarousel();
  })
  
  if ($('html').attr('data-current') == 'story') {
    autoCarousel();
  }
  
});