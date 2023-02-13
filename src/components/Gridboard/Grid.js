import { useEffect, useState } from "react";
import Square from "../Gridsquare/Square";
import './grid.css';

const Grid = () => {


    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 
    'z'];
    
   
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
                     "Selenium", "Automation"];

   
    const directions = [ {x:1,y:0} , {x:0,y:1} , {x:-1,y:0} , {x:0,y:-1} , {x:1,y:1} , {x:-1,y:-1} , {x:1,y:-1} , {x:-1,y:1} ]


    const getRandomWords = () => {
        var list = [];
            for(let i = 0 ; i<7 ; i++){
                let randWord = wordList[Math.floor(Math.random() * wordList.length)]
                if(list.indexOf(randWord) < 0){
                    list.push(randWord);
                }
                else{
                    i--;
                }
            }
            return list;
    }
    
    const getRandomRow = () => {
        return Math.floor(Math.random() * 12);
    }

    const getRandomCol = () => {
        return Math.floor(Math.random() * 12);
    }

    const getRandomDirection = () => {
       return directions[Math.floor(Math.random() * directions.length)]
    }


    const fillWords = (word ,grid) =>{
        var start = getRandomRow();
        var end = getRandomCol();
        var direction = getRandomDirection();
        var s = start;
        var e = end
        console.log(start , end, direction , s, e); 
        

        for(let letter of word){
               if(start < 0 || start >= 12 || end >= 12 || end < 0){
                console.log("no fit")
                return false;
               }
               else if( grid[start][end] !== " "  &&  grid[start][end]!==letter){
                console.log("not enough space");
                return false;
               }
               start += direction.x;
               end += direction.y;
            }
        for( let letter of word){
            if(letter === " ") {continue;}
            grid[s][e] = letter.toUpperCase();
            s += direction.x;
            e += direction.y;
        }
        return;      
    }
   
    const [puzzle , setPuzzle] = useState([]);

   const fillGrid = () => {
    var list = getRandomWords();
    console.log(list);

    var grid = [];

    for( var i = 0 ; i< 12 ; i++){
       grid.push([]);
       for( let j = 0 ; j<12 ; j++){
           grid[i].push(" ");
       }
    }

         for( let i =0 ; i < list.length ; i++){

            fillWords(list[i] , grid);

         }
         setPuzzle(grid);
         return puzzle;
   }

  

   useEffect(()=>{
       fillGrid();
       console.log(puzzle);
   },[])



    return ( 
        <div className="word-grid">{puzzle.map(item => {
            return <div> { item.map(box => {
                return <Square letter = {box} />
            })}</div>
          })}</div>
     );
}
 
export default Grid;