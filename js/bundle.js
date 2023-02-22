/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

      const genderContainer = document.querySelectorAll('#gender div'),
      chooseContainer = document.querySelectorAll('.calculating__choose_big div'),
      calcResult = document.querySelector('.calculating__result span'),
      inputs = document.querySelectorAll('.calculating__choose_medium input');

let gender, height, weight, age, ratio;

gender = localStorage.getItem('gender') ? localStorage.getItem('gender') : 'female';
ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

const showDefaultActivateItem = (gender, ratio) => {
   if (gender === 'female') {
      activateItem(genderContainer, 'calculating__choose-item_active', 0);
   } else {
      activateItem(genderContainer, 'calculating__choose-item_active', 1);
   }
   let i; 
   switch(+ratio) {
      case 1.2: i = 0;
         break;
      case 1.375: i = 1;
         break;
      case 1.55: i = 2
         break;
      case 1.725: i = 3;
         break;
   }

   activateItem(chooseContainer, 'calculating__choose-item_active', i);
};

showDefaultActivateItem(gender, ratio);

const showCulcResult = (gender, height, weight, age, ratio) => {
   if (!gender || !height || !weight || !age || !ratio) {
      calcResult.innerHTML = '______';
      return;
   }

   if (gender == 'female') {
      calcResult.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
   }
   if (gender == 'male') {
      calcResult.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
   }
};

showCulcResult(gender, height, weight, age, ratio);

function activateItem(itemList, activeClass, index){ 
   itemList.forEach(item => {
      item.classList.remove(activeClass);
   });

   itemList[index].classList.add(activeClass);
};

const listenerForItem = (itemList) => {
   itemList.forEach( (item, index) => {
      item.addEventListener('click', e => {
         let i;;

         if (item === e.currentTarget) {
            i = index;
            if(e.currentTarget.closest('#gender')) {
               gender = e.currentTarget.getAttribute('id');
               localStorage.setItem('gender', gender);
            }

            if(e.currentTarget.closest('.calculating__choose_big')) {
               const value = e.currentTarget.getAttribute('id');
               switch(value) {
                  case 'low': ratio = 1.2;
                     break;
                  case 'small': ratio = 1.375;
                     break;
                  case 'medium': ratio = 1.55;
                     break;
                  case 'high': ratio = 1.725;
                     break;
               }

               localStorage.setItem('ratio', ratio);
            }
         }
         activateItem(itemList, 'calculating__choose-item_active', i);
         showCulcResult(gender, height, weight, age, ratio);
      });
   })
};

const checkedInputOnlyNumber = (event) => {
   if (event.target.value.match(/\D/g)) {
      event.target.style.border = '1px solid red';
   }else {
      event.target.style.border = 'none';
   }
};

const listenerForInput = (inputs) => {
   inputs.forEach( input => {
      input.addEventListener('input', e => {
         if (e.target.getAttribute('id') === 'height'){
            checkedInputOnlyNumber(e);
            height = +e.target.value;
         }
         if (e.target.getAttribute('id') === 'weight'){
            checkedInputOnlyNumber(e);
            weight = +e.target.value;
         }
         if (e.target.getAttribute('id') === 'age'){
            checkedInputOnlyNumber(e);
            age = +e.target.value;
         }
         showCulcResult(gender, height, weight, age, ratio);
      });
   });
};

listenerForInput(inputs);
listenerForItem(genderContainer);
listenerForItem(chooseContainer);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/getZero.js":
/*!*******************************!*\
  !*** ./js/modules/getZero.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getZero(num) {
   if (num >= 0 && num < 10) {
      return '0' + num;
   } else {
      return num;
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getZero);

/***/ }),

/***/ "./js/modules/renderMenuCard.js":
/*!**************************************!*\
  !*** ./js/modules/renderMenuCard.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderMenuCard(parentSelector) {
      // Используем классы для создание карточек меню

      class MenuCard {
         constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
         }
   
         changeToUAH() {
            this.price = this.price * this.transfer;
         }
   
         render() {
            const element = document.createElement('div');
   
            if (this.classes.length === 0) {
               this.classes = "menu__item";
               element.classList.add(this.classes);
            } else {
               this.classes.forEach(className => element.classList.add(className));
            }
   
            element.innerHTML = `
                  <img src=${this.src} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descr}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>
            `;
            this.parent.append(element);
         }
      }
   
      axios.get('http://localhost:3000/menu')
         .then((data) => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
               new MenuCard(img, altimg, title, descr, price, parentSelector).render();
            });
         })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderMenuCard);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelectors, tabsContentSelectors, tabsParentSelector, activeClass) {

   const tabs = document.querySelectorAll(tabsSelectors),
   tabsContent = document.querySelectorAll(tabsContentSelectors),
   tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() {

      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.classList.contains(tabsSelectors.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getZero */ "./js/modules/getZero.js");


function timer(timer, deadline) {

      function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
   
         return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
         };
      }
   
      function setClock(selector, endtime) {
   
         const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
   
         updateClock();
   
         function updateClock() {
            const t = getTimeRemaining(endtime);
   
            days.innerHTML = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(t.days);
            hours.innerHTML = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(t.hours);
            minutes.innerHTML = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(t.minutes);
            seconds.innerHTML = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(t.seconds);
   
            if (t.total <= 0) {
               clearInterval(timeInterval);
            }
         }
      }
      setClock(timer, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_getZero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/getZero */ "./js/modules/getZero.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_renderMenuCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/renderMenuCard */ "./js/modules/renderMenuCard.js");






window.addEventListener('DOMContentLoaded', function() {

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__["default"])('.timer', '2023-06-11');
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_renderMenuCard__WEBPACK_IMPORTED_MODULE_4__["default"])(".menu .container");

   // Modal

   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 50000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

   // Forms

   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      let res = await fetch(url, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: data
      });

      return await res.json();
   };


   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            });
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
            <div class="modal__content">
               <div class="modal__close" data-close>×</div>
               <div class="modal__title">${message}</div>
            </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

   //Slider 
   const slides = document.querySelectorAll('.offer__slide'),
      nextBtn = document.querySelector('.offer__slider-next'),
      prevBtn = document.querySelector('.offer__slider-prev'),
      current = document.querySelector('#current'),
      total = document.querySelector('#total'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = slidesWrapper.clientWidth;

   let slideIndex = 1;
   let offset = 0;


   slidesField.style.width = 100 * slides.length + '%';

   slides.forEach((slide) => {
      slide.style.width = width + 'px';
   });

   total.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slides.length);
   current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);

   const slider = document.querySelector('.offer__slider');

   slider.style.position = 'relative';

   const carouselIndicators = document.createElement('ol');

   slides.forEach(slide => {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      carouselIndicators.append(dot);
   });

   carouselIndicators.classList.add('carousel-indicators');
   carouselIndicators.style.position = 'absolute';
   slider.append(carouselIndicators);


   const dots = document.querySelectorAll('.dot');
   dots[0].classList.add('active');

   dots.forEach(dot => { //change slide after click on dots
      dot.addEventListener('click', (e) => {
         dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (dot === e.currentTarget) {
               slideIndex = index + 1;
               current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);
               offset = -(index * width);
               slidesField.style.transform = `translateX(${(offset)}px)`;
            }
         });
         e.target.classList.add('active');
      });
   });

   const activeDots = (dots, index) => { // add active class to dot by index
      dots.forEach(dot => {
         dot.classList.remove('active');
      })
      dots[index - 1].classList.add('active');
   };

   nextBtn.addEventListener('click', () => { //click next button on slider
      if (slideIndex === slides.length) {
         slideIndex = 1;
         current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);
         offset = 0;
         slidesField.style.transform = `translateX(${offset}px)`;
         activeDots(dots, slideIndex);
      } else {
         slidesField.style.transform = `translateX(${offset -= width}px)`;
         slideIndex += 1;
         current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);
         activeDots(dots, slideIndex);
      }
   });

   prevBtn.addEventListener('click', () => { //click prev button on slider
      if (slideIndex === 1) {
         slideIndex = slides.length;
         current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);
         offset = -slidesField.clientWidth + width;
         slidesField.style.transform = `translateX(${(offset)}px)`;
         activeDots(dots, slideIndex);
      } else {
         slidesField.style.transform = `translateX(${offset += width}px)`;
         slideIndex -= 1;
         current.innerHTML = (0,_modules_getZero__WEBPACK_IMPORTED_MODULE_1__["default"])(slideIndex);
         activeDots(dots, slideIndex);
      }
   });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map