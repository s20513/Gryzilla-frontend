import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";

export default function GroupsNewForm() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const [isValidName, setIsValidName] = useState(false);
	const [isValidDesc, setIsValidDesc] = useState(false);

	const isValidArr = [isValidName, isValidDesc];

	const [data, error, loading, runRequest] = useAxios({
		method: "POST",
		url: "/groups",
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		if (!data) return;
		console.log("dodoano");
		navigate(`/groups/${data.idGroup}`);
	}, [data]);

	const handleSubmit = () => {
		if (isValidArr.some((v) => v !== true)) return;

		runRequest({
			data: { idUser: auth.id, groupName: name, description: description },
		});
	};

	const handleClose = () => {
		navigate("/groups");
	}

	return (
		<>
			<Form>
				<FormInput
					label={"Nazwa grupy"}
					control={
						<Form.Control
							onChange={(e) => {
								setName(e.target.value);
							}}
							type="text"
							placeholder="Nazwa grupy"
						/>
					}
					setIsValid={setIsValidName}
					validation={{
						validate: name,
						required: { value: true },
						minLength: { value: 5 },
						maxLength: { value: 60 },
					}}
				/>

				<FormInput
					label={"Opis grupy"}
					control={
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Opis grupy"
							onChange={(event) => setDescription(event.target.value)}
						/>
					}
					setIsValid={setIsValidDesc}
					validation={{
						validate: description,
						required: { value: true, message: "Opis grupy jest wymagany" },
						minLength: {
							value: 10,
							message: "Opis musi się składac z co najmniej 10 znaków",
						},
						maxLength: { value: 200 },
					}}
				/>
			</Form>

			<div className="d-flex justify-content-center mb-3">
				{error && <span>Grupa o takiej nazwie już istnieje</span>}
			</div>

			<div className="d-flex justify-content-center gap-3">
				<Button variant="primary" onClick={handleClose}>
					Powrót
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Utwórz
				</Button>
			</div>
		</>
	);
}
