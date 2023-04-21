import { useState } from 'react';
import './Square.css'
import useGameStart from '../useGameStart';


const Square = ({letter , onHandleClick , state}) => {
   
   const handleMouseDown = () =>{
      console.log(!state , letter.row , letter.col);
   }
   
    return ( 
        <><div className="square" onClick={() => onHandleClick()} onMouseDown={handleMouseDown}>{letter.value}</div>
        </>
        
       
     );
}
 
export default Square;