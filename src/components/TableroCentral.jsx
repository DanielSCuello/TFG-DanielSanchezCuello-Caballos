import { useState ,useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import './../assets/scss/TableroCentral.css';
import Caballo from "./Caballo.jsx";
import Botonera from "./Botonera.jsx";

function TableroCentral({  }) {
  const { escapp, appSettings, Utils} = useContext(GlobalContext);
  const [reinicio, setReinicio] = useState(false);
  const [descubierto, setDescubierto] = useState(false);
  const [posiciones, setPosiciones] = useState(
    Array.from({ length: 4 }, () => 0)
  );

  const columnas = 10;
  const totalCeldas = 50;
  const filas = totalCeldas / columnas;
  const meta = 10-1;

  

  return (
    <div className="contenedor">
      <div className="tablero-central">

        {Array.from({ length: filas }).map((_, filaIndex) => {
          const esUltima = filaIndex === filas - 1;

          return (
            <div key={filaIndex} className={esUltima ? "fila fila-final" : "fila"} >
              {!esUltima && (
                <Caballo columnas={columnas} posicion={posiciones[filaIndex]} filaIndex={filaIndex} />
              )}

              {esUltima &&
                Array.from({ length: columnas }).map((_, i) => (
                  <div key={i} className="celda celda-ultima-fila"/>
                ))
              }
            </div>
          );
        })}
      </div>

      <div className="caseta">
      </div>
      <Botonera posiciones={posiciones} setPosiciones={setPosiciones} meta={meta} filasConCaballo={4}/>
    </div>
  );
}

export default TableroCentral;