import { useState, useEffect } from "react";
import axios from "axios";

export const useAxiosFile = (axiosParams) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = async (url, formData) => {
		try {
			setLoading(true);
			const result = await axios.post(url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setResponse(result.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	if (axiosParams.executeOnRender && axiosParams.executeOnRender == false)
	// 	  return;
	// 	if (axiosParams.method == "GET") {
	// 		runRequest(axiosParams);
	// 	}
	// }, []); // execute once only request is GET

	const runRequest = (url, file) => {
		fetchData(url, file);
	};

	return [response, error, loading, runRequest];
};

export default useAxiosFile;
