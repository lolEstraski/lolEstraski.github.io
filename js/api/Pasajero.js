export function registrarPasajero(event) {

    const cedula = document.querySelector('#cedula').value;
    const nombre=document.querySelector('#nombre').value;
    const telefono =document.querySelector('#telefono');
    const email=document.querySelector('#email');
    const pass=document.querySelector('#pass');

    if (!nombre || cedula || telefono || email || pass === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postRegistro(nombre,cedula,telefono,email,pass).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}


function postRegistro(nombre,cedula,telefono,email,pass) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/pasajero", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              cedula:cedula,
              telefono:telefono,
              email:email,
              pass,
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


export function actualizarContrasena(event) {

    const id = document.querySelector('#id').value;
    const pass=document.querySelector('#contrasena').value;
    const nuevaContrasena =document.querySelector('#nuevaContrasena');
   
    if (!id || pass || nuevaContrasena  === 'undefined') {
        alert('verifique  los campos correspondientes');
    } else {
        patchActualizarContrasena(id,pass,nuevaContrasena).then(response => {
            window.location.href = "/dashboard.html";
        });
    }
}

function  patchActualizarContrasena(id,pass,nuevaContrasena) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/"+id+"/contrasena", {
            method: "patch",
            body: JSON.stringify({
              id: id,
              pass:pass,
              nuevaContrasena:nuevaContrasena
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



