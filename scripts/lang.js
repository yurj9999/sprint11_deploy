formInput=document.forms.new.elements;

formEdit = { //объект с данными для создания формы редактирования профиля
    title: 'Редактировать профиль', //заголовок формы
    input1Title: 'Имя', //название первого поля ввода
    input2Title: 'О себе',//название второго поля ввода
    input1Value: '',  //исходный текст первого поля ввода
    input2Value: '', //исходный текст второго поля ввода
    input2Type: 'text', //тип второго поля ввода - текст или url
    formId: 'edit', // идентификатор формы
    input2MinLength: 2, // минимальная длинна поля
    input2MaxLength: 30, // максимальная длинна поля
    btnTitle: 'Сохранить', //надпись на кнопке
    btnStyle: '', //стиль текста кнопки
  };
  
  formPlus = { //объект с данными для создания формы добавления карточки
    title: 'Новое место',
    input1Title: 'Название',
    input2Title: 'Ссылка на картинку',
    input1Value: '',
    input2Value: '',
    input2Type: 'url',
    formId: 'plus',
    input2MinLength: '',
    input2MaxLength: '',
    btnTitle: '+',
    btnStyle: 'font-size: 40px;'
  };

  objInput1={ // объект, содержащий параметры для метода проверки поля ввода - checkForValid
    input1: formInput.name, //первое поле
    errorClass: '.error__first-input', //класс содержащий сообщение об ошибке
    message1: 'Это обязательное поле', //сообщение об ошибке №1
    message2: 'Должно быть от 2 до 30 символов', //сообщение об ошибке №2
    input2: formInput.link //второе поле
  }

  objInput2={ 
    input1: formInput.link, 
    errorClass: '.error__second-input', 
    message1: 'Это обязательное поле',
    message2: 'Должно быть от 2 до 30 символов', 
    input2: formInput.name 
  }

  objInput2Url={
    input1: formInput.link, 
    errorClass: '.error__second-input', 
    message1: 'Это обязательное поле',
    message2: 'Здесь должна быть ссылка', 
    input2: formInput.name
  }