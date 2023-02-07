import React from "react";
import Square from "../Gridsquare/Square";
import './grid.css';
const Grid = () => {

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "R", "T", "U", "V", "W", "X", "Y", "Z"]

    const grid = [];
   //making a word grid
    for( let i = 0 ; i < 12 ; i++){
        grid.push([]);
        for(let j = 0 ; j < 12 ; j++){
            grid[i].push(<Square letter={letters[Math.floor(Math.random() * letters.length)]} />);
        }
    }
    return ( 
      <div className="word-grid">{grid.map(item => {
        return <div> { item.map(box => {
            return <p>{box}</p>
        })}</div>
      })}</div>
     );
}
 
export default Grid