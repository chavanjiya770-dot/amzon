// Product list: id, name, price in rupees, emoji icon
const products = [
  { id: 1, name: "Apples (1 kg)", price: 150, icon: "🍎" },
  { id: 2, name: "Bananas (1 dozen)", price: 60, icon: "🍌" },
  { id: 3, name: "Milk (1 L)", price: 56, icon: "🥛" },
  { id: 4, name: "Bread", price: 40, icon: "🍞" },
  { id: 5, name: "Eggs (12)", price: 84, icon: "🥚" },
  { id: 6, name: "Rice (5 kg)", price: 320, icon: "🍚" }
];

let cart = {}; // { productId: quantity }

const grid = document.getElementById("products");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");

// Draw the product cards
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<div class="icon">${p.icon}</div><h3>${p.name}</h3>
    <p class="price">₹${p.price}</p><button>Add to cart</button>`;
  card.querySelector("button").onclick = () => change(p.id, 1);
  grid.appendChild(card);
});

// Add (+1) or remove (-1) one item
function change(id, amount) {
  cart[id] = (cart[id] || 0) + amount;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

// Redraw the cart list, count and total
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0, count = 0;
  for (const id in cart) {
    const p = products.find(x => x.id == id);
    total += p.price * cart[id];
    count += cart[id];
    const li = document.createElement("li");
    li.innerHTML = `<span>${p.name} × ${cart[id]}</span>
      <span>₹${p.price * cart[id]}
        <button aria-label="Remove one">−</button><button aria-label="Add one">+</button></span>`;
    const [minus, plus] = li.querySelectorAll("button");
    minus.onclick = () => change(p.id, -1);
    plus.onclick = () => change(p.id, 1);
    cartItems.appendChild(li);
  }
  if (!count) cartItems.innerHTML = "<li>Your cart is empty.</li>";
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = "₹" + total;
}

// Show or hide the cart panel
const toggle = document.getElementById("cartToggle");
toggle.onclick = () => {
  cartBox.hidden = !cartBox.hidden;
  toggle.setAttribute("aria-expanded", !cartBox.hidden);
};

// Place order: clear the cart
document.getElementById("checkout").onclick = () => {
  if (!Object.keys(cart).length) return alert("Add something to your cart first.");
  alert("Order placed. Thank you for shopping!");
  cart = {};
  renderCart();
};

renderCart();
