// --- Gestión de cultivos ---
document.getElementById("add-cultivo-form").addEventListener("submit", function(e){
  e.preventDefault();
  const password = document.getElementById("password").value;
  if(password !== ADMIN_PASSWORD){ alert("❌ Contraseña incorrecta."); return; }

  const nombre = document.getElementById("nombre").value;
  const clima = document.getElementById("clima").value;
  const temperatura = parseFloat(document.getElementById("temperatura").value);
  const epocaSiembra = document.getElementById("epocaSiembra").value;
  const epocaCosecha = document.getElementById("epocaCosecha").value;
  const estado = document.getElementById("estado").value;
  const fitosanitario = document.getElementById("fitosanitario").value;
  const imagen = document.getElementById("imagen").value;

  const newCultivo = {
    id: cultivos.length ? cultivos[cultivos.length-1].id + 1 : 1,
    nombre, clima, temperatura, epocaSiembra, epocaCosecha, estado, fitosanitario,
    imagen: "assets/images/" + imagen
  };

  cultivos.push(newCultivo);
  saveCultivos();
  renderCultivos();
  this.reset();
});

function renderCultivos(){
  const container = document.getElementById("cultivos-list");
  container.innerHTML = "";
  cultivos.forEach(c => {
    container.innerHTML += `
      <div class="card" id="cultivo-${c.id}">
        <img src="${c.imagen}" alt="${c.nombre}">
        <h3>${c.nombre}</h3>
        <p>🌡 Temperatura: ${c.temperatura}°C <span class="alerta-temp"></span></p>
        <p>🌤 Clima: ${c.clima}</p>
        <p>📅 Siembra: ${c.epocaSiembra}</p>
        <p>📅 Cosecha: ${c.epocaCosecha}</p>
        <p>📊 Estado: ${c.estado}</p>
        <p>⚠ Fit.: ${c.fitosanitario} <span class="alerta"></span></p>
        <button onclick="eliminarCultivo(${c.id})">Eliminar</button>
      </div>
    `;
  });
  alertasCultivos();
  renderCalendario();
}

function eliminarCultivo(id){
  cultivos = cultivos.filter(c => c.id !== id);
  saveCultivos();
  renderCultivos();
}

// --- Gestión de productos ---
document.getElementById("add-producto-form").addEventListener("submit", function(e){
  e.preventDefault();
  const password = document.getElementById("prod-password").value;
  if(password !== ADMIN_PASSWORD){ alert("❌ Contraseña incorrecta."); return; }

  const nombre = document.getElementById("prod-nombre").value;
  const descripcion = document.getElementById("prod-descripcion").value;
  const precio = document.getElementById("prod-precio").value;
  const imagen = document.getElementById("prod-imagen").value;

  const newProducto = {
    id: productos.length ? productos[productos.length-1].id + 1 : 1,
    nombre, descripcion, precio,
    imagen: "assets/images/" + imagen
  };

  productos.push(newProducto);
  localStorage.setItem("productos", JSON.stringify(productos));
  renderProductos();
  this.reset();
});

function renderProductos(){
  const container = document.getElementById("productos-list");
  container.innerHTML = "";
  productos.forEach(p => {
    container.innerHTML += `
      <div class="card" id="producto-${p.id}">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>Precio: ${p.precio}</strong></p>
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </div>
    `;
  });
}

function eliminarProducto(id){
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
  renderProductos();
}

// Inicialización
loadCultivos();
renderCultivos();
renderProductos();
