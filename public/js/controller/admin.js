import { doLogout } from '../api/login.js';
import { crearRuta, doPatchRuta } from '../api/ruta.js';
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', doLogout);
let paradaActual = null;
let idParada = null;
let paradas = [
   
  ];
let rutaEditar = JSON.parse(localStorage.getItem('rutaEditar'));

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
    try {
      table.removeChild(table.getElementsByTagName("tbody")[0]); 
    } catch(err) {
      console.log('error');
    }
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
      linkEditar.addEventListener("click",editarParada);

      let linkEliminar = document.createElement("a");
      linkEliminar.className = "btn btn-sm btn-outline-secondary";
      linkEliminar.id = i;
      let eliminar = document.createTextNode("Eliminar");
      linkEliminar.appendChild(eliminar);
      cell.appendChild(linkEliminar);
      linkEliminar.addEventListener("click",eliminarParada);
    }
      
  }

  function eliminarParada(event){
    paradas.splice(this.id,1);
    if(paradas.length === 0) {
      table.removeChild(table.getElementsByTagName("thead")[0]); 
    }
    generateTable(table, paradas);
  }

  function editarParada(event) {
    paradaActual = paradas[this.id];
    idParada = this.id;
    document.querySelector('#nombreParada').value = paradaActual.nombre;
    document.querySelector('#direccion').value = paradaActual.direccion;
    document.querySelector('#agregarParada').textContent  = "Editar";
    
  }

  function addParada(event) {
    const nombre = document.querySelector('#nombreParada');
    const direccion = document.querySelector('#direccion');
    let parada = {
      nombre: nombre.value,
      direccion: direccion.value
    };
    nombre.value = '';
    direccion.value = '';

    if(paradaActual === null){
      paradas.push(parada);
    } else {
      paradas[idParada] = parada;
    }

    if(paradaActual === null && paradas.length === 1){
      let data = Object.keys(paradas[0]);
      generateTableHead(table, data);
    }
      generateTable(table, paradas);
      idParada = null;
      paradaActual= null;
      document.querySelector('#agregarParada').textContent  = "Agregar";
  }

  function doCrearRuta(event){
    event.preventDefault();
    const nombre =document.querySelector('#nombre');
    const sentido=document.querySelector('#sentido');
    const frecuencia=document.querySelector('#frecuencia');
    const origen=document.querySelector('#origen');
    const destino=document.querySelector('#destino');
    const plataforma=document.querySelector('#plataforma');
    crearRuta(nombre.value, sentido.value, frecuencia.value, origen.value, destino.value, plataforma.checked, paradas);
    nombre.value = '';
    sentido.value = '';
    frecuencia.value = '';
    origen.value = '';
    destino.value = '';
    plataforma.checked = false;
  }

  function doEditarRuta(event){
    event.preventDefault();
    const nombre =document.querySelector('#nombre');
    const sentido=document.querySelector('#sentido');
    const frecuencia=document.querySelector('#frecuencia');
    const origen=document.querySelector('#origen');
    const destino=document.querySelector('#destino');
    const plataforma=document.querySelector('#plataforma');
    doPatchRuta(rutaEditar.id, nombre.value, sentido.value, frecuencia.value, origen.value, destino.value, plataforma.checked, paradas);
    nombre.value = '';
    sentido.value = '';
    frecuencia.value = '';
    origen.value = '';
    destino.value = '';
    plataforma.checked = '';
    localStorage.removeItem('rutaEditar');
  }

  const btnAgragarParada = document.querySelector('#agregarParada');
  btnAgragarParada.addEventListener('click', addParada);
  
  let table = document.querySelector("#tb-rutas");
  if(rutaEditar !== null) {
    document.querySelector('#nombre').value = rutaEditar.nombre;
    document.querySelector('#sentido').value = rutaEditar.sentido;
    document.querySelector('#frecuencia').value = rutaEditar.frecuencia;
    document.querySelector('#origen').value = rutaEditar.origen;
    document.querySelector('#destino').value = rutaEditar.destino;
    document.querySelector('#plataforma').checked = rutaEditar.plataforma;

    const guardarR = document.querySelector('#guardarRuta');
    guardarR.classList.add("d-none");
    const editarR = document.querySelector('#editarRuta');
    editarR.classList.remove("d-none");
    editarR.addEventListener('click', doEditarRuta);
    let head = rutaEditar.paradas[0];
    rutaEditar.paradas.map(function(item) { 
      delete item.id; 
      return item; 
    });
    paradas = rutaEditar.paradas;
    generateTableHead(table, Object.keys(head));
    generateTable(table,paradas);
  }

  const btnGuardarRuta = document.querySelector('#guardarRuta');
  btnGuardarRuta.addEventListener('click', doCrearRuta);
  
  