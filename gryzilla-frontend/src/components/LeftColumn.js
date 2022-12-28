import {useState, useEffect} from "react";
import {Container, Dropdown} from 'react-bootstrap';
import Post from './Post';


export default function LeftColumn() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortType, setSortType] = useState('byPopular');

    
    const fetchData = () => {
        let url;
        if( sortType === 'byPopular')
            url = `https://192.168.0.221:1337/bylikes/most`
        else
            url = `https://192.168.0.221:1337/api/posts`;
        
        fetch(url)
         .then((response) => response.json())
         .then((data) => {
            //console.log(data);
            setData(data);
            setError(null);
         })
         .catch((err) => {
            setError(err.message);
            setData(null);
         })
         .finally(() => {
            setLoading(false);
         });
    }

    useEffect(() => {
        window.localStorage.setItem('sortType', sortType);
        fetchData();
       }, [sortType]);

    return (
        <Container className="column-container">
            <Container className="d-flex justify-content-between">
                <h2>Wszystkie posty</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sortuj
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight className="dropdown-menu-right">
                        <Dropdown.Item onClick={() => {setSortType('byPopular')}} active={sortType === "byPopular" ? true : false} href="#/action-1">Od najpopularniejszych</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType('byNew')}} active={sortType === "byNew" ? true : false} href="#/action-2">Od najnowszych</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType("byOld")}} active={sortType === "byOld" ? true : false} href="#/action-3">Od najstarszych</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType("byComments")}} active={sortType === "byComments" ? true : false} href="#/action-3">Najwięcej komentarzy</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            
            
            {data && 
                data.map((postData) => (
                    <Post key={postData.idPost} postData={postData}></Post>
                ))
            }
        </Container>
    );
}
