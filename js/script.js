document.addEventListener('DOMContentLoaded', () => {

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
});