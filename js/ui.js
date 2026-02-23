// Alertas y colores
function alertasCultivos() {
  cultivos.forEach(c => {
    const card = document.getElementById("cultivo-"+c.id);
    if(card){
      let color = "#2e7d32"; // verde
      if(c.estado.toLowerCase().includes("alerta")) color = "#f9a825";
      if(c.estado.toLowerCase().includes("plaga")) color = "#e53935";
      card.querySelector("h3").style.color = color;

      card.querySelector(".alerta").textContent = "";
      if(c.fitosanitario.toLowerCase().includes("alerta") || c.estado.toLowerCase().includes("plaga")){
        card.querySelector(".alerta").textContent = "⚠ Revisar fitosanitarios";
      }

      card.querySelector(".alerta-temp").textContent = "";
      if(c.temperatura > 35) card.querySelector(".alerta-temp").textContent = "🌡 Temperatura alta!";
      if(c.temperatura < 10) card.querySelector(".alerta-temp").textContent = "❄ Temperatura baja!";
    }
  });
}

// Calendario riego/cosecha
function renderCalendario() {
  const container = document.getElementById("calendario");
  container.innerHTML = "";
  cultivos.forEach(c => {
    container.innerHTML += `
      <div class="card" id="cal-${c.id}">
        <h3>${c.nombre}</h3>
        <p>📅 Siembra: ${c.epocaSiembra}</p>
        <p>📅 Cosecha: ${c.epocaCosecha}</p>
        <label><input type="checkbox" onchange="guardarCheck(${c.id}, 'riego', this.checked)"> Riego realizado</label>
        <label><input type="checkbox" onchange="guardarCheck(${c.id}, 'cosecha', this.checked)"> Cosecha realizada</label>
      </div>
    `;
  });
}

function guardarCheck(id, tipo, valor){
  let key = "check-"+id;
  let estado = JSON.parse(localStorage.getItem(key) || "{}");
  estado[tipo] = valor;
  localStorage.setItem(key, JSON.stringify(estado));
}
