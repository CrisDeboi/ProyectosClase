document.addEventListener("DOMContentLoaded", function() {
  console.log('El DOM está completamente cargado y parseado');
  const menuIcon = document.getElementById("header-menu-icon");
  const sideMenu = document.getElementById("side-menu");

  menuIcon.addEventListener("click", function() {
    if (sideMenu.style.left === "0px" || !sideMenu.style.left) {
      sideMenu.style.left = "-550px"; 
    } else {
      sideMenu.style.left = "0px";    
    }
  });

  sideMenu.addEventListener("click", function() {
    sideMenu.style.left = "-550px";  
  });
  
});
let products = [
 
];

function initialize() {
  const ORDER_FORM = document.getElementById("order");
  console.log('Inicializando el formulario: ', ORDER_FORM);
  ORDER_FORM.addEventListener("submit", addProduct);
  showProducts();
}

function addProduct(event) {
  event.preventDefault();
  console.log('Intentando añadir un producto');

  const SEED = event.target.seed.value;
  const QUANTITY = event.target.quantity.value;
  const REHYDRATED = document.querySelector('input[name="rehydrated"]:checked') ? document.querySelector('input[name="rehydrated"]:checked').value : '';

  console.log(`Datos del producto: Semilla = ${SEED}, Cantidad = ${QUANTITY}, Rehidratada = ${REHYDRATED}`);

  if (!SEED || !QUANTITY) {
    if (!SEED) {
      document.getElementById("seed-error").style.visibility = "visible";
    }
    if (!QUANTITY) {
      document.getElementById("quantity-error").style.visibility = "visible";
    }
    return;
  }

  products.push({
    seed: SEED,
    quantity: QUANTITY,
    rehydrated: REHYDRATED
  });

  event.target.reset();
  document.getElementById("seed-error").style.visibility = "hidden";
  document.getElementById("quantity-error").style.visibility = "hidden";

  showProducts();
}

function showProducts() {
  const ORDER_LIST = document.getElementById("order-list");
 
  let allProducts = "";
  products.forEach((product, index) => {
    const rehydratedValue = product.rehydrated.trim().toLowerCase();
    const rehydratedText = product.rehydrated === 'yes' ? 'Sí' : 'No';
    allProducts += `
      <li>
        Semilla: ${product.seed}<br>
        Cantidad: ${product.quantity}<br>
        Rehidratada: ${product.rehydrated}<br>
        <button onclick="deleteProduct(${index})">Eliminar</button>
      </li>`;
  });
  ORDER_LIST.innerHTML = allProducts;
}

function deleteProduct(productId) {
  console.log(`Eliminando producto con ID = ${productId}`);
  products.splice(productId, 1);
  showProducts();
}

initialize();