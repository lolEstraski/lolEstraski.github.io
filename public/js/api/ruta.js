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

export function doGetDireccionesPorRuta(idRuta){
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

export function doGetParadasPorRuta(idRuta){
    const token = localStorage.getItem('userToken');
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/"+idRuta+"/paradas", {
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
    const loading = document.querySelector('#loading');
    loading.classList.remove("d-none");
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
        }).finally(() => {
            loading.classList.add("d-none");
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
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta", {
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

export function doPatchRuta(idParada, nombre, sentido, frecuencia, origen, destino, plataforma, paradas) {

    if ( !nombre || !sentido || !frecuencia || !origen || !destino || !paradas  === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        patchActualizarRuta(idParada, nombre, sentido, frecuencia, origen, destino, plataforma, paradas).then(response => {
            alert("Ruta editada con exito");
            window.location.href = "/admin.html";
        });
    }
}

function patchActualizarRuta(idParada, nombre, sentido, frecuencia, origen, destino, plataforma, paradas) {
    const loading = document.querySelector('#loading');
    loading.classList.remove("d-none");
    const token = localStorage.getItem('userToken');
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta", {
            method: "PATCH",
            body: JSON.stringify({
              id: idParada,
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
        }).finally(() => {
            loading.classList.add("d-none");
          });
    })
    return promise;
}

export function elimarRuta(idRuta) {

    if (!idRuta === 'undefined') {
        alert('por favor verifique el id ');
    } else {
        deleteElimnarRuta(idRuta).then(response => {
            window.location.href = "/admin.html";
        });
    }
}

function deleteElimnarRuta(id) {
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta", {
            method: "Delete",
            body: JSON.stringify({
                id: id,
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
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/rutas", {
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
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/rutass", {
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
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST+"/ruta/{nombre}", {
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
