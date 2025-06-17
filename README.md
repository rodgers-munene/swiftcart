# 🛒 SwiftCart – eCommerce Web App

SwiftCart is a full-stack eCommerce web application that allows users to browse products, manage their shopping cart, place orders, and make secure payments through M-Pesa. Built with modern technologies and a clean user interface, it provides a smooth shopping experience for customers and powerful tools for admins.

---

## 🚀 Features

### 👤 User Management
- JWT-based registration and login system.
- Role-based access control (admin/user).
- Profile view & update functionality.
- **Planned:** Google OAuth integration.

### 🛍️ Product Management
- Admins can add, update, delete, and categorize products.

### 📦 Order Management
- Users can place orders and view their order history.
- **Planned:** Real-time order tracking for ongoing deliveries.

### 🛒 Shopping Cart
- Add or remove products from the cart.
- Update product quantities.
- View cart summary with total price.

### 💳 Payment Integration
- Secure checkout process.
- Integrated with **M-Pesa** for local mobile payments.
- **Planned:** Support for Stripe and PayPal.

### 🔎 Search & Filters
- Search products by name or category.
- Filter products by category for easy navigation.

---

## 🧱 Tech Stack

| Layer        | Technology                           |
|--------------|--------------------------------------|
| Frontend     | React, Vite, Tailwind CSS            |
| Routing      | React Router                         |
| Backend      | Node.js, Express                     |
| Database     | MongoDB, Mongoose                    |
| Auth         | JWT (JSON Web Tokens)                |
| Payment      | M-Pesa API                           |
| Future Plans | Google Auth, Stripe, Order Tracking  |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rodgers-munene/swiftcart.git
cd swiftcart
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a .env file and add your environment variables:
```env
Copy
Edit
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev  # Visit http://localhost:5173 to view the app.
```

📁 Folder Structure
```bash

swiftcart/
│
├── backend/
│   ├── controllers/     # logic for routes
│   ├── middleware/      # JWT auth, error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   ├── config/          # DB config
|   ├── mpesa/           # M-Pesa functions
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Views/pages
│   │   ├── contexts/    # Global state
│   │   ├── services/    # API calls
│   │   └── App.jsx      # Main App component
│   └── index.html       # HTML entry point
│
└── README.md

````

🔗 API Routes (Examples)
Method	Route	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user
GET	/api/products	Get all products
POST	/api/orders	Create a new order
POST	/api/mpesa/checkout	Start M-Pesa payment

📌 Future Improvements
Google OAuth login

Stripe & PayPal integration

Real-time order tracking

Admin analytics dashboard

🧑‍💻 Author
Rodgers Munene
GitHub • LinkedIn ("https://github.com/rodgers-munene")

📄 License
This project is open-source and available under the MIT License.

---
