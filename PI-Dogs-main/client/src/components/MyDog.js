import React from "react";
import Alfil from "../components/assets/alfi.jpg"


export default function MyDog(){
    return (
        <div>
        <h2> Alfil </h2>
        <img src={Alfil} alt="Alfil"width= "250 px"/>
        <p>Es nuestro amado perro, el más tierno de todos los perros, siempre me saca una sonrisa. 
            <p> Y más allá de alguna ocasional travesura, se porta muy bien y desde que se conocieron con mis hijos se aman y se cuidan</p>
            <p>Lo menos importante de él es su raza, pero es un Cocker Spaniel. Se llama Alfil porque cuando era un cachorrito se movía de costado, como la pieza de ajedrez.</p>
        </p>

        </div>
    )
};