import { useState, useEffect } from "react";


const Test = () => {
    const [isPending, setIsPending] = useState(true);
    const [test, setTest] = useState(false);
    const[count, setCount] = useState(1);

    useEffect(()=>{
        
        setIsPending(false);
        console.log("inside useEffect");
        
        
    },[])

    return (<div>Hello World

        <button onClick={()=>{
            setCount(count + 1);
        }}>Count up</button>
    </div>  );
}
 
export default Test;