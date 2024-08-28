import { Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import RegisterUser from "./pages/Auth/RegisterUser";
import RegisterShop from "./pages/Auth/RegisterShop";
import Registration from "./pages/Auth/Registration";
//import { ToastContainer} from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Auth/Login";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/registerUser" element={<RegisterUser/>} />
      <Route path="/registerShop" element={<RegisterShop/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
    
     
    </>
  );
}

export default App;