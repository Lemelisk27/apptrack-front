import React, {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import ErrorPage from "./pages/Error"
import AuthRoute from "./utils/AuthRoute"
import HomePage from "./pages/Home"
import Navbar from "./pages/Navbar"
import ClosedApps from "./pages/Closed"
import OpenDetails from "./pages/OpenDetails"
import ClosedDetails from "./pages/ClosedDetails"

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
          <Route exact path="/open/:id" element={<AuthRoute/>}>
            <Route exact path="/open/:id" element={
              <>
                <Navbar />
                <OpenDetails />
              </>
            }/>
          </Route>
          <Route exact path="/closed" element={<AuthRoute/>}>
            <Route exact path="/closed" element={
              <>
                <Navbar />
                <ClosedApps />
              </>
            }/>
          </Route>
          <Route exact path="/closed/:id" element={<AuthRoute/>}>
            <Route exact path="/closed/:id" element={
              <>
                <Navbar />
                <ClosedDetails />
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
