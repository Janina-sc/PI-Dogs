import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Card from './components/Card';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail'
import NavBar from './components/NavBar'
import About from './components/About';
import MyDog from './components/MyDog';


function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
        <NavBar />
      <Routes>
        <Route exact path= '/' element={<LandingPage/>}></Route> 
        {/* no le puedo pasar propiedades al componente, y si quisiera pasarle props uso: render={()=> <Component/>} */}
        <Route path ='/home' element={<Home/>}></Route>
        <Route path ='/card' element={<Card/>}></Route>
        <Route path ='/createdog' element={<DogCreate/>}></Route>
        <Route path ='/dog/:id' element={<Detail/>}></Route>
        <Route path ='/about' element={<About/>}></Route>
        <Route path ='/mydog' element={<MyDog/>}></Route>
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
