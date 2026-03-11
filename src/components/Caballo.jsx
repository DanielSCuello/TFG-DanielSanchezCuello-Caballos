import { useState ,useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import "./../assets/scss/Caballo.css";

function Caballo({
  columnas,
  posicion,
  filaIndex,
  animando,
  animandoReset,
  onAnimacionFin,
}) {
  const caballos = ["caballo-rojo", "caballo-azul", "caballo-amarillo", "caballo-blanco"];
  const claseCaballo = caballos[filaIndex % caballos.length];

  const claseAnim = animando
    ? (animandoReset ? "animar-retroceso" : "animar-avance")
    : "";

  return (
    <>
      {Array.from({ length: columnas }).map((_, colIndex) => (
        <div key={colIndex} className="celda">
          {colIndex === posicion && (
            <div className={`${claseCaballo} ${claseAnim}`} onAnimationEnd={animando ? () => onAnimacionFin(filaIndex) : undefined}/>
          )}
        </div>
      ))}
    </>
  );
}

export default Caballo;
