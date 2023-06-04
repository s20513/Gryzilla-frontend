import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePanelWrapper({ children }) {
	const { idUser } = useParams();
	const navigate = useNavigate();
	const auth = useAuth();
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!auth.isLogged || auth.id != idUser) navigate(`/profile/${idUser}`);
	}, [auth.isLogged]);

	return <>{children}</>;
}
