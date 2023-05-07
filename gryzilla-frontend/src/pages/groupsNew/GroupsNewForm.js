import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export default function GroupsNewForm() {
	const auth = useAuth();
    const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const [errorName, setErrorName] = useState();
	const [errorDescription, setErrorDescription] = useState();

	const [data, error, loading, runRequest] = useAxios({
		method: "POST",
		url: "/groups",
		headers: { accept: "*/*" },
	});

	const validateForm = () => {
		setErrorDescription(null);
		setErrorName(null);
		if (name.length != 0) {
			if (name.length < 3)
				setErrorName("Nazwa grupy musi zawierać minimum 3 znaki");
		}

		if (description.length != 0) {
			if (description.length < 20)
				setErrorDescription("Opis grupy musi zawierać minimum 20 znaków");
		}

		if (errorDescription && errorName) return false;
		return true;
	};

	useEffect(() => {
		validateForm();
	}, [name, description]);

	useEffect(() => {
		if (!data) return;
		console.log("dodoano");
        navigate(`/groups/${data.idGroup}`)
	}, [data]);

	const handleClick = () => {
		if (!validateForm()) return;
		runRequest({
			data: { idUser: auth.id, groupName: name, description: description },
		});
	};

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Nazwa grupy</Form.Label>
					<Form.Control
						onChange={(e) => {
							setName(e.target.value);
						}}
						type="text"
						placeholder="Nazwa grupy"
					/>
					<Form.Text className="text-muted">{errorName}</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="">
					<Form.Label>Opis grupy</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Opis grupy"
						onChange={(event) => setDescription(event.target.value)}
					/>
					<Form.Text className="text-muted">{errorDescription}</Form.Text>
				</Form.Group>
			</Form>
			<div className="d-flex justify-content-center gap-3">
				<Button variant="primary" onClick={handleClick}>
					Utwórz
				</Button>
			</div>
		</>
	);
}
