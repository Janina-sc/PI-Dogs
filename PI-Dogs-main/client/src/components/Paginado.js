import React from "react";
import styles from './Paginado.module.css';

export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumber=[]
    for(let i=0; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i + 1)//para que arranque en la pág 1, sino arrancaba en pág 0
    }
    return(
        <nav>
           <ul className={styles.paginado}>
               {pageNumber && pageNumber.map(number =>{
                   return(
                    <li className={styles.number} key={number}>
                   <a onClick={()=>paginado(number)}>{number}</a>
                  </li>
                   )
               })}
               </ul> 
               </nav>
        
    )
}