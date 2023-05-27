import { Form } from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import useValidation from "../../hooks/useValidation";
import useAxios from "../../hooks/useAxios";

export default function LoginFormInput({
	value,
    isRegister,
	label,
	control,
	setIsValid,
	validation,
}) {
	const [isOk, msg] = useValidation({ validation });
	const [errorUnique, setErrorUnique] = useState(null);

	const valueDebounced = useDebounce(value, 300);

	const [data, error, loading, runRequest] = useAxios({
		method: "GET",
		url: "/users/exist",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	useEffect(() => {
		if (!data) return;

		if (data.exists === true) {
			setErrorUnique("Użytkownik o takiej nazwie już istnieje");
		} else {
			setErrorUnique(null);
			setIsValid(isOk);
		}
	}, [data]);

	useEffect(() => {
		if (!isOk) return;

        if(!isRegister){
            setErrorUnique("");
            setIsValid(isOk);
            return;
        }

        setErrorUnique("Trwa sprawdzanie dostępności loginu...")
		runRequest({
			params: {
				Nick: value,
			},
		});
	}, [valueDebounced, isRegister]);

	return (
		<>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>{label}</Form.Label>
				{control}
				<Form.Text className="text-muted">
					{errorUnique ? errorUnique : msg}
				</Form.Text>
			</Form.Group>
		</>
	);
}
