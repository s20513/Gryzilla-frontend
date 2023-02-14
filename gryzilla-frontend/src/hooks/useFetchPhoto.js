import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchData(id) {

    const [data, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect( () => {
        setloading(true);
        setError(null);
        let cancel;
        
        const fetchData = async () => {
            let response;

            try {
                response = await axios.get(`/users/photo/10`);
                setPhoto(response.data);
                setError(null);
            } catch(err) {
                setError(err.message);
            } finally {   
                setloading(false);
            }
        }
        fetchData();
    },[id])

    return [ data, error, loading ];
}

