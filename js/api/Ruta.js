export function CrearRuta(event) {

    const nombre =document.querySelector('#nombre');
    const sentido=document.querySelector('#sentido');
    const frecuencia=document.querySelector('#frecuencia');
    const origen=document.querySelector('#origen');
    const destino=document.querySelector('#destino');
    const plataforma=document.querySelector('#plataforma');
    const horarios=document.querySelector('#horarios');

    if (! nombre || sentido || frecuencia || origen || destino || plataforma || horarios  === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postCrearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, horarios).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function  postCrearRuta(nombre, sentido, frecuencia, origen, destino, plataforma, horarios) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              sentido: sentido,
              frecuencia: frecuencia,
              origen: origen,
              destino: destino,
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

export function obtenerRutas(event) {
    getObtenerRutas().then(response => {
            window.location.href = "/dashboard.html";
        });
    }

function getObtenerRutas() {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+"/ruta/ruta", {
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



