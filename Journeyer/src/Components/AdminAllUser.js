import axios from "axios";
import { useEffect } from "react";

export function AdminAllUser(){

    const allUser=async()=>{
            const data=await axios.get("http://localhost:8080/all");
            console.log(data);
    }

    useEffect(()=>{

    },[]);


    return(
        <>
            
        </>
    );
}