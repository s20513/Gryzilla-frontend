import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (axiosParams) => {
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

    useEffect(() => {
      if(axiosParams.executeOnRender && axiosParams.executeOnRender == false) return;
      if(axiosParams.method == 'GET'){
        runRequest(axiosParams);
      } 
    }, []); // execute once only request is GET

    const runRequest = (data) => {
      fetchData(Object.assign(axiosParams, data));
    }

    return  [response, error, loading, runRequest];
};

export default useAxios;