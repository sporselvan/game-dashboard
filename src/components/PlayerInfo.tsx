import { useEffect, useState } from "react";

type Player = {
    name:string;  //required
    age:string | number;
}

type Props = {
    buttonName: string;
    playerName: string;
    playerAge: string | number;
    handleClick:(updateType:string,player:Player)=>void;
}

function PlayerInfo(props:Props) {

    // State for player name and age
    const [name,setName] =  useState("");
    const [age,setAge] =  useState<string>("");

    // Function to handle button click (Add or Save)

    const handleClick = (updateType:string,player:Player):void => {

        if(player.age && player.name){
            props.handleClick(updateType,player);  
        }   
         
    };

    // Set initial state based on props
    useEffect(()=>{
        setName(props.playerName);
        setAge(`${props.playerAge}`);
    },[props.playerAge, props.playerName]);

    useEffect(()=>{
        console.log({age});
    },[age]);

    return (
        <div className="d-flex mb-3 gap-3">

                {/* Input for player name */}
                <input 
                 type="text" 
                 className="form-control shadow-none"
                 aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-sm"
                 style={{ backgroundColor: '#ECE9F9' }} 
                 value={name}
                 onChange={(el)=>setName(el.target.value)}
                 />

                {/* Input for player age */}
                <input 
                 type="text"
                 className="form-control shadow-none" 
                 aria-label="Sizing example input" 
                 aria-describedby="inputGroup-sizing-sm" 
                 style={{ backgroundColor: '#ECE9F9' }} 
                 value={age}
                 onChange={(el)=>setAge(el.target.value)}
                 />
                
                {/* Button for update or Add new player */}
                <button 
                    type="button" 
                    className="btn" 
                    style={{ backgroundColor: "#B8AEE9", color: 'white' }} 
                    onClick={()=>handleClick(props.buttonName,{name,age:age})}>{props.buttonName}
                </button>
        </div>
    )
  }

export default PlayerInfo;