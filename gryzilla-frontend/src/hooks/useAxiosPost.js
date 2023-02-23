import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxiosPost = (axiosParams) => {
    const [response, setResponse] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
      try {
         const result = await axios.request(params);
         setResponse(result.data);
       } catch( error ) {
         setError(error);
       } finally {
         setLoading(false);
       }
    };

    const runRequest = () => {
      console.log(axiosParams.data)
      fetchData(axiosParams);
    }

    return  [response, error, loading, runRequest];
};

export default useAxios;