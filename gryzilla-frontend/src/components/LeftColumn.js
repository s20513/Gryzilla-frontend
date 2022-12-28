import {useState, useEffect} from "react";
import {Container, Dropdown} from 'react-bootstrap';
import Post from './Post';


export default function LeftColumn() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortType, setSortType] = useState(() => {
        const savedSortType = localStorage.getItem('sortType');
        return savedSortType || "byDateDesc";
    });

    
    const fetchData = () => {
        const url = `/api/posts/${sortType}`;

        console.log(url)
        
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
        localStorage.setItem('sortType', sortType);
        fetchData();
       }, [sortType]);

    return (
        <Container className="column-container">
            <Container className="d-flex justify-content-between">
                <h2>Wszystkie posty</h2>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sortuj
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item onClick={() => {setSortType('byDateDesc')}} active={sortType === "byDateDesc" ? true : false} href="#/action-2">Najnowsze</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType("byDateAsc")}} active={sortType === "byDateAsc" ? true : false} href="#/action-3">Najstarsze</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType('byLikesDesc')}} active={sortType === "byLikesDesc" ? true : false} href="#/action-1">Najpopularniejsze</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType("byCommentsDesc")}} active={sortType === "byCommentsDesc" ? true : false} href="#/action-3">Najwięcej komentarzy</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            
            
            {data && 
                data.map((postData, index) => (
                    <Post key={postData.idPost} postData={postData} indexNumber={index}></Post>
                ))
            }
        </Container>
    );
}
