// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display items in cart
function displayCart() {
  const cartList = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  cartList.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity">
          <button onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
    `;
    cartList.appendChild(li);
  });

  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  taxEl.textContent = `Tax (8%): $${tax.toFixed(2)}`;
  shippingEl.textContent = `Shipping: $${shipping.toFixed(2)}`;
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();
