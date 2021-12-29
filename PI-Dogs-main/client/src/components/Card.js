import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.css"

export default function Card({id, image, name, temperament, weight_min, weight_max}){
    
    return (
        <div className="card">
            <div className="blur">
        <Link to={'/dog/'+ name}>
        <div key={id}>
            
            <img className="card-image" src={ image ? image : image} alt= "img dog" width= "200px" height= "250px"/>
            <h3 className="card-name">{name}</h3>
            <h5 className="card-temperament">{temperament &&  temperament.join(", ") }</h5>
            <h5 className="card-weight">{weight_min + " kg." + " - " + weight_max + " kg."}</h5>
            
             </div>
    
             </Link>
             </div>
             </div>

    )}
