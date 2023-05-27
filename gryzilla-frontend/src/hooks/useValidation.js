import { useEffect, useState } from "react";

    export const useValidation = ({value, validation}) => {

    const [isValidate, setIsValidate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    

	useEffect(() => {
        console.log(value)
		const {isOk, msg} = Validate(value, validation);
        setIsValidate(isOk);
        setErrorMessage(msg);
	}, [value]);

    return [isValidate, errorMessage]
};

export default useValidation;

export const Validate = (value, validation) => {
    var isOk = true;
    var errorMessage = "";

    const empty = "Pole nie może być puste";
    const toShort = "Pole powinno się składać z conajmniej * znaków";
    const toLong = "Pole powinno się składać z maksymalnie * znkaów";
    const notEmail = "Podany email nie jest prawidłowy";
    const notPhone = "Podany numer telefonu nie jest prawidłowy";

    if(validation.required == true){
        if(isEmpty(value)){
            return {isOk: false, msg: "Pole nie może być puste"};
        }
    } else {
        if(isEmpty(value)){
            return {isOk: true, msg: ""}
        }
    }

    if(validation.minLength){
        if(isLessThen(value, validation.minLength)){
            return {isOk: false, msg: "Za mała długość"};
        }
    }

    if(validation.maxLength){
        if(isMoreThan(value, validation.maxLength)){
            return {isOk: false, msg: "Za duża długość"};
        }
    }

    // if(validation.email){
    //     if(!isEmail) {
    //         return {isOk: false, msg: notPhone}
    //     }
    // }

    return {isOk: true, msg: ""};
}

const isEmpty = (value) => {
    if(value && value.length > 0) {
        return false;
    }
    return true;
}

const isLessThen = (value, size) => {
    if(value.length < size) {
        return true;
    }
    return false;
}

const isMoreThan = (value, size) => {
    if(value.length > size) {
        return true;
    }
    return false;
}

