import { registrarPasajero } from '../api/pasajero.js';

const registroButton = document.querySelector('#registrar');
registroButton.addEventListener('click', registrarPasajero)