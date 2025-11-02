// Load fruit data and display it
async function loadFruits() {
  try {
    const response = await fetch("/api/fruits");
    const fruits = await response.json();

    const fruitList = document.getElementById("fruit-list");
    fruitList.innerHTML = "";

    fruits.forEach(fruit => {
      const div = document.createElement("div");
      div.className = "fruit";

      div.innerHTML = `
        <div class="fruit-info">
          <img src="${fruit.image}" alt="${fruit.name}" class="fruit-image">
          <div>
            <h3>${fruit.name}</h3>
            <p>$${fruit.price.toFixed(2)}</p>

            <div class="quantity">
              <button onclick="changeQuantity('${fruit.name}', -1)">−</button>
              <span id="qty-${fruit.name}">1</span>
              <button onclick="changeQuantity('${fruit.name}', 1)">+</button>
            </div>

            <button onclick="addToCart('${fruit.name}', ${fruit.price}, '${fruit.image}')">Add to Cart</button>
            <button class="details-btn" onclick="viewDetails('${fruit.name}')">View Details</button>
          </div>
        </div>
      `;

      fruitList.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading fruits:", error);
  }
}

// Keep track of quantities
let quantities = {};

function changeQuantity(name, change) {
  if (!quantities[name]) quantities[name] = 1;
  quantities[name] += change;
  if (quantities[name] < 1) quantities[name] = 1;

  document.getElementById(`qty-${name}`).textContent = quantities[name];
}

// Add to cart with chosen quantity
function addToCart(name, price, image) {
  let qty = quantities[name] || 1;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ name, price, image, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} ${name}(s) added to cart!`);
}

// Redirect to fruit details
function viewDetails(fruitName) {
  window.location.href = `fruit.html?name=${encodeURIComponent(fruitName)}`;
}

window.onload = loadFruits;

function viewCart() {
  window.location.href = "cart.html";
}
