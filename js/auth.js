let loggedIn = false;
const password = "juan1962";

function login() {
  const input = prompt("Introduce la contraseña de admin:");
  if(input === password){
    loggedIn = true;
    alert("Acceso concedido ✅");
    document.getElementById("dashboard").style.display = "block";
    renderCultivos();
  } else {
    alert("Contraseña incorrecta ❌");
  }
}
