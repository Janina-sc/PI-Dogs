import React from "react";
import {Link} from 'react-router-dom';
import styles from "./Landing.module.css";

export default function Landing(){
    return(
        //la imagen de fondo la pongo en estilos de landing
        <div>
            
            <h1>Wellcome Humans!</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}