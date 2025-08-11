
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}


function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function calculateSummary(cart) {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.quantity * parseFloat(item.price);
  });

  return { totalItems, totalPrice };
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-container');
  const summary = document.getElementById('cart-summary');
  const emptyMsg = document.getElementById('empty-cart-msg');

  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    if (summary) summary.style.display = 'none';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (summary) summary.style.display = 'block';

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img 
        src="${item.image_url || 'assets/pic/logonew.png'}" 
        alt="${item.name}"
        onerror="this.onerror=null;this.src='assets/pic/logonew.png';"
      />
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
        <p>Quantity: 
          <button class="qty-decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-increase" data-id="${item.id}">+</button>
        </p>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });

  const { totalItems, totalPrice } = calculateSummary(cart);
  const totalItemsEl = document.getElementById('total-items');
  const totalPriceEl = document.getElementById('total-price');

  if (totalItemsEl) totalItemsEl.textContent = totalItems;
  if (totalPriceEl) totalPriceEl.textContent = totalPrice.toFixed(2);

  addCartEventListeners();
}


function addCartEventListeners() {
  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(btn.dataset.id, 1);
    });
  });

  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(btn.dataset.id, -1);
    });
  });

  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      removeItem(btn.dataset.id);
    });
  });
}


function updateQuantity(id, change) {
  let cart = getCart();
  cart = cart.map(item => {
    if (item.id == id) {
      const newQty = item.quantity + change;
      return {...item, quantity: newQty > 0 ? newQty : 1};
    }
    return item;
  });
  saveCart(cart);
  renderCart();
}


function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id != id);
  saveCart(cart);
  renderCart();
}


const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    alert('Checkout functionality is not implemented yet.');
  });
}


window.addEventListener('DOMContentLoaded', renderCart);
