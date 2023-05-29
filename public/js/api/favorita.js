import { API_HOST, SYSTEM_TOKEN } from './login.js';

export function agregarRutaFavorita(idRuta) {
    let idPersona = JSON.parse(localStorage.getItem('login')).id;
    postAgregarRuta(idRuta, idPersona).then(response => {
        window.location.href = "/favorita.html";
    });
}


function  postAgregarRuta(idRuta, idPasajero) {
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST + "/ruta/favorita", {
            method: "POST",
            body: JSON.stringify({
              idRuta: idRuta,
              idPersona: idPasajero
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

export function getBuscarRutaFavorita() {
    
    const login = JSON.parse(localStorage.getItem('login'));
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/favorita/pasajero/"+login.id, {
            method: "Get",
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

export function deleteEliminarFavorita(id) {
    const login = JSON.parse(localStorage.getItem('login'));
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/favorita", {
            method: "Delete",
            body: JSON.stringify({
              idRuta: id,
              idPasajero: login.id
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response);
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
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/favorita", {
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
