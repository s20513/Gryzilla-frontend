import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar';
import { Container, Col, Row } from 'react-bootstrap';
import MainPage from './components/MainPage';


function App() {
  return (
    
    <>
      <NavBar></NavBar>
      <Container>
        <Row>
          <Col xs={8}>
            <MainPage></MainPage>
          </Col>
          <Col>
            <Container className="bg-light border" bg="red">col1</Container>
          </Col>
        </Row>
      </Container>
    </>
    
  );
}

export default App;
