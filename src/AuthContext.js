import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userCredential')) || null);
  const [loading, setLoading ] = useState(true)
  const [titleName, setTitleName] = useState([])

  const values = {
    setCurrentUser,
    currentUser,
    loading,
    setLoading,
    titleName,
    setTitleName
  };
  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;