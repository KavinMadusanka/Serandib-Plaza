import { Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
    
     
    </>
  );
}

export default App;
