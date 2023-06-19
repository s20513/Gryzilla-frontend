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
		loginWithCredentails(response);
	}, [response]);

	function fetchNewJwtToken() {
		const apiCall = {
			method: "POST",
			url: "/users/refreshToken",
			headers: { accept: "*/*", Authorization: "Bearer ", 'Access-Control-Allow-Origin': "http://localhost:3000" },
			data: { refreshToken: refreshToken },
		};

		const fetchData = async (params) => {
			try {
				const result = await axios.request(params);
				setResponse(result.data);
			} catch (error) {
				setRefreshToken(null);
				//console.log("refreshToken error: " + error);
			} finally {
				//setLoading(false);
			}
		};
		fetchData(apiCall);
	}

	//po renderze strony
	useEffect(() => {
		//console.log("logowanie");

		//Jeżeli brak refresh tokena to nie loguj
		if (refreshToken == null) {
			//console.log("Brak refreshTokena");
			return;
		} else {
			//console.log("Jest refreshToken")
		}

		//jeżeli ważny jwtToken to zaloguj
		if (jwtToken != null && chechValidJwt(jwtToken, 10000)) {
			//console.log("Zapisany ważny jwtToken i jest resfresh token");
			relogin();
			return;
		} else {
			//console.log("Brak jwt lub nie ważny")
		}

		//Jeżeli jest refreshToken ale brak ważnego jwtTokena, pobierz nowy jwtToken
		//console.log("Używanie refreshTokena");
		fetchNewJwtToken()
		
	}, []);

	const loginWithCredentails = (loginData) => {
		setJwtToken(loginData.token);
		setRefreshToken(loginData.refreshToken);
		deCode(loginData.token);

		setIsLogged(true);
	};

	const renewJwtToken = () => {
		if(!chechValidJwt(jwtToken,5000)){
			//console.log("Potrzebny nowy token")
			fetchNewJwtToken();
		}
	}

	const relogin = () => {
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

	const getJwtToken = () => {
		return { Authorization: jwtToken ? "Bearer " + jwtToken : "" };
	};

	function deCode(jwtToken) {
		var decoded = jwt_decode(jwtToken);
		setNick(decoded.unique_name);
		setId(decoded.nameid);
		setRole(decoded.role);
	}

	function chechValidJwt(jwtToken, treshold) {
		var decoded = jwt_decode(jwtToken);
		if (decoded.exp * 1000 > (Date.now() + treshold)) return true;
		return false;
	}

	return (
		<AuthContext.Provider
			value={{
				nick,
				id,
				role,
				loginWithCredentails,
				logout,
				getJwtToken,
				isLogged,
				response,
				jwtToken,
				renewJwtToken
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
