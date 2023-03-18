import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useSessionStorage from "../hooks/useSessionStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);

	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
	const [jwtToken, setJwtToken] = useSessionStorage("jwtToken", null);

	const [nick, setNick] = useState(null);
	const [id, setId] = useState(null);
	const [role, setRole] = useState(null);

	const [response, setResponse] = useState(null);

	//po otrzymaniu danych z serwera, zaloguj usera
	useEffect(() => {
		if (response == null) return;
		login(response);
	}, [response]);

	//po renderze strony
	useEffect(() => {
		console.log("logowanie");

		//Jeżeli brak refresh tokena to nie loguj
		if (refreshToken == null) {
			console.log("Brak refreshTokena");
			return;
		}

		//jeżeli ważny jwtToken to zaloguj
		if (refreshToken != null && jwtToken != null && chechValidJwt(jwtToken)) {
			console.log("Zapisany ważny jwtToken i jest resfresh token");
			relogin();
			return;
		}
		
		

		console.log("Używanie refreshTokena");

		const fetchData = async (params) => {
			try {
				const result = await axios.request(params);
				setResponse(result.data);
			} catch (error) {
				setRefreshToken(null);
				console.log("Nie łykneło tokena: " + error);
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

	const login = (loginData) => {
		setJwtToken(loginData.token);
		setRefreshToken(loginData.refreshToken);
		deCode(loginData.token);
	
		setIsLogged(true);
	};

	const relogin = (loginData) => {
		deCode(jwtToken);
		setIsLogged(true);
	};

	const logout = () => {
		setRefreshToken(null);
		setJwtToken(null);

		// setNick(null);
		// setId(null);
		// setRole(null);
		setIsLogged(false);
	};

	function deCode(jwtToken) {
		console.log("token do decode: " + jwtToken);
		var decoded = jwt_decode(jwtToken);
		setNick(decoded.unique_name);
		setId(decoded.nameid);
		setRole(decoded.role);
	}

	function chechValidJwt(jwtToken) {
		var decoded = jwt_decode(jwtToken);
		if (decoded.exp * 1000 > Date.now()) return true;
		return false;
	}

	return (
		<AuthContext.Provider
			value={{ nick, id, role, login, logout, isLogged, response }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
