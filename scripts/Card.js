class Card{
  constructor(dom){
    this.dom=dom;
    this.cardContainer=document.createElement('div'); 
    this.imageOfCard=document.createElement('div');
    this.deleteButton=document.createElement('button');
    this.descriptionCard=document.createElement('div');
    this.nameOfCard=document.createElement('h3');  
    this.likeBlock=document.createElement('div');
    this.likeButton=document.createElement('button');
    this.likeCount=document.createElement('p');
  }

  addClassAndAttr(){  // метод для добавления атрибутов и классов созданным выше элементам
    this.cardContainer.classList.add('place-card');
    this.imageOfCard.classList.add('place-card__image');
    this.deleteButton.classList.add('place-card__delete-icon');
    this.descriptionCard.classList.add('place-card__description');
    this.nameOfCard.classList.add('place-card__name');
    this.likeBlock.classList.add('place-card__like-block');
    this.likeButton.classList.add('place-card__like-icon');
    this.likeCount.classList.add('place-card__like-count');
  }

  child(){ // метод для назначения родителя-ребенка
    this.cardContainer.appendChild(this.imageOfCard);
    this.cardContainer.appendChild(this.descriptionCard);
    this.imageOfCard.appendChild(this.deleteButton);
    this.descriptionCard.appendChild(this.nameOfCard);
    this.descriptionCard.appendChild(this.likeBlock);
    this.likeBlock.appendChild(this.likeButton);
    this.likeBlock.appendChild(this.likeCount);
  }

  create(cardsArray, likesCount){ // метод создания карточки
    this.addClassAndAttr();
    this.child();
    this.nameOfCard.textContent=cardsArray.name;
    this.likeCount.textContent=likesCount;
    const backgroundImg=`background-image: url(${cardsArray.link})`;
    this.imageOfCard.setAttribute('style', backgroundImg);
    return this.cardContainer;
  }
}