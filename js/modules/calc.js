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

export default calc;