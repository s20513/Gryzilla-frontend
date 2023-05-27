import { useEffect, useState } from "react";

export const useValidation = ({ validation }) => {
	const [isValidate, setIsValidate] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		console.log(validation.validate);
		const { isOk, msg } = Validate(validation.validate, validation);
		setIsValidate(isOk);
		setErrorMessage(msg);
	}, [validation.validate, validation.equalTo ? validation.equalTo.value : null]);

	return [isValidate, errorMessage];
};

export default useValidation;

export const Validate = (value, validation) => {
	var isOk = true;
	var errorMessage = "";

	const empty = "Pole nie może być puste";
	const toShort = "Pole powinno się składać z conajmniej * znaków";
	const toLong = "Pole powinno się składać z maksymalnie * znkaów";
    const notEqual = "Pola różnią się od siebie";
	const notEmail = "Podany email nie jest prawidłowy";
	const notPhone = "Podany numer telefonu nie jest prawidłowy";

	if (validation.required.value == true) {
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

	if (validation.minLength.value) {
		if (isLessThen(value, validation.minLength.value)) {
			return {
				isOk: false,
				msg: validation.minLength.message
					? validation.minLength.message
					: toShort.replace("*", validation.minLength.value),
			};
		}
	}

	if (validation.maxLength.value) {
		if (isMoreThan(value, validation.maxLength.value)) {
			return {
				isOk: false,
				msg: validation.maxLength.message
					? validation.maxLength.message
					: toLong.replace("*", validation.maxLength.value),
			};
		}
	}

	if (validation.equalTo) {
		if (!isEqual(value, validation.equalTo.value)) {
			return {
				isOk: false,
				msg: validation.equalTo.message
					? validation.equalTo.message
					: notEqual,
			};
		}
	}

	// if(validation.email){
	//     if(!isEmail) {
	//         return {isOk: false, msg: notPhone}
	//     }
	// }

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
