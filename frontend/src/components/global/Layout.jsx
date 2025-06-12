import ToggleTheme from "./toggleTheme";
import Header from "./Header";
import Footer from "./Footer";

// function to call all components that are constant in every page eg theme and navbar
const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <ToggleTheme />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
