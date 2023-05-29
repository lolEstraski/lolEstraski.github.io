import { API_HOST, SYSTEM_TOKEN } from './login.js';

export function crearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, paradas) {

    if ( !nombre || !sentido || !frecuencia || !origen || !destino || !plataforma || !paradas  === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postCrearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, paradas).then(response => {
            alert("Ruta creada con exito");
            window.location.href = "/admin.html";
        });
    }
}

export function doGetParadasPorRuta(idRuta){
    const token = localStorage.getItem('userToken');
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/"+idRuta+"/parada", {
            method: "GET",
            headers: {
              'Authorization': 'basic '+ token, 
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        })
    })
    return promise;
}

function  postCrearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, paradas) {
    const token = localStorage.getItem('userToken');
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              sentido: sentido,
              frecuencia: frecuencia,
              origen: origen,
              destino: destino,
              plataforma:plataforma,
              paradas: paradas
            }),
            headers: {
                'Authorization': 'basic '+ token, 
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            console.log(response);
            resolve(response);
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    })
    return promise;
}


export function buscarRuta(event) {

    const id = document.querySelector('#id').value;

    if (!id === 'undefined') {
        alert('verifique el id ingresado');
    } else {
        getBuscarRuta( id).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function getBuscarRuta(id) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta", {
            method: "Get",
            body: JSON.stringify({
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


export function actualizaRuta(event) {

    const nombre = document.querySelector('#nombre').value;
    const frecuencia = document.querySelector('#frecuencia').value;
    const sentido = document.querySelector('#sentido').value;
    const origen = document.querySelector('#origen').value;
    const destino = document.querySelector('#destino').value;
    const plataforma= document.querySelector('#plataforma').value;
    const horarios= document.querySelector('#horarios').value;
    if (!nombre || sentido || frecuencia || origen || destino || plataforma || horarios === 'undefined') {
        alert('por favor verifique los campos ');
    } else {
        patchActualizarRuta(nombre, frecuencia, sentido, origen, destino, plataforma, horarios).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}

function patchActualizarRuta(nombre, frecuencia, sentido, origen, destino, plataforma, horarios) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta", {
            method: "Patch",
            body: JSON.stringify({
             nombre:nombre,
             frecuencia:frecuencia,
             sentido:sentido,
             origen:origen,
             destino:destino,
             plataforma:plataforma,
            horarios:horarios
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

export function elimarRuta(event) {

    const id = document.querySelector('#id').value;
    if (!id === 'undefined') {
        alert('por favor verifique el id ');
    } else {
        deleteElimnarRuta(id).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}

function deleteElimnarRuta(id) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta", {
            method: "Get",
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

export function getObtenerRutas() {
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/ruta", {
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

export function obtenerRutasOrigenDestino(event) {

    const origen = document.querySelector('#origen').value;
    const destino  = document.querySelector('#destino').value;
    if (!origen || destino === 'undefined') {
        alert('por favor verifique  los datos proporcionados ');
    } else {
        getobtenerRutasOrigenDestino(origen, destino).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}

function  getobtenerRutasOrigenDestino(origen, destino) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/rutas", {
            method: "Get",
            body: JSON.stringify({
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

export function obtenerRutasConPlataforma(event) {
    getBuscarRutaConPlataforma().then(response => {
            window.location.href = "/dashboard.html";
        });
    }

function getBuscarRutaConPlataforma() {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/rutass", {
            method: "Get",
            body: JSON.stringify({
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


export function obtenerRutaNombre(event) {

    const nombre = document.querySelector('#origen').value;
    if (!nombre === 'undefined') {
        alert('por favor verifique  los datos proporcionados ');
    } else {
        getobtenerRutaNombre(nombre).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function getobtenerRutaNombre() {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/{nombre}", {
            method: "Get",
            body: JSON.stringify({
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
