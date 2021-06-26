'use strict';

gsap.registerPlugin(ScrollToPlugin);

var toggleClass = function toggleClass(element) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'is-active';
  if (!element.nodeName) element = document.querySelector(element);
  element.classList.toggle(className);
};

var isElementInViewport = function isElementInViewport(element) {
  if (!element.nodeName) element = document.querySelector(element);
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

document.addEventListener('DOMContentLoaded', function () {
  var tweenHeroImg = function tweenHeroImg() {
    return gsap.from('.hero__img', {
      opacity: 0.2,
      yPercent: -101,
      duration: 4,
      ease: 'power4'
    });
  };

  var tween = function tween(target) {
    return gsap.fromTo(target, {
      y: -300,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 4,
      ease: 'power4'
    });
  };

  var mediaTablet = 768;

  if (window.matchMedia("(min-width: ".concat(mediaTablet, "px)")).matches) {
    tweenHeroImg();
    tween('.card__item').delay(0.5);
    tween('.articles__item').delay(1);
  } else {
    window.addEventListener('scroll', function () {
      if (isElementInViewport('.hero__img')) {
        tweenHeroImg();
      }

      if (isElementInViewport('h1')) {
        tween('.card__item');
      }

      if (isElementInViewport('.card__item:last-child')) {
        tween('.articles__item');
      }
    });
  }

  var btnBurger = document.querySelector('.burger'); // burger click

  btnBurger.addEventListener('click', function () {
    var navMenu = document.querySelector('.header-nav');
    var navItem = document.querySelectorAll('.header-menu__item');
    var menuTimeline = gsap.timeline({
      paused: true
    }); //  initial state

    gsap.set(navMenu, {
      scaleX: 0.2,
      opacity: 0
    });
    gsap.set(navItem, {
      opacity: 0,
      y: -100
    }); // animation time line

    menuTimeline.to(navMenu, {
      scaleX: 1,
      opacity: 1
    }).to(navItem, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    });
    toggleClass(btnBurger);
    toggleClass(navMenu);
    toggleClass('body', 'no-scroll');

    if (btnBurger.classList.contains('is-active')) {
      menuTimeline.play();
    } else {
      menuTimeline.reverse();
    }
  }); // scroll

  var click = new Event('click');
  document.querySelectorAll('a[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var scrollToID = e.target.getAttribute('href');
      var offset = 20;

      var scrollToTop = function scrollToTop() {
        return gsap.to(window, {
          delay: 0,
          duration: 2,
          scrollTo: {
            y: 0,
            offsetY: offset
          },
          ease: 'power2'
        });
      };

      var mediaLaptop = 1024;

      if (e.target.hasAttribute('data-close')) {
        if (!window.matchMedia("(min-width: ".concat(mediaLaptop, "px)")).matches) {
          btnBurger.dispatchEvent(click);
        }

        if (scrollToID !== '#') {
          gsap.to(window, {
            delay: 0,
            duration: 2,
            scrollTo: {
              y: scrollToID,
              offsetY: offset
            },
            ease: 'power2'
          });
        } else {
          scrollToTop();
        }
      } else {
        scrollToTop();
      }
    });
  });
});