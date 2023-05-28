import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useAxiosFile = (axiosParams) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const auth = useAuth();

	const fetchData = async (url, formData) => {
		try {
			setLoading(true);
			const result = await axios.post(url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					...auth.getJwtToken(),
				},
			});
			setResponse(result.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const runRequest = (url, file) => {
		fetchData(url, file);
	};

	return [response, error, loading, runRequest];
};

export default useAxiosFile;
