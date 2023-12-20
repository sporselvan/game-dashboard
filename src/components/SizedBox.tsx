
type Props = {
    width:number;  // Width of the 'SizedBox' component
    height:number; // Height of the 'SizedBox' component
};

// Functional component representing a box with specified width and height
function SizedBox (props:Props){
    return (
        <div style={{height:props.height ? props.height : 1,width:props.width ? props.width : 1}}>
        </div>
    );
}

export default SizedBox;