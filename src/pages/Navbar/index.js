import React from "react";
import "./style.css"
import Auth from "../../utils/Auth"

const logout = (e) => {
    e.preventDefault()
    Auth.logout()
}

function Navbar () {
    return (
        <div className="navbar d-flex flex-row flex-wrap col-12 justify-content-between">
            <h1 className="mx-4">Application Tracker</h1>
            <div className="d-flex align-items-center mx-4">
                <button className="rounded" onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar