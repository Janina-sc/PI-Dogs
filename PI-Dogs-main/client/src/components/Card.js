import React from "react";
import { Link } from "react-router-dom";


export default function Card({id, image, name, temperament, weight_min, weight_max}){
    
    return (
        <Link to={'/dog/'+id}>
        <div key={id}>
            
            <img src={ image ? image : image} alt= "img dog" width= "200px" height= "250px"/>
            <h3>{name}</h3>
            <h5>{temperament &&  temperament.join(", ") }</h5>
            <h5>{weight_min + "kg." + "-" + weight_max + " kg."}</h5>
             </div>
    )
             </Link>
    )
}
