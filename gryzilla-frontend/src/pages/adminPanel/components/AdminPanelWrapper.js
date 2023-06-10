import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

export default function AdminPanelWrapper({ children }) {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isLogged) {
            navigate("/")
        } else if ( auth.role != 'Admin' && auth.role != 'Moderator') {
            navigate(`/profile/${auth.id}`);
        }
	}, [auth.isLogged]);

	return <>{children}</>;
}
