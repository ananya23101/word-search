import { useEffect, useRef, useState } from "react";
import Square from "../Gridsquare/Square";
import "./grid.css";
import Alertbox from "../Alertbox/Alertbox";

const letters = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
];

const wordList = ["Assam","Bihar","Goa","Gujarat","Haryana","Jharkhand","Karnataka","Kerala","MadyaPradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","TamilNadu","Telagana","Tripura","Uttaranchal","UttarPradesh","WestBengal","DamanandDiu","Delhi","Lakshadeep","Pondicherry","Hyderabad","Amaravati","Itangar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Chandigarh","Shimla","Srinagar","Jammu","Ranchi","Bangalore","Bhopal","Mumbai",
                  "Imphal","Shillong","Aizawi","Kohima","Bhubaneshwar","Chandigarh","Jaipur","Gangtok","Chennai","Hyderabad","Agartala","Dehradun","Lucknow","Kolkata","Capital","PortBlair","Chandigarh","Silvassa","Daman","Delhi","Kavaratti","Pondicherry","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Chad","Chile","China","Colombia",
                  "Comoros","Denmark","Dominica","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","GuineaBissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg","Madagascar",
                  "Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewZealand","Nicaragua","Niger","Nigeria","Norway","Oman","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Tunisia","Turkey","Turkmenistan","Tuvalu","Apple","Watermelon","Orange","Pear","Cherry","Strawberry","Nectarine","Grape","Mango","Blueberry","Pomegranate",
                  "Plum","Banana","Raspberry","Mandarin","Jackfruit","Papaya","Kiwi","Pineapple","Lime","Lemon","Apricot","Grapefruit","Melon","Coconut","Avocado","Peach","Greatuncle","Grandfather","Grandmother","Greataunt","Uncle","Aunt","Father","Mother","Sister","Brother","Husband","Wife","Cousin","Nephew","Niece","Son","Daughter","Grandson","Granddaughter","Bolt","Nail","Screwdriver","Bradawl","Handsaw","Nut","Screw","Wrench","Backsaw","Mallet","Hammer","Hacksaw","Chainsaw","Brace","Toolbox",
                  "Corkscrew","Plunger","Stepladder","Apple","Orange","Table","Elephant","Total","Super","React","Angular","Selenium","Automation"];

const directions = [ { x: 1, y: 1 }, { x: -1, y: -1}, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 },];

const Grid = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [filledWords, setFilledWords] = useState([]);

  const getRandomWords = () => {
    let list = [];
    for (let i = 0; i < 7; i++) {
      let randWord = wordList[Math.floor(Math.random() * wordList.length)];
      if (list.indexOf(randWord) < 0) {
        list.push(randWord.toUpperCase());
      } else {
        i--;
      }
    }
    return list.sort((a, b) => b.length - a.length);
  };

  const getRandomRow = () => {
    return Math.floor(Math.random() * 14);
  };

  const getRandomCol = () => {
    return Math.floor(Math.random() * 14);
  };

  const getRandomDirection = (word, start, end, grid) => {
    for (let i = 0; i < directions.length; i++) {
      let row = start;
      let col = end;
      let flag = 0;
      for (let letter of word) {
        if (row < 0 || row >= 14 || col >= 14 || col < 0) {
          flag = 1;
          break;
        } else if (
          grid[row][col].value !== " " &&
          grid[row][col].value !== letter
        ) {
          flag = 1;
          break;
        }
        row += directions[i].x;
        col += directions[i].y;
      }

      if (flag === 0) {
        return directions[i];
      }
    }
    fillUnplacedWords(word, grid, 0);
    return false;
  };

  const fillWords = (word, grid) => {
    var start = getRandomRow();
    var end = getRandomCol();
    var direction = getRandomDirection(word, start, end, grid);
    if (direction === false) return;
    var s = start;
    var e = end;
    for (let letter of word) {
      if (letter === " ") {
        continue;
      }
      if (start < 0 || start >= 14 || end >= 14 || end < 0) {
        return false;
      } else if (
        grid[start][end].value !== " " &&
        grid[start][end].value !== letter
      ) {
        return false;
      }
      start += direction.x;
      end += direction.y;
    }
    for (let letter of word) {
      if (letter === " ") {
        continue;
      }
      grid[s][e].value = letter.toUpperCase();
      s += direction.x;
      e += direction.y;
    }
    return;
  };

  const fillUnplacedWordsInGrid = (word, grid, s, e, direction) => {
    for (let letter of word) {
      if (letter === " ") {
        continue;
      }
      grid[s][e].value = letter.toUpperCase();
      s += direction.x;
      e += direction.y;
    }
  };

  let [unplacedWord, setUnplacedWords] = useState([]);

  const fillUnplacedWords = (word, grid, k) => {
    for (let i = 0; i < 14; i++) {
      k = 0;
      for (let j = 0; j < 14; j++) {
        let start = i;
        let end = j;
        let flag = 0;
        for (let letter of word) {
          if (start < 0 || start >= 14 || end >= 14 || end < 0) {
            flag = 1;
            break;
          } else if (
            grid[start][end].value !== " " &&
            grid[start][end].value !== letter
          ) {
            flag = 1;
            break;
          }
          start += directions[k].x;
          end += directions[k].y;
        }
        if (flag === 0) {
          fillUnplacedWordsInGrid(word, grid, i, j, directions[k]);
          return directions[k];
        }
        if (k < 7) {
          k++;
        } else {
          break;
        }
      }
    }
    setUnplacedWords((prevArray) => [...prevArray, word]);
  };

  const fillGrid = () => {
    var list = getRandomWords();
    setFilledWords(list);
    var grid = [];

    for (let i = 0; i < 14; i++) {
      grid.push([]);
      for (let j = 0; j < 14; j++) {
        grid[i].push({ row: i, col: j, value: " " });
      }
    }
    for (let i = 0; i < list.length; i++) {
      fillWords(list[i], grid);
    }

    //  for( let i = 0 ; i< 14 ; i++){
    //     for( let j = 0 ; j<14 ; j++){
    //           if(grid[i][j].value === " "){
    //             let letter =  letters[Math.floor(Math.random() * letters.length)]
    //             grid[i][j].value = letter;
    //           }
    //     }
    //  }
    setPuzzle(grid);
  };
  useEffect(() => {
    fillGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [gameFail, setGameFail] = useState(false);
  let arrIndex = useRef([]);
  let [keyId, setKeyID] = useState(0);

  const handleClick = () => {
    if (keyId === 1) {
      setKeyID(0);
      arrIndex = [];
    } else {
      setKeyID(keyId + 1);
    }
  };
  const getDirection = (dirPos) => {
    if (dirPos.row === 0) {
      if (dirPos.col > 0) return "HORIZONTAL_POS";
      if (dirPos.col < 0) return "HORIZONTAL_NEG";
    }
    if (dirPos.col === 0) {
      if (dirPos.row > 0) return "VERTICAL_POS";
      if (dirPos.row < 0) return "VERTICAL_NEG";
    }
    if (dirPos.row > 0) {
      if (Math.abs(dirPos.row) !== Math.abs(dirPos.col)) return;
      if (dirPos.col > 0) return "DIAGONAL_DOWN_POS";
      if (dirPos.col < 0) return "DIAGONAL_DOWN_NEG";
    }
    if (dirPos.row < 0) {
      if (Math.abs(dirPos.row) !== Math.abs(dirPos.col)) return;
      if (dirPos.col > 0) return "DIAGONAL_UP_POS";
      if (dirPos.col < 0) return "DIAGONAL_UP_NEG";
    } else {
      return false;
    }
  };

  const getSelectedWord = (length, row, col, dir) => {
    const cells = [];
    switch (dir) {
      case "HORIZONTAL_POS":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col + i][row].value,
            row: row,
            col: col + i,
          });
        }
        break;
      case "HORIZONTAL_NEG":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col - i][row].value,
            row: row,
            col: col - i,
          });
        }
        break;
      case "VERTICAL_POS":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col][row + i].value,
            row: row + i,
            col: col,
          });
        }
        break;
      case "VERTICAL_NEG":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col][row - i].value,
            row: row - i,
            col: col,
          });
        }
        break;
      case "DIAGONAL_UP_NEG":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col - i][row - i].value,
            row: row - i,
            col: col - i,
          });
        }
        break;
      case "DIAGONAL_UP_POS":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col + i][row - i].value,
            row: row - i,
            col: col + i,
          });
        }
        break;

      case "DIAGONAL_DOWN_NEG":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col - i][row + i].value,
            row: row + i,
            col: col - i,
          });
        }
        break;
      case "DIAGONAL_DOWN_POS":
        for (let i = 0; i < length; i++) {
          cells.push({
            direction: dir,
            letter: puzzle[col + i][row + i].value,
            row: row + i,
            col: col + i,
          });
        }
        break;
      default:
        console.log("false");
    }
    return cells;
  };

  const validateWordSelection = (postion) => {
    const start = {
      row: postion[0].col,
      col: postion[0].row,
    };
    const end = {
      row: postion[1].col,
      col: postion[1].row,
    };
    const dir = {
      row: end.row - start.row,
      col: end.col - start.col,
    };

    if (!getDirection(dir)) {
      return false;
    }

    let selectedWord = getSelectedWord(
      Math.max(Math.abs(dir.row), Math.abs(dir.col)) + 1,
      start.row,
      start.col,
      getDirection(dir)
    );
    return selectedWord;
  };

  const validateWord = (selectedcells) => {
    const words = filledWords.map((word) => {
      return word.toUpperCase();
    });
    const selectedLetter = selectedcells
      .map((cell) => {
        return cell.letter;
      })
      .join("");
    if (words.indexOf(selectedLetter) >= 0) {
      return selectedLetter;
    } else {
      return false;
    }
  };

  const [arr, setArr] = useState([]);

  const handleWordSelection = () => {
    if (arrIndex.current.length >= 2) {
      const selectedcells = validateWordSelection(arrIndex.current);
      if (!selectedcells) {
        return;
      }
      const isWord = validateWord(selectedcells);

      if (isWord) {
        selectedcells.map((item) => {
          return arr.push({ row: item.col, col: item.row });
        });
        const words = filledWords.map((word) => {
          return word.toUpperCase();
        });
        console.log(words.indexOf(isWord));
        setFilledWords(
          words.filter((item, index) => {
            return index !== words.indexOf(isWord);
          })
        );
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    handleWordSelection();
  }, [keyId]);

  return (
    <>
      <div className="word-grid">
        {puzzle.map((item, rowIndex) => {
          return (
            <div className="grid-row">
              {item.map((box, boxIndex) => {
                return (
                  <Square
                    letter={box}
                    state={gameFail}
                    setState = {setGameFail}
                    onHandleClick={handleClick}
                    arrIndex={arrIndex.current}
                    id={keyId}
                    arr={arr}
                    word = {filledWords}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        <h2>Words to be found</h2>
        {filledWords
          .filter((word) => !unplacedWord.includes(word))
          .map((filteredWord) => (
            <p key={filteredWord}>{filteredWord}</p>
          ))}
      </div>
      {filledWords.length <= 0 ? <Alertbox len={true}/> : ""}
    </>
  );
};

export default Grid;
