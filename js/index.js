import { doLogout } from './api/login.js';

const loginTitle = document.querySelector('#userName');
const logoutButton = document.querySelector('#logout');

const login = JSON.parse(localStorage.getItem('login'));

loginTitle.innerText = login.nombre;
logoutButton.addEventListener('click', doLogout);