import React from "react";
import { Navigate, Outlet } from "react-router";
import Auth from "./Auth";

const AuthRoute = () => {
    const loggedin = Auth.isTokenCurrent(Auth.getToken())
    return loggedin ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute