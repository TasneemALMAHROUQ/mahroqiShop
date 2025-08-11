const pool = require('../db');

async function seedProducts() {
  try {
    await pool.query('DELETE FROM products');
    const products = [
      {
        name: 'Apple iPhone 15 Pro',
        description: 'Latest Apple iPhone with A17 Bionic chip.',
        price: 999.99,
        image_url: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-select-2023?wid=940&hei=1112&fmt=png-alpha&.v=1690380702193',
        category: 'Electronics',
        in_stock: true,
      },
      {
        name: 'Samsung Galaxy S23 Ultra',
        description: 'Powerful Android phone with excellent camera.',
        price: 1199.99,
        image_url: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s918ezkgegy/gallery/levant-galaxy-s23-ultra-s918-451382-sm-s918ezkgegy-534463670?$720_576_PNG$',
        category: 'Electronics',
        in_stock: true,
      },
      {
        name: 'Nike Air Zoom Pegasus 40',
        description: 'Comfortable and durable running shoes.',
        price: 130.0,
        image_url: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/8926ed9c-6a74-4b08-8749-84a3183a9564/air-zoom-pegasus-40-running-shoe-35zMvK.png',
        category: 'Sportswear',
        in_stock: true,
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Industry leading noise cancelling headphones.',
        price: 349.99,
        image_url: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SX466_.jpg',
        category: 'Electronics',
        in_stock: true,
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        description: 'Multi-use programmable pressure cooker.',
        price: 89.99,
        image_url: 'https://m.media-amazon.com/images/I/61xNnRh8KFL._AC_SX679_.jpg',
        category: 'Home Appliances',
        in_stock: true,
      },
      {
        name: 'The Lean Startup Book',
        description: 'Entrepreneurship and startup advice.',
        price: 19.99,
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg',
        category: 'Books',
        in_stock: true,
      },
      {
        name: 'Fujifilm X-T4 Camera',
        description: 'Mirrorless digital camera with image stabilization.',
        price: 1699.99,
        image_url: 'https://fujifilm-x.com/global/products/cameras/x-t4/gallery/img_01.jpg',
        category: 'Electronics',
        in_stock: false,
      },
      {
        name: 'Dell XPS 13 Laptop',
        description: 'Ultra portable laptop with great performance.',
        price: 1099.99,
        image_url: 'https://i.dell.com/sites/csimages/Master_Imagery/all/xps-13-9310-laptop.jpg',
        category: 'Computers',
        in_stock: true,
      },
      {
        name: 'Logitech MX Master 3',
        description: 'Advanced wireless mouse for productivity.',
        price: 99.99,
        image_url: 'https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top-view.png',
        category: 'Electronics',
        in_stock: true,
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'High-performance running shoes with boost cushioning.',
        price: 180.0,
        image_url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6f2744ad1ab94cc7b288ad8800ce10da_9366/Ultraboost_22_Shoes_White_GX5370_01_standard.jpg',
        category: 'Sportswear',
        in_stock: true,
      },
    ];

    for (const product of products) {
      await pool.query(
        `INSERT INTO products (name, description, price, image_url, category, in_stock)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [product.name, product.description, product.price, product.image_url, product.category, product.in_stock]
      );
    }

    console.log('Seed products inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
}

seedProducts();
