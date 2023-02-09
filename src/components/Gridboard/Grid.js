import React, { useEffect, useState } from "react";
import Square from "../Gridsquare/Square";
import './grid.css';
const Grid = () => {

    const [list, setList] = useState([]);
    const [row, setRow] = useState(0);
    const [col , setCol] = useState(0);
    const [direction , setDirection] = useState();

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "R", "T", "U", "V", "W", "X", "Y", "Z"];
   const wordList = ["Andra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madya Pradesh","Maharashtra","Manipur",
                     "Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telagana","Tripura","Uttaranchal","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadar and Nagar Haveli",
                     "Daman and Diu","Delhi","Lakshadeep","Pondicherry","Hyderabad","Amaravati","Itangar","Dispur","Patna","Raipur","Panaji","Gandhinagar","Chandigarh","Shimla","Srinagar","Jammu","Ranchi","Bangalore","Thiruvananthapuram",
                     "Bhopal","Mumbai","Imphal","Shillong","Aizawi","Kohima","Bhubaneshwar","Chandigarh","Jaipur","Gangtok","Chennai","Hyderabad","Agartala","Dehradun","Lucknow","Kolkata","Capital","Port Blair","Chandigarh","Silvassa","Daman",
                     "Delhi","Kavaratti","Pondicherry","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
                     "Bolivia","Chad","Chile","China","Colombia","Comoros","Denmark","Dominica","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Georgia","Germany","Ghana","Greece","Grenada","Guatemala", "Guinea","Guinea-Bissau",
                     "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
                     "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
                     "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
                     "Apple","Watermelon","Orange","Pear","Cherry","Strawberry","Nectarine","Grape","Mango","Blueberry","Pomegranate","Plum", "Banana","Raspberry","Mandarin","Jackfruit","Papaya","Kiwi","Pineapple","Lime","Lemon","Apricot","Grapefruit","Melon","Coconut",
                     "Avocado","Peach","Greatgrandfather","Greatgrandmother","Greatuncle","Grandfather","Grandmother","Greataunt","Uncle","Aunt","Father","Mother","Sister","Brother","Husband","Wife","Cousin","Nephew","Niece","Son","Daughter","Grandson","Granddaughter",
                     "Bolt","Nail","Screwdriver","Bradawl","Handsaw","Nut","Screw","Wrench","Backsaw","Mallet","Hammer","Hacksaw","Chainsaw","Brace","Toolbox","Corkscrew","Plunger","Stepladder","Apple", "Orange", "Table", "Elephant","Total", "Super", "React", "Angular", 
                     "Selenium", "Automation"]

    const directions = ["horizontal" , "horizontalBack" , "vertical", "verticalUp", "diagonal", "diagonalUp", "diagonalBack", "diagonalUpBack" ];
   //making a word grid
   let grid = [];
   for( let i = 0 ; i < 12 ; i++){
    grid.push([]);
    for(let j = 0 ; j < 12 ; j++){
        grid[i].push("A");
    }
}
    //getting random words from the wordList
    const randomWords = () => {
    let list = [];
    for(let i = 0 ; i<7 ; i++){
        list.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
   setList(list);
    }
//get random row
const getRandomRow = () => {
    return Math.floor(Math.random() * 12);
}
//get random column
const getRandomColumn = () => {
    return Math.floor(Math.random()* 12);
}
const getRandomDirection = () =>{
    return directions[Math.floor(Math.random() * directions.length)];
}

// const placeWords = () => {
//     for( let i = 0 ; i < list.length ; i++){

//     }
// }

const placeWord = () => {
    var start = 4;
    var end = 11;
    var word = "hello";

   

    for(let letter of word){
        
        if(start < 0 || start >= grid.length || end<0 || end>= grid.length){
            console.log("not possible to fit");
            return;
        }
        else if(grid[start][end]!==letter && grid[start][end]!== " "){
            console.log("not enough space");
            return;
        }

        start += 1;
        end += 1;
    }

    start = 2;
    end = 6;
    for(let lette of word){
        grid[start][end]=lette;
        start += 1;
        end +=1;
    }
    console.log(grid)
    return grid;
}
   
useEffect(() => {
     randomWords();
     setCol(getRandomColumn());
     setRow(getRandomRow());
     setDirection(getRandomDirection());
     placeWord();
},[])


    return ( 
        <>
    
      </>
     );
}
 
export default Grid