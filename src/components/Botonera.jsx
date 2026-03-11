import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import "./../assets/scss/Botonera.css";

function Botonera({ onMoveRequest, onReset, filasConCaballo , animandoReset}) {

  const caballos = [
    "boton-rojo",
    "boton-azul",
    "boton-amarillo",
    "boton-blanco"
  ];

  const moverCaballo = (filaIndex) => {
    if (typeof onMoveRequest === "function") {
      onMoveRequest(filaIndex);
    }
  };

  const mitad = Math.floor(filasConCaballo / 2);

  return (
    <div className="botonera">

      {Array.from({ length: filasConCaballo }).map((_, filaIndex) => {

        const claseCaballo = caballos[filaIndex % caballos.length];

        return (
          <>
            {filaIndex === mitad && (
              <div  key="reset" className={animandoReset ? 'btn-reset-abajo':'btn-reset'}  onClick={() => typeof onReset === "function" && onReset()}></div>
            )}

            <div key={filaIndex} className={`btn-caballo ${claseCaballo}`} onClick={() => moverCaballo(filaIndex)} />
          </>
        );
      })}

    </div>
  );
}

export default Botonera;