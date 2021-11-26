import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';//ojo le saqué Switch para ver si compila
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' component={LandingPage}/>
        <Route path ='/home' component={Home}/>
      <h1>Henry Dogs</h1>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
