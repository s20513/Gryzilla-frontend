import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function AuthLoggedBoundery({ roles, urlBlock, children,}) {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isLogged || !roles.includes(auth.role)) {
            navigate(urlBlock)
        }
	}, [auth.isLogged]);

	return <>{children}</>;
}
