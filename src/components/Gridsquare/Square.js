import "./Square.css";

const Square = ({ letter, onHandleClick, state, arrIndex, id, arr }) => {
  const handleMouseDown = () => {
    arrIndex[id] = { row: letter.row, col: letter.col };
  };

  const isInArray = arr.some(
    (item) => item.row === letter.row && item.col === letter.col
  );

  return (
    <>
      <div
        className={`square ${isInArray ? "square-clicked" : " "}`}
        onMouseDown={() => {
          onHandleClick();
          handleMouseDown();
        }}
        onMouseUp={() => {
          onHandleClick();
          handleMouseDown();
        }}
      >
        {letter.value}
      </div>
    </>
  );
};

export default Square;
