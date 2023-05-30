import { doLogout } from '../api/login.js';
import { getObtenerRutas, elimarRuta, doGetParadasPorRuta } from '../api/ruta.js';
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', doLogout);
const loginTitle = document.querySelector('#userName');

const login = JSON.parse(localStorage.getItem('login'));

loginTitle.innerText = login.nombre;
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
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let row = tBody.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      let cell = row.insertCell();
      let linkEditar = document.createElement("a");
      linkEditar.className = "btn btn-sm btn-outline-secondary";
      linkEditar.id = i;
      let editar = document.createTextNode("Editar");
      linkEditar.appendChild(editar);
      cell.appendChild(linkEditar);
      linkEditar.addEventListener("click",editarRuta);

      let linkEliminar = document.createElement("a");
      linkEliminar.className = "btn btn-sm btn-outline-secondary";
      linkEliminar.id = i;
      let eliminar = document.createTextNode("Eliminar");
      linkEliminar.appendChild(eliminar);
      cell.appendChild(linkEliminar);
      linkEliminar.addEventListener("click",eliminarRuta);
    }
    
  }

  function editarRuta(event) {
    let rutaId =rutas[this.id].id;
    doGetParadasPorRuta(rutaId).then(ruta=>{
      localStorage.setItem('rutaEditar',JSON.stringify(ruta));
      window.location.href = "/ruta.html";
    });
  }

  function eliminarRuta(event) {
    let rutaEliminar = rutas[this.id];
    const result = confirm('Quiere eliminar la ruta: ' + rutaEliminar.nombre);
    if(result) {
      elimarRuta(rutaEliminar.id);
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
  listRutas();

  const btnCrearRuta = document.querySelector('#crearRuta');
  btnCrearRuta.addEventListener('click', redirectToCrear);
