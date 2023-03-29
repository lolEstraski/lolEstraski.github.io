export function doLogin(event) {
    const nombreUsuario = document.querySelector('#nombreUsuario').value;
    const pass = document.querySelector('#password').value;
    if (!nombreUsuario || pass === 'undefined') {
        alert('Debe ingresar un nombre de usuario y contraseña');
    } else {
        postLogin(nombreUsuario, pass).then(response => {
            localStorage.setItem("login", JSON.stringify(response));
            window.location.href = "/dashboard.html";
        });
    }
}

export function doLogout(event) {
    alert("cerrando sesion");
    localStorage.clear();
    window.location.href = "/index.html";
}

function postLogin(nombreUsuario, pass) {
    System.setProperty("http.agent", "Chrome");
    let promise = new Promise((resolve, reject) => {
        fetch("https://pruebaimap.uc.r.appspot.com/admin", {
            method: "POST",
            body: JSON.stringify({
              nombreUsuario: nombreUsuario,
              contrasena: pass
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