import { API_HOST, SYSTEM_TOKEN } from './login';

export function agregarRutaFavorita(event) {

    const nombre =document.querySelector('#nombre');
    const sentido=document.querySelector('#sentido');
    const frecuencia=document.querySelector('#frecuencia');
    const origen=document.querySelector('#origen');
    const destino=document.querySelector('#destino');
    if (! nombre || sentido || frecuencia || origen || destino === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postAgregarRuta(nombre, sentido, frecuencia, origen, destino).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function  postAgregarRuta(nombre, sentido, frecuencia, origen, destino) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST + "/ruta/favorita", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              sentido: sentido,
              frecuencia: frecuencia,
              origen:origen,
              destino:destino
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    })
    return promise;
}


export function buscarRutaFavorita(event) {

    const nombre = document.querySelector('#nombre').value;
    const id = document.querySelector('#id').value;

    if (!nombre  || id === 'undefined') {
        alert('verifique datos ingresados');
    } else {
        getBuscarRutaFavorita(nombre, id).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function getBuscarRutaFavorita(nombre ,id) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/favorita", {
            method: "Get",
            body: JSON.stringify({
              nombre: nombre,
              id:id
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    })
    return promise;
}


export function eliminarRutaFavorita(event) {

    const id = document.querySelector('#id').value;
    if (!id === 'undefined') {
        alert('por favor verifique el id ');
    } else {
        deleteEliminarFavorita(id).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}



function deleteEliminarFavorita(id) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/favorita", {
            method: "Delate",
            body: JSON.stringify({
              id: id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    })
    return promise;
}



export function obtenerRutasFavoritas(event) {

    const idPersona = document.querySelector('#idPersona').value;
    if (!idPersona === 'undefined') {
        alert('por favor verifique el id ');
    } else {
        getObtenerRutasFavoritas(id).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function getObtenerRutasFavoritas(idPersona) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/favorita", {
            method: "Get",
            body: JSON.stringify({
                idPersona: idPersona,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    })
    return promise;
}
