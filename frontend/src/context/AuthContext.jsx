import { createContext, useContext, useState, useEffect } from "react";
import { updateUser } from "../services/userApi";

// create the context
const AuthContext = createContext();

// create a custom hook for the  AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside the AuthProvider");
  }

  return context;
};

// create the provide to wrap  the app with
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const expiry = localStorage.getItem("expiresAt");
      if (expiry && Date.now() > expiry) {
        logout();
      }
    };

    checkToken(); //runs once on mount

    // check every 10 minutes to ensure the
    const interval = setInterval(checkToken, 600000);

    return () => clearInterval(interval);
  }, []);

  const updateUserInfo = async (updatableData) => {
    const res = await updateUser(user.user_id, token, updatableData);

    if (res.success) {
      setMessage("Updated successfully");
      setShow(true);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } else {
      console.log("Error updating", res.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        updateUserInfo,
        message,
        show,
        setShow,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
