import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const isAuthorize = (idOwner, idRelatedOwner, id, rank, isLogged, conditions) => {

    //console.log(conditions);

    let authorize;

    if(conditions.loggedIn == false){
        //console.log("nie wymagane zalogowanie: true")
        return true;
    }
    else if(isLogged == false){
        return false;
    }


    //console.log("sprawdzam dalej")

    if(conditions.ranks?.includes(rank)){
        return true;
    }
    else if((conditions.owner && idOwner == id) || (conditions.relatedOwner == true && idRelatedOwner == id) ){
        if(!conditions.allowBlocked && rank == 'Blocked')
            return false;
        else
            return true;
    }
    else if(!conditions.owner && idOwner != id){
        if(!conditions.allowBlocked && rank == 'Blocked')
            return false;
        else
            return true;
    }
    else {
        authorize = false;
    }

    return authorize;
};

export default isAuthorize;
