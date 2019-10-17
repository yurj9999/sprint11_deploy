import {api} from './script.js';
import {formEdit, formPlus} from './lang.js';

class Popup{
  constructor(dom, valid){
    this.valid=valid;
    this.dom=dom;
    this.formInput=document.forms.new.elements;
    this.formProfilePhoto=document.forms.photo.elements;
  
    this.btnOpenEditProfile=document.querySelector('.button-edit');
    this.btnOpenAddCard=document.querySelector('.addcard__button');
    this.btnClose=document.querySelectorAll('.popup__close');
    this.btnApply=document.querySelector('.popup__button');
    this.btnPhotoApply=document.querySelector('.profile-photo__button');
    this.firstInput=document.querySelector('.popup__input_type_name');
    this.secondInput=document.querySelector('.popup__input_type_link-url');
    this.photoProfileLink=document.querySelector('.input_link-photo-url');
    this.photoProfile=document.querySelector('.user-info__photo');

    this.firstInputError=document.querySelector('.error__first-input');
    this.secondInputError=document.querySelector('.error__second-input');
    this.photoInputError=document.querySelector('.error__photo-url-input');

    this.dom.addEventListener('click', (e) => this.photo(e));
    this.photoProfile.addEventListener('click', (e)=>this.open(e));
    this.btnOpenEditProfile.addEventListener('click', (e) => this.open(e));
    this.btnOpenAddCard.addEventListener('click', (e) => this.open(e));
    this.btnApply.addEventListener('click', (e) => this.apply(e));
    this.btnPhotoApply.addEventListener('click', (e) => this.applyPhoto(e));
    this.firstInput.addEventListener('input', (e) => this.valid.checkFirstInputForErrors(e));
    this.secondInput.addEventListener('input', (e) => this.valid.checkSecondInputForErrors(e));
    this.photoProfileLink.addEventListener('input', (e) => this.valid.checkSecondInputForErrors(e));

    Array.from(this.btnClose).forEach((item) => {
      item.addEventListener('click', (e) => this.close(e));
    });
  }

  loading(isLoading){ // метод, добавляющий надпись "Загрузка ..." на кнопку попап-формы во время загрузки данных на сервер
    if (isLoading) document.querySelector('.profile-photo__button').textContent='Загрузка ...';
  }

  photo(e){ // метод для всплывающего окна с увеличенной фотографией карточки
    if (e.target.classList.contains('place-card__image')) {
      document.querySelector('.popup-photo').classList.add('popup_is-opened');
      const image = e.target.style.backgroundImage;
      const sliceImg = image.slice(5, image.length-2);
      const photo = document.querySelector('.popup-photo__main');
      photo.setAttribute('src', sliceImg);
    }
  }
  
  apply(e){ // метод для кнопки отправки данных на сервер, на попап-формах с редактированием фотографии, 
            // редактированием профиля, добавления карточки    
    const plus='plus';
    const edit='edit';
    if (this.formInput.btn.getAttribute('id') === plus) {
      this.loading(true);
      api.addCard(e); // метод добавления карточки на сервер
    }
    if (this.formInput.btn.getAttribute('id') === edit) {
      this.loading(true);
      api.changeProfile(e); // метод отправки обновленных данных профиля на сервер
    }
  }

  applyPhoto(e){ // метод для кнопки формы редактирования фотографии профиля
    this.loading(true);
    api.changePhotoProfile(e); // метод отправки нового аватара на сервер
  }
  
  open(e){ // метод открытия попап-форм редактирования фото профиля, редактирования данных профиля, добавления карточки
    if (e.target.classList.contains('button-edit')) { // открытие попап-формы редактирования профиля
      this.makeForm(formEdit); // метод создания попап-форм редактирования профиля и добавления карточек, 
                               // в зависимости от объекта с данными полей формы, передаваемого в этот метод        
      this.formInput.btn.classList.add('popup__button_active');
      this.formInput.btn.removeAttribute('disabled', '');
      this.firstInputError.textContent='';
      this.secondInputError.textContent='';
    }
    if (e.target.classList.contains('addcard__button')) { // открытие попап-формы добавления карточки
      this.makeForm(formPlus);
      this.formInput.btn.classList.remove('popup__button_active');
      this.formInput.btn.setAttribute('disabled', '');
      this.firstInputError.textContent='';
      this.secondInputError.textContent='';
    }
    if (e.target.classList.contains('user-info__photo')) { // открытие попап-формы редактирования фотографии, так как внешний 
                                                           // вид формы меняется, метод makeForm не применяется
      this.formProfilePhoto.ppBtn.classList.remove('popup__button_active');
      this.formProfilePhoto.ppBtn.setAttribute('disabled', '');
      document.querySelector('.profile-photo').classList.add('popup_is-opened');  
      this.photoInputError.textContent='';
    }
  }
  
  close(e){ // метод закрытия попап-форм
    document.querySelector('.popup').classList.remove('popup_is-opened');   
    document.querySelector('.popup-photo').classList.remove('popup_is-opened');  
    document.querySelector('.profile-photo').classList.remove('popup_is-opened');
    document.querySelector('.error__first-input').textContent='';
    document.querySelector('.error__second-input').textContent='';
    document.querySelector('.error__photo-url-input').textContent='';
  }
  
  setAttrForMakeFormMethod(formObject){ // добавляет атрибуты элементам формы для makeForm
    this.formInput.name.setAttribute('placeholder', formObject.input1Title);
    this.formInput.link.setAttribute('placeholder', formObject.input2Title);
    this.formInput.btn.setAttribute('id',formObject.formId);
    this.formInput.link.setAttribute('type', formObject.input2Type);
    this.formInput.link.setAttribute('minlength', formObject.input2MinLength);
    this.formInput.link.setAttribute('maxlength', formObject.input2MaxLength);  
    this.formInput.btn.setAttribute('style',formObject.btnStyle);
  }
  
  addTextForMakeFormMethod(formObject){ // добавляет текст в элементы формы для makeForm
    document.querySelector('.popup__title').textContent=formObject.title;
    this.formInput.name.value=formObject.input1Value;
    this.formInput.link.value=formObject.input2Value;
    this.formInput.btn.textContent=formObject.btnTitle;
  }

  makeForm(formObject){  // метод создания попап-формы 
    this.setAttrForMakeFormMethod(formObject);
    this.addTextForMakeFormMethod(formObject);
    document.querySelector('.popup').classList.add('popup_is-opened');
  }
}

export default Popup;