# 🛍️ Smart Shop – E-Commerce Project  

## 📌 Project Idea 
Smart Shop is a full-featured e-commerce website built with JavaScript (Frontend & Backend). It allows users to create accounts, log in, browse and search products, add items to the cart, and manage products through an admin dashboard.


## 🎯 Project Goals 
- Apply most JavaScript concepts
- Build a responsive and modern UI
- Handle dynamic data using APIs
- Implement full authentication with JWT(JSON Web Tokens)
- Practice CRUD operations
- Work with PostgreSQL
- Connect Frontend and Backend with `fetch`

## 🗂️ Project Structure – هيكل المشروع
smart-shop/
├── client/ ← Frontend
│ ├── index.html ← Home page
│ ├── login.html ← Login page
│ ├── register.html ← Register page
│ ├── product.html ← Product details page
│ ├── cart.html ← Shopping cart
│ └── dashboard.html ← Admin dashboard
│
├── server/ ← Backend (Node.js)
│ ├── index.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── db.js
│
└── README.md

## 🌐 Pages Overview 

| Page           | Description                                                          
|----------------|--------------------------------------------------
| `index.html`   | Home page with search, filters & product list    
| `login.html`   | Login form for users                             
| `register.html`| New account registration                         
| `product.html` | View product details and add to cart              
| `cart.html`    | See cart items and checkout                      
| `dashboard.html`| Admin control panel (Add/Edit/Delete products) 


## 🔐 Authentication
Users can register and log in securely. JSON Web Tokens (JWT) are used for session management and protecting routes.

## ⚙️ Technologies Used 
| Category       | Tech                             |
|----------------|----------------------------------|
| Frontend       | HTML, CSS, JS (Vanilla) |
| Backend        | Node.js, Express.js              |
| Database       | PostgreSQL                       |
| Auth           | JSON Web Token (JWT)             |
| Storage        | LocalStorage                     |
| Deployment     | Render (planned)                 |
