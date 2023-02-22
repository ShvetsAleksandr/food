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

export default tabs;