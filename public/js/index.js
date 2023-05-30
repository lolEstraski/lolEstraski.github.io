import { doLogout } from './api/login.js';
import { getObtenerRutas, doGetDireccionesPorRuta } from './api/ruta.js';
import { agregarRutaFavorita } from './api/favorita.js';

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
      linkEditar.id = element.id;
      let editar = document.createTextNode("Ver");
      linkEditar.appendChild(editar);
      cell.appendChild(linkEditar);
      linkEditar.addEventListener("click",renderMap);


      let linkFavorito = document.createElement("a");
      linkFavorito.className = "btn btn-sm btn-outline-secondary";
      linkFavorito.id = element.id;
      let favorito = document.createTextNode("Agregar Favorito");
      linkFavorito.appendChild(favorito);
      cell.appendChild(linkFavorito);

      linkFavorito.addEventListener("click",agregarAFavorito);
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

  function agregarAFavorito(event){
    agregarRutaFavorita(this.id).then(ruta=>{
      alert('Ruta'+ rutas[this.id].nombre + 'agregada a favoritos');
    });
  }

  function renderMap(event){
    verRuta(this.id);
  }

  function verRuta(id){
    doGetDireccionesPorRuta(id).then(ruta=>{
      let origen = ruta.origen;
      let destino = ruta.destino;
      
      let map = document.querySelector('#map');
      document.querySelector('#nombreRuta').textContent = ruta.nombre;
      map.src = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBCVdGMcZjYLIBRJAmNyh_3A3HJizfZ-yo&origin="+origen+"&destination="+destino+"&waypoints="+ ruta.paradas.join('|'); +"&mode=driving"
    });
  }

  const buscar = document.querySelector('#buscarRuta');
  buscar.addEventListener("change", (event) => {
    const ruta = rutas.find(element => element.nombre === event.target.value );
    verRuta(ruta.id);
  });

  let table = document.querySelector("#tb-rutas");
  generateTableHead(table, []);
  generateTable(table, rutas);
  listRutas();