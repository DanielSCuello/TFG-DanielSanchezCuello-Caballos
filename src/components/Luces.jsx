import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import "./../assets/scss/Luces.css";


function Luces({ resuelto, fallado }) {

  const clase = resuelto ? "luces luces-resuelto": fallado? "luces luces-fallado": "luces";

  return (
    <div className="luces-background">
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className={clase}></div>
      ))}
    </div>
  );
}

export default Luces;