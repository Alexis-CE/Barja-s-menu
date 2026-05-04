  const carrito = [];
  let pantallaActual = "Principal";
  let cantidadSeleccionada = 1;

  const leche = [
    { name: "Frappé de Galleta", price: "$65", img: "./Assets/galleta.png", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
    { name: "Frappé de Chocolate", price: "$65", img: "./Assets/chocolate.png", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
    { name: "Frappé de Café", price: "$65", img: "./Assets/cafe.png", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
    { name: "Frappé de Vainilla", price: "$65", img: "./Assets/vainilla.png", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
    { name: "Frappé de Fresa", price: "$65", img: "./Assets/fresa.png", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
  ];

  const agua = [
    { name: "Frappé de Mango", price: "$55", img: "./Assets/mango.png", desc: "El vaso se decora con chamoy y se le pone gomitas" },
    { name: "Frappé de Tamarindo", price: "$55",  img: "./Assets/tamarindo.png",desc: "El vaso se decora con chamoy y se le pone gomitas" },
    { name: "Frappé de Fresa", price: "$55", img: "./Assets/fresa2.png",desc: "El vaso se decora con chamoy y se le pone gomitas" },
  ];

  const bebidas = [
      {name: "Piña colada 1L", price: "$140", img: "./Assets/piñacolada.png", desc: "Se prepara con jugo de piña, calua y si es que lo prefiere con alcohol (por cada caballito mas de alcohol se cobra $10 extra)"},
      {name: "Piña colada ½L", price: "$80", img: "./Assets/piñacolada.png", desc: "Se prepara con jugo de piña, calua y si es que lo prefiere con alcohol (por cada caballito mas de alcohol se cobra $10 extra)"},
      {name: "Azulito 1L", price: "$120", img: "./Assets/azulito.png", desc: "Se prepara con sprite, agua mineral y colorante (gatorade) y si es que lo prefiere con alcohol (por cada caballito de alcohol se cobra $10 extra)"},
      {name: "Azulito ½L", price: "$70", img: "./Assets/azulito.png", desc: "Se prepara con sprite, agua mineral y colorante (gatorade) y si es que lo prefiere con alcohol (por cada caballito de alcohol se cobra $10 extra)"},
      {name: "Sangría Preparada 1L", price: "$65", img: "./Assets/sangria.png", desc: "El vaso se escarcha con tamarindo. Al interior del vaso se le pone limón con un poco de sal para darle sabor y refresco sangría"},
      {name: "Sangría Preparada ½L", price: "$35", img: "./Assets/sangria.png", desc: "El vaso se escarcha con tamarindo. Al interior del vaso se le pone limón con un poco de sal para darle sabor y refresco sangría"},
  ];

  const snacks = [
      {name: "Maruchan", price: "$35", img: "./Assets/maruchan.png", desc: "Preparacion libre"},
      {name: "Boneless", price: "$60", img: "./Assets/boneless.jpg", desc: "6 piezas de boneless con la salsa de su preferencia (BBQ, Lemon Peper y Natural) con verdura y por $10 mas le puedes agregar papás a la francesa"},
      {name: "Papas a la francesa", price: "$45", img: "./Assets/papas.jpg", desc: "Se prepara con queso amarillo derretido, catsup y salsa botanera o valentina (según su gusto)"},
      {name: "Alitas", price: "$70", img: "./Assets/alitas.png", desc: "Son 6 alitas adobadas preparadas con la salsa de su preferencia (BBQ o naturales) con verdura y por $10 más le pude agregar papas a la francesa"},
  ];

  let itemSeleccionado = null;

  function crearCartas(items, gridId) {
      const grid = document.getElementById(gridId);

      items.forEach(item => {
          const btn = document.createElement("button");
          btn.className = "item-card";
          btn.innerHTML = `
    <div class="cardInfo">
      <span class="cardName">${item.name}</span>
      <span class="cardPrice">${item.price}</span>
    </div>
    <img class="cardImg" src="${item.img}">
  `        
  btn.onclick = () => abrirDetalle(item);
          grid.appendChild(btn);
      });
  };

  crearCartas(leche, "gridL");
  crearCartas(agua, "gridA");
  crearCartas(bebidas, "gridB");
  crearCartas(snacks, "gridS");

  function abrirDetalle(item) {
      document.getElementById("Detalle-img").src = item.img;
      document.getElementById("Detalle-name").textContent = item.name;
      document.getElementById("Detalle-price").textContent = item.price;
      document.getElementById("d-desc").textContent = item.desc;
      document.getElementById("d-notes").value = "";
      document.getElementById("Principal").classList.remove("active");
      document.getElementById("DetalleP").classList.add("active");

      itemSeleccionado = item;
      pantallaActual = "Principal"

      renderExtras(item);

      cantidadSeleccionada = 1;
      document.getElementById("cantidad").textContent = 1;
  }

  function goBack() {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(pantallaActual).classList.add("active");
  }

function guardarCarrito() {
    const notas = document.getElementById("d-notes").value;
    let extras = [];
    let precioExtra = 0;

    // Capturar Checkboxes
    document.querySelectorAll("#extras input[type='checkbox']:checked").forEach(el => {
        extras.push(el.value);
        if (el.dataset.precio) precioExtra += parseInt(el.dataset.precio);
    });

    // Capturar Radios (Sabor o Alcohol Base)
    document.querySelectorAll("#extras input[type='radio']:checked").forEach(el => {
        extras.push(el.value);
        if (el.dataset.precio) precioExtra += parseInt(el.dataset.precio);
    });

    let precioBase = parseInt(itemSeleccionado.price.replace("$", ""));
    let precioUnitarioFinal = precioBase + precioExtra;

    const existente = carrito.find(item => 
        item.name === itemSeleccionado.name &&
        item.notas === notas &&
        JSON.stringify(item.extras) === JSON.stringify(extras)
    );

    if (existente) {
        existente.cantidad += cantidadSeleccionada;
        existente.priceNum = existente.priceUnit * existente.cantidad;
    } else {
        carrito.push({
            name: itemSeleccionado.name,
            priceUnit: precioUnitarioFinal, 
            priceNum: precioUnitarioFinal * cantidadSeleccionada,
            notas: notas,
            extras: extras,
            cantidad: cantidadSeleccionada
        });
    }

    actualizarContador();
    goBack();
}

  function abrirCarrito() {
    document.getElementById("Principal").classList.remove("active");
    document.getElementById("Carrito").classList.add("active");
    contenidoCarrito();

    pantallaActual = "Principal";
  }

function contenidoCarrito() {
  const contenedor = document.getElementById("contenidoC");
  contenedor.innerHTML = "";

  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p style='text-align:center; padding:20px;'>Tu carrito está vacío</p>";
    document.getElementById("irCarrito").style.display = "none";
    return;
  } else {
    document.getElementById("irCarrito").style.display = "block";
  }

  carrito.forEach((item, index) => {
    total += item.priceNum;

    const div = document.createElement("div");
    div.className = "carrito-item";

    div.innerHTML = `
      <!-- BOTÓN PARA ELIMINAR ITEM COMPLETO -->
      <button class="btn-eliminar" onclick="eliminarItemTotal(${index})">×</button>
      
      <div class="carrito-header">
          <div>
            <h4>x${item.cantidad} ${item.name}</h4>
            <div class="carrito-precio">$${item.priceNum}</div>
          </div>
      </div>

      ${item.extras.length ? `<div class="carrito-info">Extras: ${item.extras.join(", ")}</div>` : ""}
      ${item.notas ? `<div class="carrito-info">Nota: ${item.notas}</div>` : ""}

      <div class="carrito-controles">
          <div class="cantidad-box">
              <button onclick="restarItem(${index})">−</button>
              <span class="carrito-cantidad">${item.cantidad}</span>
              <button onclick="sumarItem(${index})">+</button>
          </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "total-box";
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  contenedor.appendChild(totalDiv);
}

function eliminarItemTotal(index) {
  if(confirm("¿Quieres eliminar este producto de tu pedido?")) {
    carrito.splice(index, 1);
    actualizarContador();
    contenidoCarrito();
  }
}

function actualizarContador() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contadorEl = document.getElementById("contador");
  contadorEl.textContent = totalItems;
  
  // Ocultar contador si es 0 (opcional)
  contadorEl.style.display = totalItems > 0 ? "block" : "none";
}

  function abrirCompra() {
    document.getElementById("Carrito").classList.remove("active");
    document.getElementById("Compra").classList.add("active");

    pantallaActual = "Carrito"
  }

  function enviarW() {
    const nombre = document.getElementById("nombre").value;
    const pagoElement = document.querySelector('input[name="pago"]:checked');
    const pagaCon = document.getElementById("pagaCon").value;

    if (!nombre || !pagoElement) {
        alert("Por favor completa tu nombre y método de pago");
        return;
    }

    const pagoValor = pagoElement.value;
    let total = 0;

    let mensaje = `Hola! Mi nombre es ${nombre}\n`;
    mensaje += `=========================\n`;
    mensaje += `        *MI PEDIDO*\n`;
    mensaje += `=========================\n\n`;

    carrito.forEach(item => {
        total += item.priceNum;
        mensaje += `- x${item.cantidad} ${item.name} ($${item.priceNum})\n`;
        if (item.extras.length > 0) mensaje += `   • Extras: ${item.extras.join(", ")}\n`;
        if (item.notas) mensaje += `   • Nota: ${item.notas}\n`;
        mensaje += `\n`;
    });

    mensaje += `=========================\n`;
    mensaje += `*TOTAL: $${total}*\n`;
    mensaje += `=========================\n`;
    mensaje += `Pago: ${pagoValor}\n`;

    if (pagoValor === "Efectivo") {
        if (!pagaCon || parseInt(pagaCon) < total) {
            alert("Monto de pago inválido");
            return;
        }
        mensaje += `Paga con: $${pagaCon}\n`;
        mensaje += `Cambio: $${pagaCon - total}\n`;
    }

    if (pagoValor === "transferencia") {
        mensaje += `\n⚠️ *Recuerda mandar tu comprobante de pago.*\n`;
    }

    mensaje += `=========================\n`;

    const url = `https://wa.me/525549641567?text=${encodeURIComponent(mensaje)}`;
    window.open(url);

    setTimeout(() => { location.reload(); }, 1000);
}

  let productoActual = null;

 function renderExtras(producto) {
    const extrasDiv = document.getElementById("extras");
    if (!extrasDiv) return;
    extrasDiv.innerHTML = "";

    const nombre = producto.name.toLowerCase();

    // Lógica unificada para Piña Colada y Azulito
    if (nombre.includes("piña colada") || nombre.includes("azulito")) {
        extrasDiv.innerHTML += `
            <div class="extra-group">
                <label style="display:block; margin-bottom:5px; font-weight:bold;">Opciones de Alcohol:</label>
                <div class="extra-item">
                    <label><input type="radio" name="alcohol_base" value="Sin Alcohol" checked> Sin Alcohol</label>
                </div>
                <div class="extra-item">
                    <label><input type="radio" name="alcohol_base" value="Con Alcohol (1er Shot Gratis)"> Con Alcohol (1er Shot Gratis)</label>
                </div>
                <div class="extra-item" style="margin-top:8px; border-top:1px solid #eee; padding-top:8px;">
                    <label><input type="checkbox" value="2do Shot Extra" data-precio="10"> ¿Deseas un 2do Shot? (+$10)</label>
                </div>
            </div>
        `;
    }

    if (nombre.includes("boneless")) {
        extrasDiv.innerHTML += `
            <label>Sabor:</label><br>
            <input type="radio" name="sabor" value="BBQ" checked> BBQ
            <input type="radio" name="sabor" value="Lemon Pepper"> Lemon Pepper
            <input type="radio" name="sabor" value="Natural"> Natural
            <br><br>
            <input type="checkbox" value="Papas extra" data-precio="10"> + Papas a la francesa (+$10)
        `;
    }

    if (nombre.includes("papas")) {
        extrasDiv.innerHTML += `
            <label>Salsa:</label><br>
            <input type="radio" name="salsa" value="Botanera" checked> Botanera
            <input type="radio" name="salsa" value="Valentina"> Valentina
        `;
    }

    if (nombre.includes("alitas")) {
        extrasDiv.innerHTML += `
            <label>Sabor:</label><br>
            <input type="radio" name="sabor" value="BBQ" checked> BBQ
            <input type="radio" name="sabor" value="Natural"> Natural
        `;
    }
}

  function regresarAlPrincipal() {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById("Principal").classList.add("active");
    pantallaActual = "Principal";
  }

document.querySelectorAll('input[name="pago"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const cambioBox = document.getElementById("cambioBox");

    if (radio.value === "Efectivo" && radio.checked) {
      cambioBox.style.display = "block";
    } else {
      cambioBox.style.display = "none";
      document.getElementById("pagaCon").value = "";
    }
  });
});

function cambiarCantidad(valor) {
  cantidadSeleccionada += valor;

  if (cantidadSeleccionada < 1) cantidadSeleccionada = 1;

  document.getElementById("cantidad").textContent = cantidadSeleccionada;
  document.getElementById("contador").textContent =
  carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  contenidoCarrito();
}

function restarItem(index) {
  const item = carrito[index];

  if (item.cantidad > 1) {
    item.cantidad -= 1;
    item.priceNum -= item.priceUnit;
  } else {
    carrito.splice(index, 1);
  }

  contenidoCarrito();

  document.getElementById("contador").textContent =
    carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function sumarItem(index) {
  const item = carrito[index];

  item.cantidad += 1;
  
  item.priceNum = item.priceUnit * item.cantidad;

  contenidoCarrito();

  actualizarContador();
}