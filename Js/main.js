const carrito = [];

const leche = [
  { name: "Frappé de Galleta", price: "$65", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
  { name: "Frappé de Chocolate", price: "$65", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
  { name: "Frappé de Café", price: "$65", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
  { name: "Frappé de Vainilla", price: "$65", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
  { name: "Frappé de Fresa", price: "$65", desc: "Lleva crema batida, chocolate y/o lechera depende el sabor de su elección y un palito de chocolate." },
];

const agua = [
  { name: "Frappé de Mango", price: "$55", desc: "El vaso se decora con chamoy y se le pone gomitas" },
  { name: "Frappé de Tamarindo", price: "$55", desc: "El vaso se decora con chamoy y se le pone gomitas" },
  { name: "Frappé de Fresa", price: "$55", desc: "El vaso se decora con chamoy y se le pone gomitas" },
];

const bebidas = [
    {name: "Piña colada 1L", price: "$140", desc: "Se prepara con jugo de piña, calua y si es que lo prefiere con alcohol (por cada caballito mas de alcohol se cobra $10 extra)"},
    {name: "Piña colada ½L", price: "$80", desc: "Se prepara con jugo de piña, calua y si es que lo prefiere con alcohol (por cada caballito mas de alcohol se cobra $10 extra)"},
    {name: "Azulito 1L", price: "$120", desc: "Se prepara con sprite, agua mineral y colorante (gatorade) y si es que lo prefiere con alcohol (por cada caballito de alcohol se cobra $10 extra)"},
    {name: "Azulito ½L", price: "$70", desc: "Se prepara con sprite, agua mineral y colorante (gatorade) y si es que lo prefiere con alcohol (por cada caballito de alcohol se cobra $10 extra)"},
    {name: "Sangría Preparada 1L", price: "$65", desc: "El vaso se escarcha con tamarindo. Al interior del vaso se le pone limón con un poco de sal para darle sabor y refresco sangría"},
    {name: "Sangría Preparada ½L", price: "$35", desc: "El vaso se escarcha con tamarindo. Al interior del vaso se le pone limón con un poco de sal para darle sabor y refresco sangría"},
];

const snacks = [
    {name: "Maruchan", price: "$35", desc: "Preparacion libre"},
    {name: "Boneless", price: "$60", desc: "6 piezas de boneless con la salsa de su preferencia (BBQ, Lemon Peper y Natural) con verdura y por $10 mas le puedes agregar papás a la francesa"},
    {name: "Papas a la francesa", price: "$45", desc: "Se prepara con queso amarillo derretido, catsup y salsa botanera o valentina (según su gusto)"},
    {name: "Alitas", price: "$70", desc: "Son 6 alitas adobadas preparadas con la salsa de su preferencia (BBQ o naturales) con verdura y por $10 más le pude agregar papas a la francesa"},
];

let itemSeleccionado = null;

function crearCartas(items, gridId) {
    const grid = document.getElementById(gridId);

    items.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "item-card";
        btn.innerHTML = `<span class="cardImg">${item.img}</span><span class="cardName">${item.name}</span><span class="cardPrice">${item.price}</span>`
        btn.onclick = () => abrirDetalle(item);
        grid.appendChild(btn);
    });
};

crearCartas(leche, "gridL");
crearCartas(agua, "gridA");
crearCartas(bebidas, "gridB");
crearCartas(snacks, "gridS");

function abrirDetalle(item) {
      document.getElementById("Detalle-img").textContent = item.img;
    document.getElementById("Detalle-name").textContent = item.name;
    document.getElementById("Detalle-price").textContent = item.price;
    document.getElementById("d-desc").textContent = item.desc;
    document.getElementById("d-notes").value = "";
    document.getElementById("Principal").classList.remove("active");
    document.getElementById("DetalleP").classList.add("active");

    itemSeleccionado = item;
}

function goBack() {
  document.getElementById("DetalleP").classList.remove("active");
  document.getElementById("Principal").classList.add("active");
}