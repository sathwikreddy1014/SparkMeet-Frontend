import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "../utils/appstore";
import Feed from "./components/Feed";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";


export default function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename = "/">
      <Routes>
        <Route path = "/" element = {<Body/>}>
         <Route path = "/" element = {<Feed/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/errorpage" element = {<ErrorPage/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}
