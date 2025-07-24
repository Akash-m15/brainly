import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/DashBoard";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<DashBoard/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
