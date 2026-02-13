import { useState ,useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import './../assets/scss/Caballo.css';

function Caballos({ columnas, posicion, filaIndex }) {

  const caballos = [
    "caballo-rojo",
    "caballo-azul",
    "caballo-amarillo",
    "caballo-blanco"
  ];

  const claseCaballo = caballos[filaIndex % caballos.length];

  return (
    <>
      {Array.from({ length: columnas }).map((_, colIndex) => (
        <div key={colIndex} className="celda">
          {colIndex === posicion && (
            <div className={claseCaballo}></div>
          )}
        </div>
      ))}
    </>
  );
}

export default Caballos;
