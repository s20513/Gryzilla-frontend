import './App.sccs';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from 'react-bootstrap';

import NavBar from './components/NavBar';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn'

import "./Styles/Global.scss";
import "./Styles/DataContainer.scss";

function App() {
  document.body.style = 'background-color: #1E1F23;';
  return (
    <>
      <NavBar></NavBar>
      <Container className="main-container">
        <Row>
          <Col xs={8}>
            <LeftColumn></LeftColumn>
          </Col>
          <Col>
            <RightColumn></RightColumn>
          </Col>
        </Row>
      </Container>
    </> 
  );
}

export default App;
