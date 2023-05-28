import { useState, useEffect } from "react";
import axios from "axios";
import { SortUp } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";

export const useAxios = (axiosParams) => {

	const auth = useAuth();

	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = async (params) => {
		try {
			setLoading(true);
			const result = await axios.request(params);
			setResponse(result.data);
			setError(null);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (axiosParams.executeOnRender == false) return;
		if (axiosParams.method == "GET") runRequest(axiosParams);
	}, []); // execute once only request is GET


	const runRequest = (data) => {
		//dodanie do requesta jwt token
		const tokenHeader = {headers: auth.getJwtToken()};
		Object.assign(axiosParams, tokenHeader);
		fetchData(Object.assign(axiosParams, data));
	};

	return [response, error, loading, runRequest];
};

export default useAxios;
