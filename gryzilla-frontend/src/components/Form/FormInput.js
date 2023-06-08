import { Form } from "react-bootstrap";
import useValidation from "../../hooks/useValidation";
import { useEffect, useState } from "react";

export default function FormInput({
    label,
	control,
	setIsValid,
	validation,
}) {
	const [isOk, msg] = useValidation({validation});

	useEffect(()=>{
	    setIsValid(isOk);
	},[isOk])

	return (
		<>
			<Form.Group className="mb-3">
				{label && <Form.Label>{label}</Form.Label>}
				{control}
				<Form.Text className="text-muted">{msg}</Form.Text>
			</Form.Group>
		</>
	);
}
