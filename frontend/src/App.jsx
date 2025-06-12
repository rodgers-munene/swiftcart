import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/global/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Categories from "./pages/Categories";
import MainCategories from "./pages/MainCategories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* home routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {/* login route */}
        <Route path="/login" element={<Login />} />
        {/* signup route */}
        <Route path="/signup" element={<Signup />} />
        {/* categories page */}
        <Route
          path="/categories"
          element={
            <Layout>
              <MainCategories />
            </Layout>
          }
        ></Route>
        {/* specific categories page */}
        <Route
          path="/categories/:categoryName"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        {/* Product details page  */}
        <Route
          path="/categories/products/:id/:title"
          element={
            <Layout>
              <ProductDetails />{" "}
            </Layout>
          }
        />
        {/* cart page  */}
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        {/* checkout page */}
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        {/* profile page */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        {/* contact us page  */}
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
