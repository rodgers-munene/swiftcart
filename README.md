# 🛒 SwiftCart – Modern eCommerce Platform

[Live Project](https://swiftcart-oxor.vercel.app/)

**SwiftCart** is a full-stack eCommerce solution with a focus on seamless shopping experiences and robust admin controls. Built with cutting-edge technologies, it supports product browsing, secure checkout, M-Pesa payments, and order management.

---

##  Key Features

### Shopping Experience
- **Product Catalog**: Browse/search products with filters
- **Shopping Cart**: Add/remove items, adjust quantities
- **Secure Checkout**: Protected payment flow

### User System
- JWT authentication (Register/Login)
- Role-based access (Admin/Customer)
- User profile management

### Admin Controls
- Full CRUD for products
- Category management
- Order processing system

### Payments
- **M-Pesa integration** for mobile payments
- *(Coming Soon)* Stripe & PayPal support

### Order Management
- Order history tracking
- *(Planned)* Real-time delivery updates

---

## Technology Stack

### Frontend
- **React** + **Vite** (Fast modern build)
- **Tailwind CSS** (Utility-first styling)
- **React Router** (Navigation)

### Backend
- **Node.js** + **Express** (API server)
- **MongoDB** (Database)
- **Mongoose** (ODM)

### Key Integrations
- **JWT** Authentication
- **M-Pesa API** Payments

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas URI
- M-Pesa API keys (for payments)

### Installation

1. **Clone the repository**
   ```bashSet up Backend

```bash
cd backend
npm install
```
### Create .env file:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
```

### Start server:

```bash
npm run dev
```

### Set up Frontend


```bash
cd ../frontend
npm install
npm run dev
```
App will run at http://localhost:5173

## Project Structure
```text
swiftcart/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth & error handlers
│   ├── models/         # MongoDB schemas
│   ├── mpesa/          # Payment integration
│   ├── routes/         # API endpoints
│   ├── utils/          # Helper functions
│   └── server.js       # Server entry point
│
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable UI
│       ├── contexts/   # State management
│       ├── pages/      # Application views
│       ├── services/   # API services
│       ├── App.jsx     # Root component
│       └── main.jsx    # Entry point
│
└── README.md           # Project documentation
```

## API Reference

Endpoint	Method	Description
/api/auth/register	POST	User registration
/api/auth/login	POST	User authentication
/api/products	GET	Get all products
/api/products	POST	Create new product (Admin)
/api/orders	POST	Create new order
/api/mpesa/checkout	POST	Initiate M-Pesa payment
(Full API documentation available in the backend repository)

##  Future Implementations
Google OAuth integration

Stripe/PayPal payment options

Real-time order tracking

Admin analytics dashboard

Product reviews & ratings

## Contributing
We welcome contributions! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## License
Distributed under the MIT License. See LICENSE for more information.




  
