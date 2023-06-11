import { useEffect, useState } from "react";

export const useValidation = ({ validation }) => {
	const [isValidate, setIsValidate] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// useEffect(() => {
	// 	// console.log(validation.validate);
	// 	const { isOk, msg } = Validate(validation.validate, validation);
	// 	setIsValidate(isOk);
	// 	setErrorMessage(msg);
	// }, [validation.validate, validation.equalTo ? validation.equalTo.value : null]);

	useEffect(() => {
		//console.log("waliduje pole " + validation.validate);
		//console.log(validation)
		const { isOk, msg } = Validate(validation.validate, validation);
		//console.log(isOk)
		setIsValidate(isOk);
		setErrorMessage(msg);
	}, [validation]);

	return [isValidate, errorMessage];
};

export default useValidation;

export const Validate = (value, validation) => {
	var isOk = true;
	var errorMessage = "";

	const empty = "Pole nie może być puste";
	const toShort = "Pole powinno się składać z co najmniej * znaków";
	const toLong = "Pole powinno się składać z maksymalnie * znaków";
    const notEqual = "Pola różnią się od siebie";
	const notEmail = "Podany email nie jest prawidłowy";
	const notPhone = "Podany numer telefonu nie jest prawidłowy";

	if (validation.required && validation.required.value) {
		if (isEmpty(value)) {
			return {
				isOk: false,
				msg: validation.required.message ? validation.required.message : empty,
			};
		}
	} else {
		if (isEmpty(value)) {
			return { isOk: true, msg: "" };
		}
	}

	if (validation.minLength && validation.minLength.value ) {
		if (isLessThen(value, validation.minLength.value)) {
			return {
				isOk: false,
				msg: validation.minLength.message
					? validation.minLength.message
					: toShort.replace("*", validation.minLength.value),
			};
		}
	}

	if (validation.maxLength && validation.maxLength.value) {
		if (isMoreThan(value, validation.maxLength.value)) {
			return {
				isOk: false,
				msg: validation.maxLength.message
					? validation.maxLength.message
					: toLong.replace("*", validation.maxLength.value),
			};
		}
	}

	if (validation.equalTo && validation.equalTo.value) {
		if (!isEqual(value, validation.equalTo.value)) {
			return {
				isOk: false,
				msg: validation.equalTo.message
					? validation.equalTo.message
					: notEqual,
			};
		}
	}

	if(validation.email && validation.email.value){
	    if(!isEmail(value)) {
	        return {isOk: false, msg: validation.email.message ? validation.email.message : notEmail}
	    }
	}

	if(validation.phoneNumber && validation.phoneNumber.value){
	    if(!isPhoneNumber(value)) {
	        return {isOk: false, msg: validation.phoneNumber.message ? validation.phoneNumber.message : notPhone}
	    }
	}

	return { isOk: true, msg: "" };
};

const isEmpty = (value) => {
	if (value && value.length > 0) {
		return false;
	}
	return true;
};

const isLessThen = (value, size) => {
	if (value.length < size) {
		return true;
	}
	return false;
};

const isMoreThan = (value, size) => {
	if (value.length > size) {
		return true;
	}
	return false;
};

const isEqual = (value, toCompare) => {
	if (value === toCompare) {
		return true;
	}
	return false;
};

const isEmail = (value) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(emailRegex.test(value)) {
		return true;
	}
	return false;
}

const isPhoneNumber = (value) => {
	const phoneRegex = /^(?:\+?48)?(?:\s?-?\d{3}){3}$/;
	if(phoneRegex.test(value)) {
		return true;
	}
	return false;
}
