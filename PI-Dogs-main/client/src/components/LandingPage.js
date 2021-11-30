import React from "react";
import {Link} from 'react-router-dom';
import styles from "./Landing.module.css";
//import Home from "./Home";

export default function Landing(){
    return(
        //la imagen de fondo la pongo en estilos de landing
        <div className="landingPageApp" >
            
            <h1>Wellcome Humans!</h1>
            <Link to='/home'>
                <button className="botonIngresar">Ingresar</button>
            </Link>
            
        </div>
    )
}