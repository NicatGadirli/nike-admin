import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //Check User is in
  useEffect(() => {
    checkUserIsIn();
  }, [navigate]);

  const checkUserIsIn = async () => {
    try {
      let user = await JSON.parse(localStorage.getItem("token"));
      if(user){
        setToken(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Log Out
  const logOut = () => {
    try {
      localStorage.setItem("token", JSON.stringify(false));
      setToken(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (userData.email !== "" && userData.password !== "") {
      alert("kecdiniz");
      localStorage.setItem("token", JSON.stringify(true));
      navigate("/");
    } else {
      alert("bos olmaz");
      localStorage.setItem("token", JSON.stringify(false));
    }
  };

  const globalStates = {
    token,
    setToken,
    userData,
    setUserData,

    //Functions
    logOut,
    handleLogin,
  };

  return <Auth.Provider value={globalStates}>{children}</Auth.Provider>;
};
