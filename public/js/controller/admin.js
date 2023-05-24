import { doLogout } from '../api/login.js';
import { crearRuta } from '../api/ruta.js';
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', doLogout);

let paradas = [
   
  ];

let rutas = [
   
  ];
  
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
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
      let editar = document.createTextNode("Editar");
      linkEditar.appendChild(editar);
      cell.appendChild(linkEditar);

      let linkEliminar = document.createElement("a");
      linkEliminar.className = "btn btn-sm btn-outline-secondary";
      let eliminar = document.createTextNode("Eliminar");
      linkEliminar.appendChild(eliminar);
      cell.appendChild(linkEliminar);
    }
    
  }

  function addParada(event) {
    const nombre = document.querySelector('#nombreParada').value;
    const direccion = document.querySelector('#direccion').value;
    const latitud = document.querySelector('#latitud').value;
    const longitud = document.querySelector('#longitud').value;
    let parada = {
      nombre: nombre,
      direccion: direccion,
      latitud: latitud,
      longitud: longitud
    };

    paradas.push(parada);
    let data = Object.keys(paradas[0]);
    generateTableHead(table, data);
    generateTable(table, paradas);
  }

  function doCrearRuta(event){
    event.preventDefault();
    const nombre =document.querySelector('#nombre').value;
    const sentido=document.querySelector('#sentido').value;
    const frecuencia=document.querySelector('#frecuencia').value;
    const origen=document.querySelector('#origen').value;
    const destino=document.querySelector('#destino').value;
    const plataforma=document.querySelector('#plataforma').value;
    crearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, paradas);
  }

  const btnAgragarParada = document.querySelector('#agregarParada');
  btnAgragarParada.addEventListener('click', addParada);
  
  let table = document.querySelector("#tb-rutas");
  generateTableHead(table, []);
  generateTable(table, paradas);

  const btnGuardarRuta = document.querySelector('#guardarRuta');
  btnGuardarRuta.addEventListener('click', doCrearRuta);