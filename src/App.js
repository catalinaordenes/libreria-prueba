import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Books from "./components/Books";
import { Fragment, React } from "react";
import './App.css';

const App = () => {
  return (
    <Fragment className="App">
      <Navbar />
      <Books/>
      <Footer/>
    </Fragment>
  );
};

export default App