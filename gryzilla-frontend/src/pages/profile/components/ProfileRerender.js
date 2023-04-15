
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfileRerender() {
    const { idUser } = useParams();
    const navigate = useNavigate();

    console.log("rerender")
    useEffect(()=>{
        navigate(`/profile/${idUser}`);
    },[])
    

    return (
        <></>
    );
}