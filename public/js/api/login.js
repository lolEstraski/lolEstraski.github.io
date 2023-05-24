export const API_HOST = 'https://pruebaimap.uc.r.appspot.com';
export const SYSTEM_TOKEN = 'c3lzdGVtOnRQdWJsaWNv';

export function doLogin(event) {
    event.preventDefault();
    const nombreUsuario = document.querySelector('#nombreUsuario').value;
    const pass = document.querySelector('#password').value;
    if (!nombreUsuario || pass === 'undefined') {
        alert('Debe ingresar un nombre de usuario y contraseña');
    } else {
        postLogin(nombreUsuario, pass).then(response => {
            localStorage.setItem("login", JSON.stringify(response));
            localStorage.setItem("userToken", btoa(nombreUsuario+ ':' + pass));
            if( response.rol == 'ADMIN'){
                window.location.href = "ruta.html";
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }
}

export function doLogout(event) {
    alert("cerrando sesion");
    localStorage.clear();
    window.location.href = "/index.html";
}

function postLogin(nombreUsuario, pass) {
    let promise = new Promise((resolve, reject) => {
        fetch( API_HOST + '/pasajero/auth', {
            method: "POST",
            body: JSON.stringify({
              nombreUsuario: nombreUsuario,
              contrasena: pass
            }),
            headers: {
              'Authorization': 'basic ' + SYSTEM_TOKEN,
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(response => {
            resolve(response.json());
        }).catch(err => {
            console.log(err.json());
            alert(err);
        });
    })
    return promise;
}