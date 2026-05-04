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
    document.querySelectorAll("#extras input:checked").forEach(el => {
      extras.push(el.value);
    });

    let precioNum = parseInt(itemSeleccionado.price.replace("$", ""));

    if (extras.includes("Papas extra")) {
      precioNum += 10;
    }

    const existente = carrito.find(item => 
    item.name === itemSeleccionado.name &&
    item.notas === notas &&
    item.extras.length === extras.length &&
    item.extras.every(e => extras.includes(e))
  );

    if (existente) {
      existente.cantidad += cantidadSeleccionada;
      existente.priceNum += precioNum * cantidadSeleccionada;
      existente.price = `$${existente.priceNum}`;
    } else {
      carrito.push({
        name: itemSeleccionado.name,
        priceUnit: precioNum,
        priceNum: precioNum * cantidadSeleccionada,
        notas: notas,
        extras: extras,
        cantidad: cantidadSeleccionada
      });
    }

    document.getElementById("contador").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

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
    const pago = document.querySelector('input[name="pago"]:checked');
    const pagaCon = document.getElementById("pagaCon").value;

    if (pago.value === "Efectivo" && !pagaCon) {
    alert("Indica con cuánto pagarás");
    return;
  }

    if (!nombre || !pago) {
      alert("Por favor completa tu nombre y método de pago");
      return;
    }

    let total = 0;

    let mensaje = `Hola! Mi nombre es ${nombre}\n`;
    mensaje += `=========================\n`;
    mensaje += `        *MI PEDIDO*\n`;
    mensaje += `=========================\n\n`;

    carrito.forEach(item => {
      total += item.priceNum || parseInt(item.price.replace("$", ""));

      mensaje += `- x${item.cantidad} ${item.name} ($${item.priceNum})\n`;

      if (item.extras && item.extras.length > 0) {
        item.extras.forEach(extra => {
          mensaje += `   • ${extra}\n`;
        });
      }

      if (item.notas) {
        mensaje += `   • Nota: ${item.notas}\n`;
      }

      mensaje += `\n`;
    });

    mensaje += `=========================\n`;
    mensaje += `TOTAL: $${total}\n`;
    mensaje += `=========================\n`;
    mensaje += `Pago: ${pago.value}\n`;
    mensaje += `=========================\n`;

    if (pago.value === "Efectivo") {
    mensaje += `Paga con: $${pagaCon}\n`;
    }

    if (pago.value === "Efectivo" && pagaCon < total) {
    alert("El monto es menor al total");
    return;
    }

    mensaje += `=========================\n`;

    const url = `https://wa.me/525549641567?text=${encodeURIComponent(mensaje)}`;
    window.open(url);

    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  let productoActual = null;

  function renderExtras(producto) {
      const extrasDiv = document.getElementById("extras");
      extrasDiv.innerHTML = "";

      if (producto.name.includes("Boneless")) {
          extrasDiv.innerHTML += `
              <label>Sabor:</label><br>
              <input type="radio" name="sabor" value="BBQ"> BBQ
              <input type="radio" name="sabor" value="Lemon Pepper"> Lemon Pepper
              <input type="radio" name="sabor" value="Natural"> Natural
              <br><br>
              <input type="checkbox" value="Papas extra"> + Papas a la francesa (+$10)
          `;
      }

      if (producto.name.includes("Papas")) {
          extrasDiv.innerHTML += `
              <label>Salsa:</label><br>
              <input type="radio" name="salsa" value="Botanera"> Botanera
              <input type="radio" name="salsa" value="Valentina"> Valentina
          `;
      }

      if (producto.name.includes("Alitas")) {
          extrasDiv.innerHTML += `
              <label>Sabor:</label><br>
              <input type="radio" name="sabor" value="BBQ"> BBQ
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
