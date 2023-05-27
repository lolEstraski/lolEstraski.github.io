import { doLogout } from './api/login.js';
import { getObtenerRutas, doGetParadasPorRuta } from './api/ruta.js';

const loginTitle = document.querySelector('#userName');

const login = JSON.parse(localStorage.getItem('login'));

loginTitle.innerText = 'login.nombre';
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
      linkEditar.id = element.id;
      let editar = document.createTextNode("Ver");
      linkEditar.appendChild(editar);
      cell.appendChild(linkEditar);
      document.getElementById(element.id).addEventListener("click",renderMap);

    }
    
  }

  function listRutas(){
    getObtenerRutas().then(response => {
        rutas = response;
        if(rutas){

          generateTableHead(table, rutas[0]);
          generateTable(table, rutas);
        }
    });
  }

  function redirectToCrear(){
    window.location.href = "/ruta.html";
  }

  function renderMap(event){
    doGetParadasPorRuta(this.id).then(ruta=>{
      let origen = ruta.origen;
      let destino = ruta.destino;
      let map = document.querySelector('#map');
      map.src = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBCVdGMcZjYLIBRJAmNyh_3A3HJizfZ-yo&origin="+origen+"&destination="+destino+"&waypoints="+ ruta.paradas.join('|'); +"&mode=driving"
    });
  }

  let table = document.querySelector("#tb-rutas");
  generateTableHead(table, []);
  generateTable(table, rutas);
  listRutas();