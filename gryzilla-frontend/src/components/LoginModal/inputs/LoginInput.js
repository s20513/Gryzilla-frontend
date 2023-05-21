import { useEffect, useState } from "react";

export default function ({login, setLogin, setError}) {

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        
    },[login])

	return (
		<Form.Group className="mb-3">
			<Form.Label>Login</Form.Label>
			<Form.Control
				onChange={(e) => {
					setLogin(e.target.value);
				}}
				type="text"
				placeholder="Enter email"
			/>
			<Form.Text className="text-muted">
				{errorMessage}
			</Form.Text>
		</Form.Group>
	);
}
