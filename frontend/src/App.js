<<<<<<< Updated upstream
// import logo from './logo.svg';
import './App.css';
=======
import { Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import RegisterUser from "./pages/Auth/RegisterUser";
import RegisterShop from "./pages/Auth/RegisterShop";
import Registration from "./pages/Auth/Registration";
//import { ToastContainer} from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Auth/Login";
import ShopProfile from "./pages/Shops/ShopProfile";

import ProfileUser from './pages/User/ProfileUser';
import UpdateShopProfile from "./pages/Shops/UpdateShopProfile";
import UpdateUserProfile from "./pages/User/UpdateUserProfile";

import { CreateCategory } from './pages/Shops/CreateCategory';


import AdminDashboard from "./pages/Admin/AdminDashboard";
import ContactUs from "./pages/ContactUs";
import AllPromotions from "./pages/Promotions";
import AllUsers from "./pages/Admin/AllUsers";
import AllShops from "./pages/Admin/AllShops";
import AddPromotion from "./pages/Shops/AddPromotion";
<<<<<<< Updated upstream
=======
import DisplayProductpage from "./pages/DisplayProductpage";


import AllPromo from "./pages/Shops/AllPromo";
import UpdatePromotion from "./pages/Shops/UpdatePromotion";
import { CreateCategory } from './pages/Shops/CreateCategory';

>>>>>>> Stashed changes


<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
import { CreateCategory } from "./pages/Shops/CreateCategory";


>>>>>>> Stashed changes

function App() {
  return (
    <>
<<<<<<< Updated upstream
    {/*  <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload.
         </p>
         <a
           className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
       </header>
     </div> */}
=======
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/registerUser" element={<RegisterUser/>} />
      <Route path="/registerShop" element={<RegisterShop/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/shopProfile" element={<ShopProfile />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/userprofile" element={<ProfileUser />} />
      <Route path="/updateShopProfile" element={<UpdateShopProfile />} />
      <Route path="/updateprofile" element={<UpdateUserProfile />}/>
      <Route path="/adminProfile" element={<AdminDashboard />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/promotions" element={<AllPromotions />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/allshops" element={<AllShops />} />
      <Route path="/addpromotions" element={<AddPromotion />} />

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Route path="/createCategory" element={<CreateCategory/>}/>
=======
      <Route path="/createcategory" element={<CreateCategory/>} />
=======
      <Route path="/createCategory" element={<CreateCategory />} />
>>>>>>> Stashed changes

      <Route path="/allpromo" element={<AllPromo />} />
      <Route path="/updatePromotion" element={<UpdatePromotion />} />

      <Route path="/displayProductpage" element={<DisplayProductpage/>} />
>>>>>>> Stashed changes

    </Routes>
    
     
>>>>>>> Stashed changes
    </>
  );
}

export default App;
