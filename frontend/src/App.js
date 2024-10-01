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


import AdminDashboard from "./pages/Admin/AdminDashboard";
import ContactUs from "./pages/ContactUs";
import AllPromotions from "./pages/Promotions";
import AllUsers from "./pages/Admin/AllUsers";
import AllShops from "./pages/Admin/AllShops";
import AddPromotion from "./pages/Shops/AddPromotion";
import DisplayProductpage from "./pages/DisplayProductpage";


import AllPromo from "./pages/Shops/AllPromo";
import UpdatePromotion from "./pages/Shops/UpdatePromotion";
import CartPage from "./pages/CartPage";


import { CreateCategory } from "./pages/Shops/CreateCategory";
import CreateProduct from "./pages/Shops/CreateProduct";
import LostFound from './pages/User/LostFound';

import Shops from "./pages/Shops";
import Products from "./pages/Shops/Products";
import UpdateProduct from './pages/Shops/UpdateProduct';
import LowLevelStock from './pages/Shops/LowLevelStock';
import OutOfStock from './pages/Shops/OutOfStock';
import WishlistPage from "./pages/WishlistPage";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import EventCalendar from "./pages/User/EventCalendar";
import Events from "./pages/Admin/Events";
import EventsForm from "./components/Form/eventForm";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
    <>
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
      <Route path="/lostFound" element={<LostFound />}/>
     
    
      <Route path="/adminProfile" element={<AdminDashboard />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/promotions" element={<AllPromotions />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/allshops" element={<AllShops />} />
      <Route path="/addpromotions" element={<AddPromotion />} />
      <Route path="/allpromo" element={<AllPromo />} />
      <Route path="/updatePromotion" element={<UpdatePromotion />} />
      <Route path="/displayProductpage" element={<DisplayProductpage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/wishList" element={<WishlistPage/>} />
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path="/createCategory" element={<CreateCategory/>}/>
      <Route path="/createProduct" element={<CreateProduct/>}/>
      <Route path="/lowLevelStock" element={<LowLevelStock/>}/>
      <Route path="/outOfStock" element={<OutOfStock/>}/>

      <Route path="/products/:slug" element={<UpdateProduct/>}/>
      <Route path="/products" element={<Products/>}/>

      <Route path="/shops" element={<Shops />}/>
      <Route path="/forgot-password" element={<ForgotPassword /> }/>
      <Route path="/eventcalender" element={<EventCalendar /> }/>
      <Route path="/EventAdmin" element={<Events /> }/>
      <Route path="/EventsForm" element={<EventsForm /> }/>





    </Routes>
    
     
    </>
  );
}

export default App;