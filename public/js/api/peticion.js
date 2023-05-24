export function crearPeticion(event) {

    const nombre = document.querySelector('#nombre').value;
    const descripcion=document.querySelector('#descripcion').value;
    const tipo =document.querySelector('#tipo');
    const fecha=document.querySelector('#fecha');
    if ( nombre || descripcion || tipo || fecha === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postPeticion(nombre,descripcion,tipo,fecha).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function postPeticion(nombre,descripcion,tipo,fecha) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/pqrs", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              descripcion: descripcion,
              tipo: tipo,
              fecha:fecha,
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


export function listarPeticionesPorNombrePersona(event) {

    const nombre = document.querySelector('#nombre').value;
    if (!nombre === 'undefined') {
        alert('por favor verifique el nombre expuesto');
    } else {
        getListPorNombre(nombre).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function getListPorNombre(nombre) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"/nombre/nombre, {
            method: "Get",
            body: JSON.stringify({
              nombre: nombre,
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


export function listarPeticionesPorCorreo(event) {

    const email = document.querySelector('#email').value;
    if (!email === 'undefined') {
        alert('por favor verifique el email expuesto ');
    } else {
        getListPorCorreo(email).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}



function getListPorCorreo(email) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"/email/email, {
            method: "Get",
            body: JSON.stringify({
              email: email,
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
