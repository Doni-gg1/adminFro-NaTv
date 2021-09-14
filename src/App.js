import './App.css';
import Cahnnle from "./pages/channle/channle";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from './components/header/header';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Cahnnle/>
      </BrowserRouter>
    </>
  );
}

export default App;
