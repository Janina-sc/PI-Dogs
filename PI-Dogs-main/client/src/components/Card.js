import React from "react";


export default function DogCard({id, image, name, temperament, weight_min, weight_max}){
    
    return (
        <div key={id}>
             <img src={ image} alt= "img dog" width= "200px" height= "250px"/>
            <h3>{name}</h3>
            <h5>{temperament.join(", ") }</h5>
            <h5>{weight_min + "-" + weight_max + " kg."}</h5>
             </div>
    )
    }
