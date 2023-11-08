import {  Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import Navbar from "./components/Navbar/Navbar";



function App() {
  const location = useLocation();
  return (
    <div>
 {location.pathname !== "/" && <Navbar />}
    <Route exact path="/" component={Landing}/>   
    <Route path="/home" component={Home}/>
    <Route path="/detail/:id" component={Detail}/>
    <Route path="/form" component={Form}/>
    </div>
  );
}

export default App;
