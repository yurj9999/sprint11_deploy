import Api from './Api.js';
import Validation from './Validation.js';
import Popup from './Popup.js';

const dom=document.querySelector('.places-list');

const api=new Api(dom);
const valid=new Validation();
const popup=new Popup(dom, valid);

/*api.getProfile();
api.getCards();*/

export {api, popup};