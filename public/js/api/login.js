export const API_HOST = 'http://localhost:8080';
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
    const loading = document.querySelector('#loading');
    loading.classList.remove("d-none");
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
            if (response.status === 400) {
                throw new Error('verifique sus credenciales e itente nuevamente');
            }
            console.log('response', response);
            const form = document.querySelector('#login-form');
            form.classList.add("animate__rollOut");
            resolve(response.json());
        }).catch(err => {
            const toast = document.querySelector('#toast');
            const toaster = document.querySelector('#toaster');
            toast.textContent = err;
            toaster.classList.add("fade");
            toaster.classList.add("show");
        }).finally(() => {
            loading.classList.add("d-none");
          });
        
    })
    return promise;
}