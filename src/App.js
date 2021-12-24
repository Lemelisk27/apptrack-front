import React, {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import ErrorPage from "./pages/Error"
import AuthRoute from "./utils/AuthRoute"
import HomePage from "./pages/Home"
import Navbar from "./pages/Navbar"

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<AuthRoute/>}>
            <Route exact path="/" element={
              <>
                <Navbar />
                <HomePage />
              </>
            }/>
          </Route>
          <Route exact path="/login" element={<Login />}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
