import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Groceries", path: "/categories/groceries" },
    { name: "Beauty", path: "/categories/beauty" },
    { name: "Furniture", path: "/categories/furniture" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className="flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${isActive ? "text-[#535bf2]" : ""}`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
