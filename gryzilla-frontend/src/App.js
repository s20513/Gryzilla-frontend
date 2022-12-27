import './App.sccs';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn'

import "./Styles/Global.scss";
import "./Styles/DataContainer.scss";
import "./Styles/Profile.scss";
import Profile from './components/Profile';

function App() {
  document.body.style = 'background-color: #1E1F23 ;';

  console.log('akcja')
  return (
    <>
      <NavBar></NavBar>
      <Container className="main-container">
        <Row>
          <Col xs={8}>
            <Routes>
              <Route path="/" element={<LeftColumn/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
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
