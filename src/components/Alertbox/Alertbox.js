import { useEffect, useState } from "react";
import "./Alertbox.css";

const Alertbox = ({setRestart}) => {

    const gameRestart = () => {
        setRestart(true);
    }
     

    return ( <>
      <div className="alert">
        <p>Congratulations!!!</p>
        <p className="text">You Win!!!</p>
        <button onClick={gameRestart}>Play Again</button>
      </div>
    </> );
}
 
export default Alertbox;