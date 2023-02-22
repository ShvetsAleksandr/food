function closeModal(modalSelector) {
   modal = document.querySelector(modal);
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}

function openModal(modalSelector) {
   modal = document.querySelector(modal);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
   clearInterval(modalTimerId);
}

function modal(modalTriggerSelectors, modalSelector) {
   
   const modalTrigger = document.querySelectorAll(modalTriggerSelectors, modalSelector),
         modal = document.querySelector('.modal');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

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
}

export default modal;
export {closeModal};
export {openModal};