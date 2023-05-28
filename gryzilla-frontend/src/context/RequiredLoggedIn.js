import { useAuth } from "./AuthContext";

export default function ReqLoggedIn({ children }) {

	const auth = useAuth();
	const role = auth.role;
	const isLogged = auth.isLogged;

	return (
		<>
			{isLogged && role != "Blocked" && 
                <>{children}</>
            }
		</>
	);
}