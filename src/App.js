import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./AuthContext";
import Main from "./components/Main";

function App() {
  return (
    <AuthContextProvider>
      <Navbar/>
      <Main/>
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
