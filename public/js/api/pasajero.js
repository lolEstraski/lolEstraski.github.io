import { API_HOST, SYSTEM_TOKEN } from './login.js';

export function registrarPasajero(event) {

    event.preventDefault();
    const cedula = document.querySelector('#cedula').value;
    const nombre=document.querySelector('#nombre').value;
    const telefono =document.querySelector('#telefono').value;
    const email=document.querySelector('#email').value;
    const pass=document.querySelector('#pass').value;

    if (!nombre || !cedula || !telefono || !email || !pass === 'undefined') {
        alert('seleccione los campos correspondientes');
    } else {
        postRegistro(nombre,cedula,telefono,email,pass).then(response => {
            alert('Registro exitoso, verifique su correo');
            window.location.href = "/index.html";
        });
    }
}


function postRegistro(nombre,cedula,telefono,email,pass) {
    const loading = document.querySelector('#loading');
    loading.classList.remove("d-none");
    let promise = new Promise((resolve, reject) => {
        fetch(API_HOST + "/pasajero", {
            method: "POST",
            body: JSON.stringify({
              nombre: nombre,
              cedula:cedula,
              telefono:telefono,
              email:email,
              pass,
            }),
            headers: {
                "Authorization": "basic "+ SYSTEM_TOKEN,
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err);
            alert(err);
        }).finally(() => {
            loading.classList.add("d-none");
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



