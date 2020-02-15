/*-----------------------------------------------------------------------

  * Alfa Template v1.1 
  * Copyright 2019 The Alfa Author (https://themeforest.net/user/gianfar)

  =======================================================================*/

  "use strict";
  $(document).ready(function(){

  /* Preloader*/
  $('.preloader').delay(1900).fadeOut('slow');

  // ----------- events pjax(send,complete) -----------
  // preloader
  document.addEventListener('pjax:send', function() {
    NProgress.start();
  });

  // calls functions for pjax
  document.addEventListener('pjax:complete', function() {
    NProgress.done();
    functionBasedDelay();
    init();
    animeLine();
    form();
    reloadPage(); //for Googlemap
    });
//------------------------------------------------------

// background animation(lineDrawing.SVG)
function animeLine(){
  var lineDrawing = anime({
    targets: '#lineDrawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 3500,
    delay: function(el, i) { return i * 350 },
  });
}
animeLine();

  // text animation
  function functionBasedDelay(){
    var functionBasedDelay = anime({
      targets: '#functionBasedDelay .el',
      translateY: -100,
      direction: 'alternate',
      opacity: 1,
      loop: false,
      easing: [.91,-0.54,.29,1.56],
      delay: function(el, i, l) {
        return i * 30;
      }
    });
  }
  functionBasedDelay();

// --- init Pjax.js -----------------------------
var pjax = new Pjax({
  debug:false,
  analytics:true, 
  cacheBust:false,  
    elements: ".content-link", // default is "a[href], form[action]"
    selectors: ["title","#pjax-container",".nav-wide",".mobile-nav"],
  });

//reload page(for googleMap )
var pagePath = "/contact.html";// enter your path

function reloadPage(){
  var section = window.location.pathname;
  if(section == pagePath) {
    pjax.reload();
  } 
}


function init(){
// ----- Swiper Carousel ----------------------------
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
            // Responsive breakpoints
            breakpoints: {
        // when window width is <= 450px
        450: {
          slidesPerView: 1
        },
        // when window width is <= 768px
        767.98: {
          slidesPerView: 2
        }
      }      
    });

// --- initialize shuffle plugin ---------------

var $grid = $('#grid'),
filter = $('#filter a'); 

  // reshuffle when user clicks a filter item 
  filter.on('click',function (e) {

    e.preventDefault();
    // set active class
    filter.removeClass('active-filter');
    $(this).addClass('active-filter');
    // get group name from clicked item
    var groupName = $(this).attr('data-group');
    // reshuffle grid
    $grid.shuffle('shuffle', groupName );

  });

  $grid.imagesLoaded( function() {
  // images have loaded
  $grid.shuffle({
    itemSelector: '.item'
  }); 
});
/*-------------------------------------------*/

// Portfolio Page Magnific-popup
$('.image-link').magnificPopup({
  type: 'image',
  closeBtnInside: false,
  closeOnContentClick: true,
  mainClass:'mfp-fade',
  removalDelay: 500,
  gallery: {
    enabled: true,
    tCounter: '<span class="mfp-counter">%curr% / %total%</span>' ,
  }
});

// Home_Page (Magnific-popup)
  $('.image-link-home').magnificPopup({
    type: 'image',
    closeBtnInside: false,
    closeOnContentClick: true,
    mainClass:'mfp-fade',
  });

//menu text
$(".im-1").each(function(){
  var thisText = $(this).text();
  $(this).append('<span class="im-2">' + thisText + '</span>');
});

// progress-bar
$(".progress-bar").each(function(){
  var each_bar_width = $(this).attr('aria-valuenow');
  $(this).animate({width: each_bar_width + '%'})
});

 /* mobile navigation */
 $(".mobile-nav").on("click",function(){
  
    $('.nav-wide').toggleClass('on-nav');
    $('.mobile-nav').toggleClass('mobile-left');
    $('.ion-md-more').toggleClass('display-none');
    $('.ion-md-arrow-back').toggleClass('display-block');

});
 /*-----------------------------------------------------------------*/
}
//plugins initialization
init();

//==============================================================

});