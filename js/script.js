window.addEventListener('DOMContentLoaded', function () {

   // Tabs

   let tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {

      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   // Timer

   const deadline = '2023-06-11';

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

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return '0' + num;
      } else {
         return num;
      }
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

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadline);

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

   const modalTimerId = setTimeout(openModal, 300000);
   // Изменил значение, чтобы не отвлекало

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

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
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
         });
      })

   //getResource('http://localhost:3000/menu')
   //.then(data => {
   //data.forEach(({img, altimg, title, descr, price}) => {
   //new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
   // });
   // });

   // getResource('http://localhost:3000/menu')
   //     .then(data => createCard(data));

   // function createCard(data) {
   //     data.forEach(({img, altimg, title, descr, price}) => {
   //         const element = document.createElement('div');

   //         element.classList.add("menu__item");

   //         element.innerHTML = `
   //             <img src=${img} alt=${altimg}>
   //             <h3 class="menu__item-subtitle">${title}</h3>
   //             <div class="menu__item-descr">${descr}</div>
   //             <div class="menu__item-divider"></div>
   //             <div class="menu__item-price">
   //                 <div class="menu__item-cost">Цена:</div>
   //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
   //             </div>
   //         `;
   //         document.querySelector(".menu .container").append(element);
   //     });
   // }

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

   async function getResource(url) {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   }

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

   total.innerHTML = getZero(slides.length);
   current.innerHTML = getZero(slideIndex);

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
               current.innerHTML = getZero(slideIndex);
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
         current.innerHTML = getZero(slideIndex);
         offset = 0;
         slidesField.style.transform = `translateX(${offset}px)`;
         activeDots(dots, slideIndex);
      } else {
         slidesField.style.transform = `translateX(${offset -= width}px)`;
         slideIndex += 1;
         current.innerHTML = getZero(slideIndex);
         activeDots(dots, slideIndex);
      }
   });

   prevBtn.addEventListener('click', () => { //click prev button on slider
      if (slideIndex === 1) {
         slideIndex = slides.length;
         current.innerHTML = getZero(slideIndex);
         offset = -slidesField.clientWidth + width;
         slidesField.style.transform = `translateX(${(offset)}px)`;
         activeDots(dots, slideIndex);
      } else {
         slidesField.style.transform = `translateX(${offset += width}px)`;
         slideIndex -= 1;
         current.innerHTML = getZero(slideIndex);
         activeDots(dots, slideIndex);
      }
   });

   //Calc

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

   const showCulcResult = (gender, height, width, age, ratio) => {
      if (!gender || !height || !width || !age || !ratio) {
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

   showCulcResult(gender, height, width, age, ratio);

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
});