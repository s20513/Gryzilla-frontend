import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/NavBar";
import Posts from "./pages/posts/Posts";
import RightColumn from "./pages/sideBar/RightColumn";

import "./assets/Global.scss";
import "./assets/DataContainer.scss";
import "./assets/Profile.scss";
import "./assets/TagInput.scss";

import Profile from "./pages/profile/Profile";
import Articles from "./pages/articles/Articles";
import ArticleDetails from "./pages/articleDetails/ArticleDetails";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth } from "./components/RequireAuth";
import PostDetails from "./pages/postDetails/PostDetails";
import ArticleNew from "./pages/articleNew/ArticleNew";
import { NavbarProvider } from "./context/NavbarContext";

function App() {
	//document.body.style = 'background-color: #1E1F23 ;';
	//axios.defaults.baseURL = '';

	return (
		<AuthProvider>
			<NavbarProvider>
				<NavBar></NavBar>

				<Container className="main-container">
					<Row>
						<Col md={7} lg={8}>
							<Routes>
								<Route path="/">
									<Route path="/posts">
										<Route index element={<Posts />} />
										{/* <Route path="new" element={<Posts openInput={true} />} /> */}
										<Route path=":idPost" element={<PostDetails />} />
									</Route>
									<Route path="/articles">
										<Route index element={<Articles />} />
										<Route path=":idArticle" element={<ArticleDetails />} />
										<Route path="new" element={<ArticleNew />} />
									</Route>
									<Route path="/profile">
										<Route path=":idUser" element={<Profile />} />
									</Route>
								</Route>
							</Routes>
						</Col>
						<Col className="d-none d-md-block">
							<RightColumn></RightColumn>
						</Col>
					</Row>
				</Container>
			</NavbarProvider>
		</AuthProvider>
	);
}

export default App;
