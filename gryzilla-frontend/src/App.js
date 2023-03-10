import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom'
import axios from "axios";

import NavBar from './components/NavBar';
import Posts from './pages/posts/Posts';
import RightColumn from './pages/sideBar/RightColumn'

import "./assets/Global.scss";
import "./assets/DataContainer.scss";
import "./assets/Profile.scss";
import "./assets/TagInput.scss"

import Profile from './pages/profile/Profile';
import Articles from "./pages/articles/Articles";
import ArticleDetails from "./pages/articles/ArticleDetails";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  //document.body.style = 'background-color: #1E1F23 ;';
  //axios.defaults.baseURL = '';

  return (
    <AuthProvider>
      <NavBar></NavBar>
      <Container className="main-container">
        <Row>
          <Col md={7} lg={8} >
            <Routes>
              <Route path="/posts" element={<Posts/>} />
              <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
              <Route path="/articles">
                <Route index element={<Articles/>} />
                <Route path=":idArticle" element={<ArticleDetails/>} />
                <Route path="new" element={<ArticleDetails/>} />
              </Route>
            </Routes>
          </Col>
          <Col className="d-none d-md-block">
            {/* <RightColumn></RightColumn> */}
          </Col>
        </Row>
      </Container>
    </AuthProvider> 
  );
}

export default App;
