const ADMIN_PASSWORD = "miHuerto123";

const PRODUCTOS_DEFAULT = [
  { id: 1, nombre: "Tomate", precio: "2€/kg", descripcion: "Tomates frescos ecológicos", imagen: "assets/images/tomate.jpg" },
  { id: 2, nombre: "Pimiento", precio: "3€/kg", descripcion: "Pimiento ecológico", imagen: "assets/images/pimiento.jpg" },
  { id: 3, nombre: "Aguacate", precio: "4€/ud", descripcion: "Aguacate ecológico", imagen: "assets/images/aguacate.jpg" },
  { id: 4, nombre: "Pera", precio: "2,5€/kg", descripcion: "Pera ecológica", imagen: "assets/images/pera.jpg" }
];

let cultivos = [];
let productos = [];

function initData() {
  const storedCultivos = localStorage.getItem("cultivos");
  cultivos = storedCultivos ? JSON.parse(storedCultivos) : [];

  const storedProductos = localStorage.getItem("productos");
  if (storedProductos) {
    productos = JSON.parse(storedProductos);
  } else {
    productos = [...PRODUCTOS_DEFAULT];
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}

function saveCultivos() {
  localStorage.setItem("cultivos", JSON.stringify(cultivos));
}

function saveProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function addCultivo(cultivo) {
  cultivo.id = Date.now();
  cultivo.imagen = "assets/images/" + cultivo.imagen;
  cultivos.push(cultivo);
  saveCultivos();
}

function addProducto(producto) {
  producto.id = Date.now();
  producto.imagen = "assets/images/" + producto.imagen;
  productos.push(producto);
  saveProductos();
}

function removeCultivo(id) {
  cultivos = cultivos.filter(c => c.id !== id);
  saveCultivos();
}

function removeProducto(id) {
  productos = productos.filter(p => p.id !== id);
  saveProductos();
}

initData();
