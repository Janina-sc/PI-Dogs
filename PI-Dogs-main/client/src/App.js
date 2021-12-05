import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';//ojo le saqué Switch para ver si compila
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Card from './components/Card';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail'


function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' element={<LandingPage/>}></Route>
        <Route path ='/home' element={<Home/>}></Route>
        <Route path ='/card' element={<Card/>}></Route>
        <Route path ='/createdog' element={<DogCreate/>}></Route>
        <Route path ='/dog/:id' element={<Detail/>}></Route>
        
      
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
