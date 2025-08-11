
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
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading products:', error);
    const container = document.getElementById('products-container');
    container.innerHTML = '<p>Failed to load products.</p>';
  }
}

window.addEventListener('DOMContentLoaded', fetchProducts);
