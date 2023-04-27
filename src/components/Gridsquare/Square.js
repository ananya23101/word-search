import { useState } from 'react';
import './Square.css'



const Square = ({letter , onHandleClick ,  state}) => {

   
   const handleMouseDown = () =>{
        console.log(letter.row , letter.col);
   }
   const handleMouseOver = () => {
        if(state){
            console.log(letter.row , letter.col);
        }
   }
   
    return ( 
        <><div className="square" onMouseDown={() => {onHandleClick() ; handleMouseDown()}} onMouseOver={handleMouseOver} onMouseUp={() => {onHandleClick() ; handleMouseDown()}} >{letter.value}</div>
        </>
        
       
     );
}
 
export default Square;