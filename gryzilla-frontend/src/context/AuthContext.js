import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [nick, setNick] = useState(null);
	const [id, setId] = useState(null);
	const [role, setRole] = useState(null);

	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
	const [jwtToken, setJwtToken] = useState();
    const [response, setResponse] = useState(null);

    useEffect(()=>{
        if(response == null) return;
        login(response);
    },[response])

	useEffect(() => {
		console.log("logowanie");
		if (refreshToken == null) return;
		console.log("działamy z tokenem")


		const fetchData = async (params) => {
			try {
				const result = await axios.request(params);
				setResponse(result.data);
			} catch (error) {
				//setError(error);
                console.log(error);
			} finally {
				//setLoading(false);
			}
		};

		const apiCall = {
			method: "POST",
			url: "/users/refreshToken",
			headers: { accept: "*/*" },
			data: { refreshToken: refreshToken },
		};

        fetchData(apiCall);
	}, []);

	const login = (userData) => {
		setRefreshToken(userData.refreshToken);

		var decoded = jwt_decode(userData.token);
		setNick(decoded.unique_name);
		setId(decoded.nameid);
		setRole(decoded.role);
		setIsLogged(true);
	};

	const logout = () => {
        setRefreshToken(null);

		setNick(null);
		setId(null);
		setRole(null);
		setIsLogged(false);
	};

	return (
		<AuthContext.Provider value={{ nick, id, role, login, logout, isLogged, response }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
