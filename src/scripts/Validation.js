import {objInput1, objInput2, objInput2Url} from './lang.js';

class Validation{
  constructor(){
    this.formInput=document.forms.new.elements;
    this.formProfilePhoto=document.forms.photo.elements;
  }

  errorMessage(classError, message){ // метод для вывода текста ошибки поля ввода, для формы редактирования профиля 
                                     // и формы добавления карточки
    document.querySelector(classError).textContent=message;
    this.formInput.btn.classList.remove('popup__button_active');
    this.formInput.btn.setAttribute('disabled', '');
  }

  errorMessageProfilePhoto(classError, message){ // метод для вывода текста ошибки поля ввода, для формы редактирования фотографии профиля
    document.querySelector(classError).textContent=message;
    this.formProfilePhoto.ppBtn.classList.remove('profile-photo__button_active');
    this.formProfilePhoto.ppBtn.setAttribute('disabled', '');
  }

  validTrue(){ // метод активации кнопки формы, в случае удачной валидации
    this.formInput.btn.classList.add('popup__button_active');
    this.formInput.btn.removeAttribute('disabled', '');
  }
  
  checkForValid(objValid){ // метод проверки валидации
    if (objValid.input1.validity.valueMissing) {
      this.errorMessage(objValid.errorClass, objValid.message1);
    } else if (!objValid.input1.checkValidity()) {
      this.errorMessage(objValid.errorClass, objValid.message2);
    } else {
      if ((!objValid.input2.validity.valueMissing) && (objValid.input2.checkValidity())) this.validTrue();
      document.querySelector(objValid.errorClass).textContent='';
    }
  }

  checkFirstInputForErrors(e){ // проверка на ошибки первого поля ввода
    this.checkForValid(objInput1);
  }
  
  checkSecondInputForErrors(e){ // проверка на ошибки второго поля ввода
    const text='text';
    const url='url';
  
    if (this.formInput.link.getAttribute('type') === text) this.checkForValid(objInput2); // проверяем второе поле ввода формы 
                                                                                          // редактирования профиля
    if (this.formInput.link.getAttribute('type') === url) this.checkForValid(objInput2Url); // проверяем второе поле ввода формы 
                                                                                            // добавления карточки
    if (this.formProfilePhoto.ava.getAttribute('type') === url) { // проверяем второе поле ввода формы редактирования фотографии профиля, 
                                                                  // так как в форме только одно поле ввода, то метод проверки 
                                                                  // checkForValid не подходит, прописываем проверку отдельно
      if (this.formProfilePhoto.ava.validity.valueMissing) {
        this.errorMessageProfilePhoto('.error__photo-url-input', 'Это обязательное поле');
      } else if (!this.formProfilePhoto.ava.checkValidity()) {
        this.errorMessageProfilePhoto('.error__photo-url-input', 'Здесь должна быть ссылка');
      } else {
        this.formProfilePhoto.ppBtn.classList.add('profile-photo__button_active');
        this.formProfilePhoto.ppBtn.removeAttribute('disabled', '');
        document.querySelector('.error__photo-url-input').textContent='';
      } 
    }
  }
}

export default Validation;