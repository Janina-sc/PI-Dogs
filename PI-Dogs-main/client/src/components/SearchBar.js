import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)//para ver

    }
    function handleSubmit(e){
        e.preventDefault()
        setName("")//ver
        dispatch(getNameDogs(name))//name va a ser mi estado local, lo que el usuario vaya tipeando
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Buscar..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}