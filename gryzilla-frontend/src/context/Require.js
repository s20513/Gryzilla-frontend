import { useAuth } from "./AuthContext";

export default function Require({ req, children }) {

    // req={{
    //     authLogged: true,
    //     idOwner: owner,
    //     authOwner: true,
    //     authRole: ["Admin", "Moderator"],
    // }}

	const auth = useAuth();
    const role = auth.role;
    const idUserLogged = auth.id;
    const isLogged = auth.isLogged;

    if(req.authLogged && req.authLogged == true) {
        if(isLogged) {
            return (
                <>{children}</> 
            )
        } else {
            return <></>
        }
    }

    if(isLogged && req.authOwner && req.authOwner == true) {
        if(req.idOwner == idUserLogged) {
            return (
                <>{children}</> 
            )
        }
    }

    if(isLogged && req.authRole && req.authRole.length > 0 ) {
        console.log("sptawdzam authROle")
        if(req.authRole.includes(role)) {
            return (
                <>{children}</> 
            )
        }
    }

    return <></>;


}