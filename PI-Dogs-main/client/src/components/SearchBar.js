import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions/index";

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName]=useState("");//conecta a React,declara una var de estado

    function handleInputChange(e){//para guardar en mi estado local lo que vayan poniendo
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)//para ver lo que va trayendo

    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))//name  lo que el usuario vaya tipeando
        setName("")//ver
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Buscar..."//ver ésto
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}