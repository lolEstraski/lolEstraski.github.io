import { doLogout } from './api/login.js';
import { getObtenerRutas } from './api/ruta.js';

const loginTitle = document.querySelector('#userName');

const login = JSON.parse(localStorage.getItem('login'));

loginTitle.innerText = login.nombre;
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', doLogout);

let rutas = [
   
  ];
  
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of Object.keys(data)) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
    let th = document.createElement("th");
    let text = document.createTextNode('Opciones');
    th.appendChild(text);
    row.appendChild(th);
  }
  
  function generateTable(table, data) {
    let tBody = table.createTBody();
    for (let element of data) {
      let row = tBody.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      let cell = row.insertCell();
      let linkEditar = document.createElement("a");
      linkEditar.className = "btn btn-sm btn-outline-secondary";
      let editar = document.createTextNode("Ver");
      linkEditar.appendChild(editar);
      cell.appendChild(linkEditar);

    }
    
  }

  function listRutas(){
    getObtenerRutas().then(response => {
        rutas = response;
        generateTableHead(table, rutas[0]);
        generateTable(table, rutas);
    });
  }

  function redirectToCrear(){
    window.location.href = "/ruta.html";
  }

  let table = document.querySelector("#tb-rutas");
  generateTableHead(table, []);
  generateTable(table, rutas);
  listRutas();

  const btnCrearRuta = document.querySelector('#crearRuta');
  btnCrearRuta.addEventListener('click', redirectToCrear);
