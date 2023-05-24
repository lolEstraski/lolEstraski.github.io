//imports
import { doLogin } from './api/login.js';
// selectors: 

const loginButton = document.querySelector('#login');

//events:

loginButton.addEventListener('click', doLogin);