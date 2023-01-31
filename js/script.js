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
         tabLinks.forEach((link, index)=> {
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
         days = (Math.floor(t / 1000/ 60/ 60/ 24));
         hours = (Math.floor(t / 1000/ 60/ 60) % 24);
         minutes = (Math.floor(t / 1000/ 60) % 60);
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

   const addZero = (number) => {
      if (number < 10) {
         return `0${number}`;
      }else {
         return number;
      }
   };

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
});