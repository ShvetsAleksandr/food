document.addEventListener('DOMContentLoaded', () => {
   //Tab script
   const tabsContent = document.querySelectorAll('.tabcontent'),
      tabLinks = document.querySelectorAll('.tabheader__item'),
      tabLinksContainer = document.querySelector('.tabheader__items');

   const hideTabContent = () => {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabLinks.forEach(link => {
         link.classList.remove('tabheader__item_active');
      });
   };

   const showTabContent = (i = 0) => {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabLinks[i].classList.add('tabheader__item_active');
   };

   hideTabContent();
   showTabContent();

   tabLinksContainer.addEventListener('click', (ev) => {
      const target = ev.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabLinks.forEach((link, index) => {
            if (link == target) {
               hideTabContent();
               showTabContent(index);
            }
         });
      }
   });

   //Timer script

   const endTime = '2023-04-11';

   const getTimeToEnd = (endTime) => {
      const t = Date.parse(endTime) - Date.parse(new Date());
      let days = 0,
         hours = 0,
         minutes = 0,
         seconds = 0;
      if (t > 0) {
         days = (Math.floor(t / 1000 / 60 / 60 / 24));
         hours = (Math.floor(t / 1000 / 60 / 60) % 24);
         minutes = (Math.floor(t / 1000 / 60) % 60);
         seconds = (Math.floor(t / 1000) % 60);
      }
      return {
         t,
         days,
         hours,
         minutes,
         seconds
      };
   };

   const setTimeToEnd = () => {
      const t = writeTimeToEnd(endTime, '.timer');
      const intervalID = setInterval(setTimeToEnd, 1000);
      if (t <= 0) {
         clearInterval(intervalID);
      }
   };

   const addZero = (number) => number < 10 ? `0${number}` : number;

   const writeTimeToEnd = (endTime, target) => {
      const endDate = getTimeToEnd(endTime);
      const timerContainer = document.querySelector(target);
      const days = timerContainer.querySelector('#days');
      const hours = timerContainer.querySelector('#hours');
      const minutes = timerContainer.querySelector('#minutes');
      const seconds = timerContainer.querySelector('#seconds');


      days.innerHTML = addZero(endDate.days);
      hours.innerHTML = addZero(endDate.hours);
      minutes.innerHTML = addZero(endDate.minutes);
      seconds.innerHTML = addZero(endDate.seconds);

      return endDate.t;
   };

   writeTimeToEnd(endTime, '.timer');
   setTimeToEnd();

   //Modal

   const modalBtns = document.querySelectorAll('[data-modal-btn'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close'),
      modalDialog = document.querySelector('.modal');

   let timeoutID;

   const showModal = () => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      clearInterval(timeoutID);
   };

   timeoutID = setTimeout(showModal, 15000);

   const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
   };

   modalBtns.forEach(element => {
      element.addEventListener('click', (e) => {
         showModal();
      });
   });

   modalClose.addEventListener('click', (e) => {
      closeModal();
   });

   document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   modalDialog.addEventListener('click', (e) => {
      if (modalDialog == e.target) {
         closeModal();
      }
   });

   const showByScroll = () => {
      if (document.documentElement.clientHeight +
         document.documentElement.scrollTop === document.documentElement.scrollHeight) {
         showModal();
         document.removeEventListener('scroll', showByScroll);
      }

   };

   document.addEventListener('scroll', showByScroll);

   //Add menu cards
   const menuContainer = document.querySelector('.menu .container');

   class Menu {
      constructor(src, alt, title, text, price) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.text = text;
         this.price = price;
      }
   }

   const addClassToElement = (element, ...classes) => {
      classes.forEach(clas => {
         element.classList.add(clas);
      });
   };

   const addMenuItem = (place, menuItem, ...classes) => {
      const div = document.createElement('div');
      addClassToElement(div, ...classes);
      
      div.innerHTML = `
      <img src=${menuItem.src} alt=${menuItem.alt}>
         <h3 class="menu__item-subtitle">${menuItem.title}</h3>
         <div class="menu__item-descr">${menuItem.text}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${menuItem.price}</span> грн/день</div>
      </div>`;

      place.append(div);
   };

   addMenuItem(menuContainer, new Menu(
      'img/tabs/vegy.jpg',
      'vegy',
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      229
   ),
   'menu__item'   
   );

   addMenuItem(menuContainer, new Menu(
      'img/tabs/elite.jpg',
      'elite',
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      550
   ),
   'menu__item'
   );

   addMenuItem(menuContainer, new Menu(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      430
   ),
   'menu__item'
   );

   //Forms

   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо. В скором времени мы с вами свяжемся!',
      failure: 'Что-то пошло не так (',
   };

   const postData = (form) => {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('div');
         statusMessage.textContent = message.loading;
         form.append(statusMessage);

         const req = new XMLHttpRequest();
         req.open('POST', 'server.php');
         
         const formData = new FormData(form);
         req.send(formData);

         req.addEventListener('load', () => {
            if (req.status === 200) {
               console.log(req.response);
               statusMessage.textContent = message.success;
            }else {
               statusMessage.textContent = message.failure;
            }
         });

      });
   };

   forms.forEach(form => {
      postData(form);
   });
});