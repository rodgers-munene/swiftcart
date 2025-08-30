import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact-us" },
    { name: "About", path: "" },
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
