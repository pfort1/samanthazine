var agegatecontainer = document.querySelector('.age-gate');
var introcontainer = document.querySelector('.intro-logo');

if ( sessionStorage.getItem('activeuser') !== 'true' ) {
  introcontainer.style.display = 'none';
} else {
  introcontainer.style.display = 'block';
}

if ( sessionStorage.getItem('age-alert') === 'true') {
  hideElement(agegatecontainer)
} else {
  showElement(agegatecontainer)
}

function activateAge(e) {

  e.preventDefault();
  sessionStorage.setItem('age-alert', true)

  hideElement(agegatecontainer)
  window.location = e.target.getAttribute('href');

}

function hideIntro() {
  hideElement(agegatecontainer)
  sessionStorage.setItem('activeuser', true)
}

function hideElement(e) {
  e.style.display = 'none';
}

function showElement(e) {
  e.style.display = 'block';
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
  setInterval(rotateCube, 40)
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
  return 360 - 360 * x;
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

  $('.story-link, .sub-link').not('.shop-link, .snipcart-add-item, .nohover').on('mouseenter', function () {
    var image = $(this).siblings('.item-lightbox').find('img')
    // var book = $(this).siblings('.item-lightbox').find('.book-container')
    // book.removeClass('no-animation')
    $(image).css('filter', 'blur(0px)')
    $('.item-lightbox').css('opacity', '0')
    $(this).siblings('.item-lightbox').show().css('opacity', '1');
    clearTimeout(timer);
  })

  $('.story-link.shop-link').on('mouseenter', function () {
    $('.item-content, .item-lightbox').hide()
    $(this).siblings('.circle').css('background-color', 'black')
    $(this).parent().siblings('.item-lightbox').show()
    clearTimeout(timer)
  })

  $('.story-link, .sub-link').not('.shop-link, .snipcart-add-item, .nohover').on('mouseleave', function () {
    $('.item-lightbox').css('opacity', '0')
    $('.item-lightbox img').css('filter', 'blur(5px)')
    autoCarousel()
  })
  
});


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
    timer = setTimeout(autoCarousel, 1000); // Change image every 250 milliseconds
  }
}

function showTab(e) {

  var id = e.target.getAttribute('id');

  if ( e.target.classList.contains('active') ) {

    e.target.classList.remove('active');
    document.querySelector( '.tabpane#' + id ).style.display = 'none';  
    document.querySelector( '.tabpane' ).style.display = 'block';  

    clearTimeout(timer);
    document.querySelector('.container-book').classList.remove('no-animation');

  } else {
    document.querySelectorAll('.tabpane').forEach(function(el){
      el.style.display = 'none';
    })
    document.querySelectorAll('.navlinkcontainer button').forEach(function(el){
      el.classList.remove('active');
    })
    e.target.classList.add('active');
    document.querySelector( '.tabpane#' + id ).style.display = 'block';  

    if ( id == 'Info' ) {
      autoCarousel();
      document.querySelector('.container-book').classList.add('no-animation');
    } else {
      clearTimeout(timer);
      document.querySelector('.container-book').classList.remove('no-animation');
    }

  }

}