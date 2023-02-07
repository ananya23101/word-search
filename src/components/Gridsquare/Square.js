import './Square.css'


const Square = (props) => {
    return ( 
        <span className="square">{props.letter}</span>
     );
}
 
export default Square;