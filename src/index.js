import './style.css';
import {api} from './scripts/script.js';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

api.getProfile();
api.getCards();

export {serverUrl};