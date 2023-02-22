import timer from './modules/timer';
import getZero from './modules/getZero';
import calc from './modules/calc';
import tabs from './modules/tabs';
import renderMenuCard from './modules/renderMenuCard';

window.addEventListener('DOMContentLoaded', function() {

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2023-06-11');
   calc();
   renderMenuCard(".menu .container");

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
});