let ADMIN_PASSWORD = "miHuerto123";

// Cultivos
let cultivos = JSON.parse(localStorage.getItem("cultivos") || "[]");

// Productos
let productos = JSON.parse(localStorage.getItem("productos") || JSON.stringify([
  { id: 1, nombre: "Tomate", precio: "2€/kg", descripcion: "Tomates frescos ecológicos", imagen: "assets/images/tomate.jpg" },
  { id: 2, nombre: "Lechuga", precio: "1,5€/ud", descripcion: "Lechuga fresca de hoja verde", imagen: "assets/images/lechuga.jpg" },
  { id: 3, nombre: "Calabacín", precio: "2€/kg", descripcion: "Calabacín ecológico", imagen: "assets/images/calabacin.jpg" }
]));

function saveCultivos() { localStorage.setItem("cultivos", JSON.stringify(cultivos)); }
function loadCultivos() { cultivos = JSON.parse(localStorage.getItem("cultivos") || "[]"); }
