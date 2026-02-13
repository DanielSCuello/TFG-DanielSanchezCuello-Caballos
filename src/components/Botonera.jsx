import { useState ,useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import './../assets/scss/Botonera.css';

function Botonera({ posiciones, setPosiciones, meta, filasConCaballo }) {

  const caballos = [
    "boton-rojo",
    "boton-azul",
    "boton-amarillo",
    "boton-blanco",
  ];

  const moverCaballo = (filaIndex) => {
    console.log("hola hola hola");
    setPosiciones((prev) => {
      const next = [...prev];
      next[filaIndex] = Math.min(next[filaIndex] + 1, meta);
      return next;
    });
  };

  return (
    <div className="botonera">
      {Array.from({ length: filasConCaballo }).map((_, filaIndex) => {

        const claseCaballo = caballos[filaIndex % caballos.length];

        return (
          <div className={`btn-caballo ${claseCaballo}`}  onClick={() => moverCaballo(filaIndex)}  type="button"/>
        );
      })}
    </div>
  );
}

export default Botonera;
