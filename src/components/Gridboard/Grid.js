import { useEffect, useState } from "react";
import Square from "../Gridsquare/Square";
import './grid.css';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 
'z'];

const wordList = ["Andra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madya Pradesh","Maharashtra","Manipur",
                 "Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telagana","Tripura","Uttaranchal","Uttar Pradesh","West Bengal","Chandigarh",
                 "Daman and Diu","Delhi","Lakshadeep","Pondicherry","Hyderabad","Amaravati","Itangar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Chandigarh","Shimla","Srinagar","Jammu","Ranchi","Bangalore",
                 "Bhopal","Mumbai","Imphal","Shillong","Aizawi","Kohima","Bhubaneshwar","Chandigarh","Jaipur","Gangtok","Chennai","Hyderabad","Agartala","Dehradun","Lucknow","Kolkata","Capital","Port Blair","Chandigarh","Silvassa","Daman",
                 "Delhi","Kavaratti","Pondicherry","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
                 "Bolivia","Chad","Chile","China","Colombia","Comoros","Denmark","Dominica","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Georgia","Germany","Ghana","Greece","Grenada","Guatemala", "Guinea","GuineaBissau",
                 "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
                 "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
                 "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Tunisia","Turkey","Turkmenistan","Tuvalu",
                 "Apple","Watermelon","Orange","Pear","Cherry","Strawberry","Nectarine","Grape","Mango","Blueberry","Pomegranate","Plum", "Banana","Raspberry","Mandarin","Jackfruit","Papaya","Kiwi","Pineapple","Lime","Lemon","Apricot","Grapefruit","Melon","Coconut",
                 "Avocado","Peach","Greatgrandfather","Greatgrandmother","Greatuncle","Grandfather","Grandmother","Greataunt","Uncle","Aunt","Father","Mother","Sister","Brother","Husband","Wife","Cousin","Nephew","Niece","Son","Daughter","Grandson","Granddaughter",
                 "Bolt","Nail","Screwdriver","Bradawl","Handsaw","Nut","Screw","Wrench","Backsaw","Mallet","Hammer","Hacksaw","Chainsaw","Brace","Toolbox","Corkscrew","Plunger","Stepladder","Apple", "Orange", "Table", "Elephant","Total", "Super", "React", "Angular", 
                 "Selenium", "Automation"];

                 const directions = [  {x:1,y:1} , {x:-1,y:-1} , {x:1,y:-1} , {x:-1,y:1}, {x:1,y:0} , {x:0,y:1} , {x:-1,y:0} , {x:0,y:-1} ]

const Grid = () => {

    const getRandomWords = () => {
        let list = [];
            for(let i = 0 ; i<7 ; i++){
                let randWord = wordList[Math.floor(Math.random() * wordList.length)]
                if(list.indexOf(randWord) < 0){
                    list.push(randWord);
                }
                else{
                    i--;
                }
            }
            return list.sort((a,b) =>  b.length - a.length);
    }

     
    const getRandomRow = () => {
        return Math.floor(Math.random() * 14);
    }

    const getRandomCol = () => {
        return Math.floor(Math.random() * 14);
    }

    const getRandomDirection = (word , start , end, grid) => {
        
        for(let i = 0 ; i< directions.length ; i++){
           let row = start;
           let col = end;
           let flag  = 0;
           for(let letter of word){
            if(row < 0 || row >= 14 || col >= 14 || col < 0){
                flag = 1;
                break;
            }
            else if( grid[row][col].value !== " " && grid[row][col].value !== letter){
                flag = 1;
                break;
            }
            row += directions[i].x;
            col += directions[i].y;
           }

           if(flag === 0){
             return directions[i];
           }
        }
      fillUnplacedWords(word , grid, 0);
      return false;
    }
    const fillWords = (word ,grid) =>{
        var start = getRandomRow();
        var end = getRandomCol();
        var direction = getRandomDirection(word , start , end, grid);
        if(direction===false) return;
        var s = start;
        var e = end
        console.log(start , end, direction , s, e); 
        

        for(let letter of word){
            if(letter === " "){
                continue;
            }
               if(start < 0 || start >= 14 || end >= 14 || end < 0){
                console.log("no fit")
                return false;
               }
               else if( grid[start][end].value !== " "  &&  grid[start][end].value!==letter){
                console.log("not enough space");
                return false;
               }
               start += direction.x;
               end += direction.y;
            }
        for( let letter of word){
            if(letter === " ") {continue;}
            grid[s][e].value = letter.toUpperCase();
            s += direction.x;
            e += direction.y;
        }
        return;      
    }
    const fillUnplacedWordsInGrid = (word, grid , s , e, direction) =>{
        for( let letter of word){
            if(letter === " ") {continue;}
            grid[s][e].value = letter.toUpperCase();
            s += direction.x;
            e += direction.y;
        }
    }
   const fillUnplacedWords = (word,grid,k) =>{
      for( let i = 0 ; i<14 ; i++){
       k = 0; 
        for( let j = 0 ; j<14 ; j++){
            let start = i;
            let end = j;
            let flag = 0 ;
            for(let letter of word){
                if(start< 0 || start >= 14 || end >= 14 || end < 0){
                    flag = 1;
                    break;
                }
                else if( grid[start][end].value !== " " && grid[start][end].value !== letter){
                    flag = 1;
                    break;
                }
                start += directions[k].x;
                end += directions[k].y;
               }
               if(flag === 0){
                console.log(directions[k]);
                fillUnplacedWordsInGrid(word, grid , i , j , directions[k]);
                return directions[k];
               }
              if(k<7){
                k++;
              }
              else{
                break;
              }
            }
              }
            }
    const [puzzle , setPuzzle] = useState([]);
    const [filledWords , setFilledWords] = useState([]);

   const fillGrid = () => {
    var list = getRandomWords();
    setFilledWords(list);
    var grid = [];

    for( let i = 0 ; i< 14 ; i++){
       grid.push([]);
       for( let j = 0 ; j<14 ; j++){
           grid[i].push({row : i , col : j , value: " "});
       }
    }
         for( let i =0 ; i < list.length ; i++){
            fillWords(list[i] , grid);
         }

        //  for( let i = 0 ; i< 14 ; i++){
        //     for( let j = 0 ; j<14 ; j++){
        //           if(grid[i][j].value === " "){
        //             let letter =  letters[Math.floor(Math.random() * letters.length)]
        //             grid[i][j].value = letter;
        //           }
        //     }
        //  }  
        console.log(grid);
         setPuzzle(grid);
   } 
   useEffect(()=>{
       fillGrid();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   const [gameStart , setGameStart] = useState(false);

    const handleClick = () => {
        setGameStart(!gameStart);
    }

    return ( 
        <>
        <div className="word-grid">{puzzle.map(item => {
            return <div> { item.map(box => {
                return <Square letter={box} onHandleClick = {handleClick} state = {gameStart}/>
            })}</div>
          })}</div>
         <div><h2>Words to be found</h2>{filledWords.map(word => {
            return <p>{word}</p>
         })}</div>
          </>
     );
}
 
export default Grid;