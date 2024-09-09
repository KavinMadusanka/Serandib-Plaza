import { Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";

//import { ToastContainer} from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css'


import DisplayProductpage from "./pages/DisplayProductpage";
import Cartpage from "./pages/Cartpage";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Pagenotfound />} />
      
    
      
      <Route path="/displayProductpage" element={<DisplayProductpage/>} />
      <Route path="/cart" element={<Cartpage/>}/>

    </Routes>
    
     
    </>
  );
}

export default App;
