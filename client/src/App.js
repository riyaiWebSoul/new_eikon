import Footer from "./Component/Footer";
import Header from "./Component/Header";

import './assets/style.css'
import './assets/mobile.css'
import './assets/super-classes.css'
import Router from "./Router";
import BackEndRouter from "./Component/BackEnd/BackEndRouter";


function App() {
  return (
    <div className="App">
        <Header/>
        <Router/>
        <BackEndRouter/>
        <Footer/>
    </div>
  );
}

export default App;
