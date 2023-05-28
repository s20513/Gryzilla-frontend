import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route, redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "./pages/navbar/NavBar";
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
import { ProSidebarProvider } from "react-pro-sidebar";
import NotFound from "./pages/NotFound";
import ProfileRerender from "./pages/profile/components/ProfileRerender";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Groups from "./pages/groups/Groups";
import GroupDetials from "./pages/groupsDetails/GroupDetails";
import GroupNew from "./pages/groupsNew/GroupNew";
import SearchPage from "./pages/search/SearchPage";
import ArticleEdit from "./pages/articleEdit/ArticleEdit";

function App() {
	//document.body.style = 'background-color: #1E1F23 ;';
	//axios.defaults.baseURL = 'http://89.68.200.216:7056/api';
	//axios.defaults.baseURL = 'https://localhost:5001/api';

	return (
		<AuthProvider>
			<ProSidebarProvider>
				<NavbarProvider>
					<NavBar></NavBar>

					<Container className="main-container">
						<Row>
							<Col
								xxl={{order: "last"}}
							>
								<RightColumn/>
							</Col>

							<Col xxl={8} xl={12}>
								<Routes>
									<Route path="/posts">
										<Route index element={<Posts />} />
										<Route path=":idPost" element={<PostDetails />} />
										<Route path=":idPost/:idComment" element={<PostDetails />} />
									</Route>
									<Route path="/articles">
										<Route index element={<Articles />} />
										<Route path=":idArticle" element={<ArticleDetails />} />
										<Route path=":idArticle/:idComment" element={<ArticleDetails />} />
										<Route path="new" element={<ArticleNew />} />
										<Route path="edit/:idArticle" element={<ArticleEdit />} />
									</Route>
									<Route path="/groups">
										<Route index element={<Groups />} />
										<Route path=":idGroup" element={<GroupDetials />} />
										<Route path="new" element={<GroupNew/>} />
									</Route>
									<Route path="/profile">
										<Route exact path=":idUser" element={<Profile />} />
										<Route
											path="rerender/:idUser"
											element={<ProfileRerender />}
										/>
									</Route>
									<Route path="/search/:searchData">
										<Route index element={<SearchPage />}/>
										<Route path="phrase/:searchPhrase" element={<SearchPage/>}/>
										<Route path="tag/:searchPhrase" element={<SearchPage/>}/>
									</Route>
									<Route path="/adminPanel" element={<AdminPanel/>}/>
									<Route path="*" element={<NotFound />} />
								</Routes>
							</Col>
						</Row>
					</Container>
				</NavbarProvider>
			</ProSidebarProvider>
		</AuthProvider>
	);
}

export default App;
