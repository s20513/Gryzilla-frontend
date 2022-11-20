import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from 'react-bootstrap';

import MainPage from './components/MainPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div style={{backgroundColor: "#212833", height: "100vh", color: "white" }}>
      <NavBar></NavBar>
      <Container className="MainContainer">
        <Row>
          <Col xs={8}>
            <MainPage></MainPage>
          </Col>
          <Col>
            <Container className="bg-light border" bg="red">col1</Container>
          </Col>
        </Row>
      </Container>
    </div> 
  );
}

export default App;
