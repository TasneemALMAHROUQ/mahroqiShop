async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (!products.length) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }

    const placeholderImage = 'assets/pic/logonew.png';

    products.forEach(product => {
      const imageUrl = product.image_url || placeholderImage;

      const price = parseFloat(product.price);
      const priceFormatted = isNaN(price) ? '0.00' : price.toFixed(2);

      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img 
          src="${imageUrl}" 
          alt="${product.name}" 
          loading="lazy"
          onerror="this.onerror=null;this.src='${placeholderImage}';"
        />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${priceFormatted}</p>
        <p class="category">${product.category}</p>
        <p class="${product.in_stock ? 'in-stock' : 'out-of-stock'}">
          ${product.in_stock ? 'In Stock' : 'Out of Stock'}
        </p>
        <button class="add-to-cart-btn" ${!product.in_stock ? 'disabled' : ''}>Add to Cart</button>
      `;

      container.appendChild(card);
    });

    setupAddToCartButtons(); 
  } catch (error) {
    console.error('Error loading products:', error);
    const container = document.getElementById('products-container');
    container.innerHTML = '<p>Failed to load products.</p>';
  }
}


function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}


function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');

    
      const product = {
        id: card.getAttribute('data-id') || '', 
        name: card.querySelector('h3').textContent,
        price: parseFloat(card.querySelector('.price').textContent.replace('$', '')) || 0,
        category: card.querySelector('.category').textContent || '',
      };

      addToCart(product);
    });
  });
}


function fetchProductsWithId() {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('products-container');
      container.innerHTML = '';

      const placeholderImage = 'assets/pic/logonew.png';

      products.forEach(product => {
        const imageUrl = product.image_url || placeholderImage;

        const price = parseFloat(product.price);
        const priceFormatted = isNaN(price) ? '0.00' : price.toFixed(2);

        const card = document.createElement('div');
        card.classList.add('product-card');
        card.setAttribute('data-id', product.id); 

        card.innerHTML = `
          <img 
            src="${imageUrl}" 
            alt="${product.name}" 
            loading="lazy"
            onerror="this.onerror=null;this.src='${placeholderImage}';"
          />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">$${priceFormatted}</p>
          <p class="category">${product.category}</p>
          <p class="${product.in_stock ? 'in-stock' : 'out-of-stock'}">
            ${product.in_stock ? 'In Stock' : 'Out of Stock'}
          </p>
          <button class="add-to-cart-btn" ${!product.in_stock ? 'disabled' : ''}>Add to Cart</button>
        `;

        container.appendChild(card);
      });

      setupAddToCartButtons();
    })
    .catch(error => {
      console.error('Error loading products:', error);
      const container = document.getElementById('products-container');
      container.innerHTML = '<p>Failed to load products.</p>';
    });
}


window.addEventListener('DOMContentLoaded', fetchProductsWithId);
