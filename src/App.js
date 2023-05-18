import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Fragment, React } from "react";
import './App.css';

const App = () => {
  return (
    <Fragment className="App">
      <Navbar />
      <Footer/>
    </Fragment>
  );
};

export default App