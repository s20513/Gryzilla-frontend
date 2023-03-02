import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function ArticleDetails() {

    const params = useParams();

    const [data, errorData, loadingData] = useAxios({method: 'GET',url: `${params.idArticle}`,headers: {accept: '*/*'},
    });

    return (
        <Container className="main-panel">
            <h3>Szczegóły artykułu</h3>
            
            {data &&
                <div className="content-container">
                    <div className="d-flex">
                        <div className="likes-box">
                            <span>+{data.likesNum}</span>
                        </div>
                        <span className="article-title">{data.title}</span>
                    </div>
                    <hr className="hr-line"/>
                    <div>
                        <div>{data.content}</div>
                    </div>
                    <span className="article-label">Artykuł użytkownika {data.author.nick}, utworzono {data.createdAt}</span>

                    <div className="lower-tag-container">
                        {data && data.tags.map((tag, index) => (
                                <span key={index}>#{tag.nameTag} </span>
                            ))
                        }
                    </div>
                </div>

                
            }
        
        </Container>
        
    );
}