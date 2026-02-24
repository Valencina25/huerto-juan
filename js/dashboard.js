// --- Render Cultivos ---
function renderCultivos() {
  const container = document.getElementById("cultivos-list");
  if (!container) return;
  container.innerHTML = "";
  
  if (cultivos.length === 0) {
    container.innerHTML = "<p>No hay cultivos. Añade uno abajo.</p>";
    return;
  }
  
  cultivos.forEach(c => {
    container.innerHTML += `
      <div class="card" id="cultivo-${c.id}">
        <img src="${c.imagen}" alt="${c.nombre}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Sin imagen</text></svg>'">
        <h3>${c.nombre}</h3>
        <p>🌡 Temp: ${c.temperatura}°C</p>
        <p>🌤 Clima: ${c.clima}</p>
        <p>📅 Siembra: ${c.epocaSiembra}</p>
        <p>📅 Cosecha: ${c.epocaCosecha}</p>
        <p>📊 Estado: ${c.estado}</p>
        <p>⚠ Fit.: ${c.fitosanitario}</p>
        <button onclick="eliminarCultivo(${c.id})">Eliminar</button>
      </div>
    `;
  });
  renderCalendario();
}

function eliminarCultivo(id) {
  if (confirm("¿Eliminar cultivo?")) {
    removeCultivo(id);
    renderCultivos();
  }
}

// --- Render Productos ---
function renderProductos() {
  const container = document.getElementById("productos-list");
  if (!container) return;
  container.innerHTML = "";
  
  productos.forEach(p => {
    container.innerHTML += `
      <div class="card" id="producto-${p.id}">
        <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Sin imagen</text></svg>'">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>Precio: ${p.precio}</strong></p>
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </div>
    `;
  });
}

function eliminarProducto(id) {
  if (confirm("¿Eliminar producto?")) {
    removeProducto(id);
    renderProductos();
  }
}

// --- Formularios ---
document.addEventListener("DOMContentLoaded", () => {
  // Formulario cultivos
  const formCultivo = document.getElementById("add-cultivo-form");
  if (formCultivo) {
    formCultivo.addEventListener("submit", function(e) {
      e.preventDefault();
      const password = document.getElementById("password").value;
      if (password !== ADMIN_PASSWORD) {
        alert("❌ Contraseña incorrecta");
        return;
      }

      addCultivo({
        nombre: document.getElementById("nombre").value,
        clima: document.getElementById("clima").value,
        temperatura: parseFloat(document.getElementById("temperatura").value),
        epocaSiembra: document.getElementById("epocaSiembra").value,
        epocaCosecha: document.getElementById("epocaCosecha").value,
        estado: document.getElementById("estado").value,
        fitosanitario: document.getElementById("fitosanitario").value,
        imagen: document.getElementById("imagen").value
      });

      renderCultivos();
      this.reset();
      alert("✅ Cultivo añadido");
    });
  }

  // Formulario productos
  const formProducto = document.getElementById("add-producto-form");
  if (formProducto) {
    formProducto.addEventListener("submit", function(e) {
      e.preventDefault();
      const password = document.getElementById("prod-password").value;
      if (password !== ADMIN_PASSWORD) {
        alert("❌ Contraseña incorrecta");
        return;
      }

      addProducto({
        nombre: document.getElementById("prod-nombre").value,
        descripcion: document.getElementById("prod-descripcion").value,
        precio: document.getElementById("prod-precio").value,
        imagen: document.getElementById("prod-imagen").value
      });

      renderProductos();
      this.reset();
      alert("✅ Producto añadido");
    });
  }

  // Render inicial
  renderCultivos();
  renderProductos();
  renderCalendario();
});

// --- Calendario ---
function renderCalendario() {
  const container = document.getElementById("calendario");
  if (!container) return;
  container.innerHTML = "";
  
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  meses.forEach((mes, index) => {
    const tieneSiembra = cultivos.some(c => c.epocaSiembra.toLowerCase().includes(mes.toLowerCase().substring(0, 3)));
    const tieneCosecha = cultivos.some(c => c.epocaCosecha.toLowerCase().includes(mes.toLowerCase().substring(0, 3)));
    
    if (cultivos.length > 0 && (tieneSiembra || tieneCosecha)) {
      container.innerHTML += `
        <div class="card">
          <h3>${mes}</h3>
          ${tieneSiembra ? "<p>🌱 Siembra</p>" : ""}
          ${tieneCosecha ? "<p>🧺 Cosecha</p>" : ""}
        </div>
      `;
    }
  });
  
  if (cultivos.length === 0) {
    container.innerHTML = "<p>Añade cultivos para ver el calendario.</p>";
  }
}
