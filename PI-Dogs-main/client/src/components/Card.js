import React from "react";


export default function DogCard({image, name, temperament, weight}){
    
    return (
        <div>
             <img src={image} alt= "img dog" width= "200px" height= "250px"/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weight}</h5>
             </div>
    )
    }
