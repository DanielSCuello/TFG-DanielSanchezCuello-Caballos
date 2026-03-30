import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext.jsx";

import "./../assets/scss/TableroCentral.css";
import Caballo from "./Caballo.jsx";
import Botonera from "./Botonera.jsx";
import Luces from "./Luces.jsx";

function TableroCentral() {
  const { escapp,appSettings, Utils } = useContext(GlobalContext);

  const columnas = Math.min(appSettings.columns, 10);
  const filas = 5;

  const filasConCaballo = appSettings.numberOfHorses;

  const meta = columnas - 1;

  const [posiciones, setPosiciones] = useState(
    Array.from({ length: filasConCaballo }, () => 0)
  );

  const [fallado,setFallado] = useState(false);
  const [resuelto,setResuelto] = useState(false);
  const [solucion, setSolucion] = useState("");

  const [filaAnimando, setFilaAnimando] = useState(null);

  // Reset paso a paso
  const [animandoReset, setAnimandoReset] = useState(false);
  const [resetQueue, setResetQueue] = useState([]);

  const buildResetQueue = (posArr) => {
    const tmp = [...posArr];
    const q = [];

    while (tmp.some((p) => p > 0)) {
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] > 0) {
          q.push(i);
          tmp[i] -= 1;
        }
      }
    }
    return q;
  };

  useEffect(() => {
    const todosEnMeta = posiciones.every((pos) => pos === meta);
    if (todosEnMeta) checkSolution();
  }, [posiciones]);

  const checkSolution = () => {
     if(typeof solucion !== "string"){
      return;
    }


    Utils.log("Check solution", solucion);

    escapp.submitNextPuzzle(solucion, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      try {
        setTimeout(() => {
          changeLight(success);
        }, 100);
      } catch(e){
        Utils.log("Error in checkNextPuzzle",e);
      }
    });
  };

  const changeLight = (success) =>{
    if(success){
       setResuelto(true);
       onKeypadSolved();
       audio = document.getElementById("bomba_desactivada");
    }
    else{
      setFallado(true);
      audio = document.getElementById("solution_nok");
    }
  }

  const onMoveRequest = (filaIndex) => {
    if (animandoReset) return;          
    if (filaAnimando !== null) return;  
    if (posiciones[filaIndex] >= meta) return;

    setFilaAnimando(filaIndex);
  };

  const resetCaballos = () => {
    if (filaAnimando !== null) return;
    if (animandoReset) return;

    if (!posiciones.some((p) => p > 0)) return; 

    setSolucion("");

    const q = buildResetQueue(posiciones);
    setResetQueue(q);
    setAnimandoReset(true);

    setFilaAnimando(q[0]); 
  };

  const onAnimacionFin = (filaIndex) => {
    if (animandoReset) {
      setPosiciones((prev) => {
        const next = [...prev];
        next[filaIndex] = Math.max(next[filaIndex] - 1, 0);
        return next;
      });

      setResetQueue((prevQ) => {
        const nextQ = prevQ.slice(1);

        if (nextQ.length === 0) {
          setAnimandoReset(false);
          setFallado(false);
          setResuelto(false);
          setFilaAnimando(null);
          return [];
        }

        setFilaAnimando(nextQ[0]);
        return nextQ;
      });

      return;
    }

    setPosiciones((prev) => {
      const next = [...prev];
      next[filaIndex] = Math.min(next[filaIndex] + 1, meta);
      return next;
    });

    setSolucion((prev) => (!prev ? `${filaIndex}` : `${prev};${filaIndex}`));

    setFilaAnimando(null);
  };

  return (
    <div className="contenedor">
      <div className="tablero-central">
        {Array.from({ length: filas }).map((_, filaIndex) => {
          const esUltimaFila = filaIndex === filas - 1;
          const hayCaballoAqui = filaIndex < filasConCaballo;

          return (
            <div key={filaIndex} className={esUltimaFila ? "fila fila-final" : "fila"} style={{ "--columnas": columnas }}>
              {!esUltimaFila && hayCaballoAqui && (
                <Caballo columnas={columnas} posicion={posiciones[filaIndex]} filaIndex={filaIndex} animando={filaAnimando === filaIndex} animandoReset={animandoReset} onAnimacionFin={onAnimacionFin}/>
              )}

              {!esUltimaFila && !hayCaballoAqui && (
                <>
                  {Array.from({ length: columnas }).map((_, col) => (
                    <div key={col} className="celda" />
                  ))}
                </>
              )}

              {esUltimaFila &&
                Array.from({ length: columnas }).map((_, col) => (
                  <div key={col} className="celda celda-ultima-fila" >
                    {col + 1}
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      <div className="caseta"></div>
      <Luces resuelto={resuelto} fallado={fallado}/>
      
      <Botonera filasConCaballo={filasConCaballo} onMoveRequest={onMoveRequest} onReset={resetCaballos} animandoReset={animandoReset}/>
    </div>
  );
}

export default TableroCentral;