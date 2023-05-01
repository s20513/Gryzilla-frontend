import { Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { useEffect } from "react";

export default function ResolveButton({url, data, idContent, isResolved, setIsResolved}) {
    const [dataR, error, loading, runRequest] = useAxios({
        executeOnRender: false,
		method: "PUT",
		url: url,
        data: {
            idUser: data.idUser,
            ...idContent,
            idReason: data.idReason,
            content: data.content,
            viewed: !isResolved
        },
		headers: { accept: "*/*" },
	});

    useEffect(()=>{
        if(!dataR) return;
        setIsResolved(!isResolved);
    },[dataR])

    const submit = ()=> {
        runRequest(); 
    }

    return (
        <Button className="btn-success" onClick={()=>{submit()}}>{!isResolved ? ("Zamknij zgłoszenie") : ("Otwórz zgłoszenie")}</Button>
    );
}