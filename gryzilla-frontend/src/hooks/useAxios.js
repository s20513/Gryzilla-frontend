import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SortUp } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";

export const useAxios = (axiosParams) => {

	const auth = useAuth();

	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [isSuccess, setIsSuccess] = useState(null);

	const fetchData = async (params) => {
		try {
			setIsSuccess(null);
			setError(null);
			setLoading(true);

			const result = await axios.request(params);
			setResponse(result.data);
			setIsSuccess(true);
			
		} catch (error) {
			setError(error);
			setIsSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (axiosParams.executeOnRender == false) return;
		if (axiosParams.method == "GET") runRequest(axiosParams);
	}, []); // execute once only request is GET


	// const runRequest = (data) => {
	// 	//dodanie do requesta jwt token
	// 	const tokenHeader = {headers: auth.getJwtToken()};
	// 	Object.assign(axiosParams, tokenHeader);
	// 	fetchData(Object.assign(axiosParams, data));
	// };

	const runRequest = useCallback( (data)=> {
		//dodanie do requesta jwt token
		const tokenHeader = {headers: auth.getJwtToken()};
		Object.assign(axiosParams, tokenHeader);
		fetchData(Object.assign(axiosParams, data));
	},[auth, axiosParams]);

	return [response, error, loading, runRequest, isSuccess];
};

export default useAxios;
