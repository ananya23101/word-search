import { useEffect, useState } from "react";
import "./Square.css";

const Square = ({ letter, onHandleClick, state, setState, arrIndex, id, arr , list }) => {

  const [isSelected , setIsSelected] = useState(false);


  const handleMouseDown = () => {
    setIsSelected(true);
    setState(true);
    arrIndex[id] = { row: letter.row, col: letter.col };
  };
  const handleMouseUp = () => {
    setIsSelected(false);
    setState(false);
    arrIndex[id] = { row: letter.row, col: letter.col };
  }

  useEffect(() => {
    if(!state){
      setIsSelected(false);
    }
  },[state]);

  const isInArray = arr.some(
    (item) => item.row === letter.row && item.col === letter.col
  );

  return (
    <>
      <div
        className={`square ${isInArray ? "square-clicked" : " " }  ${state ? isSelected ?  isInArray ? "square-clicked" : "square-selected" : " " : " "}`}
        onMouseDown={() => {
          onHandleClick();
          handleMouseDown();
        }}

        onMouseUp={() => {
          onHandleClick();
          handleMouseUp();
        }}
      >
        {letter.value}
      </div>
    </>
  );
};

export default Square;
