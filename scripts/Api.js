class Api{
    constructor(dom){
        this.dom=dom;
        this.formInput=document.forms.new.elements;
        this.formProfilePhoto=document.forms.photo.elements;
        this.userId='0c603faee0499295f7e55119';
        this.myId='47d77922-65c2-4926-ba2e-f1edb769a656';

    }

    getProfile(){ // загрузка профиля
        fetch('http://95.216.175.5/cohort3/users/me',{
            headers: {
                authorization: this.myId
            }
        })
        .then((res)=>{
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data)=>{
            formEdit.input1Value=data.name; // в свойства объекта из lang.js передаем имя и работу, чтобы при открытии попап формы эти
                                            // данные отображались в ней
            formEdit.input2Value=data.about;

            document.querySelector('.user-info__name').textContent=data.name;
            document.querySelector('.user-info__job').textContent=data.about;
            document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${data.avatar})`);
        })
        .catch((err) => {
            alert(err);
        })
    }

    getCards(){ // загрузка карточек
        fetch('http://95.216.175.5/cohort3/cards', {
            headers: {
                authorization: this.myId
            }
        })
        .then((res)=>{
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data)=>{
            data.forEach((item, index)=>{
                let cardId=item._id;
                const newCard=new Card(this.dom);
                const createCard=newCard.create(item, data[index].likes.length);
                const deleteIcon=createCard.querySelector('.place-card__delete-icon');
                const likeIcon=createCard.querySelector('.place-card__like-icon');

                if (item.owner._id === this.userId) { // проверка - если карточка моя, то на ней отображается иконка удаления
                    deleteIcon.setAttribute('style', 'display: block');
                    deleteIcon.addEventListener('click', (e) => this.deleteCard(e, cardId));
                }
                likeIcon.addEventListener('click', (e) => this.likeCard(e, cardId));
                item.likes.forEach((item, index)=>{ // проверяем на каких карточках есть мои лайки
                    if (item._id === this.userId) {
                        likeIcon.classList.add('place-card__like-icon_liked');
                        likeIcon.setAttribute('id', 'isLiked');
                    }
                })
                this.dom.appendChild(createCard);  
            });
        })
        .catch((err) => {
            alert(err);
        })
    }

    changeProfile(e){ // метод редактирования профиля
        e.preventDefault();
        const input1=document.querySelector('.user-info__name');
        const input2=document.querySelector('.user-info__job');
        let nameInput=this.formInput[0].value;
        let jobInput=this.formInput[1].value; 

        popup.loading(true);
        fetch('http://95.216.175.5/cohort3/users/me',{
            method: 'PATCH',
            headers: {
                authorization: this.myId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput,
                about: jobInput,
            }) 
        })
        .then((res)=>{
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data)=>{ // передаем в объект из lang.js данные
            input1.textContent=data.name;
            input2.textContent=data.about;
            formEdit.input1Value=data.name;
            formEdit.input2Value=data.about;
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            popup.loading(false);
        })        
        document.querySelector('.popup').classList.remove('popup_is-opened');        
    }

    changePhotoProfile(e){ // метод смены фотографии
        e.preventDefault();
        const photo=this.formProfilePhoto[0].value;

        popup.loading(true);
        fetch('http://95.216.175.5/cohort3/users/me/avatar',{
            method: 'PATCH',
            headers: {
                authorization: this.myId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: photo
            })
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${data.avatar})`);
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            popup.loading(false);
        })
        document.querySelector('.profile-photo').classList.remove('popup_is-opened'); 
    }

    addCard(e){ // метод добавления карточки
        e.preventDefault();
        let namePic=this.formInput[0].value;
        let pathPic=this.formInput[1].value;

        popup.loading(true);
        fetch('http://95.216.175.5/cohort3/cards',{
            method: 'POST',
            headers: {
                authorization: this.myId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: namePic, 
                link: pathPic
            }) 
        })
        .then((res)=>{
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data)=>{
                let cardId=data._id;
                const newCard=new Card(this.dom);
                const createCard=newCard.create(data, '0');
                const deleteIcon=createCard.querySelector('.place-card__delete-icon');

                deleteIcon.setAttribute('style', 'display: block');
                deleteIcon.addEventListener('click', (e) => {
                    this.deleteCard(e, cardId);
                });    
                createCard.querySelector('.place-card__like-icon').addEventListener('click', (e) => this.likeCard(e, cardId));
                this.dom.appendChild(createCard);
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            popup.loading(false);
        })
        document.querySelector('.popup').classList.remove('popup_is-opened');
    }

    deleteCard(e, cardId){ // метод удаления карточки
        if (window.confirm('Вы действительно хотите удалить эту карточку ?')) {
            fetch(`http://95.216.175.5/cohort3/cards/${cardId}`,{
                method: 'DELETE',
                headers: {
                    authorization: this.myId
                }
            })
            .then((res)=>{
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(()=>{
                this.dom.removeChild(e.target.parentElement.parentElement);
            })
            .catch((err) => {
                alert(err);
            })
        }
    }

    likeCard(e, cardId){ // метод лайка карточки
        if (e.target.getAttribute('id') === 'isLiked') { // проверяем есть лайк или нет
            fetch(`http://95.216.175.5/cohort3/cards/like/${cardId}`,{
                method: 'DELETE',
                headers: {
                    authorization: this.myId
                }
            })
            .then((res)=>{
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data)=>{
                e.target.classList.remove('place-card__like-icon_liked');
                e.target.parentElement.querySelector('.place-card__like-count').textContent=data.likes.length;
                e.target.removeAttribute('id');
            })
            .catch((err) => {
                alert(err);
            })
        } else {
            fetch(`http://95.216.175.5/cohort3/cards/like/${cardId}`,{
                method: 'PUT',
                headers: {
                    authorization: this.myId
                }
            })
            .then((res)=>{
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data)=>{
                e.target.classList.add('place-card__like-icon_liked');
                e.target.parentElement.querySelector('.place-card__like-count').textContent=data.likes.length;
                e.target.setAttribute('id', 'isLiked');
            })
            .catch((err) => {
                alert(err);
            })
        }
    }
}