import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap"
import "./style.css"
import Auth from "../../utils/Auth"
import ChangePassword from "../../components/ChangePassword"

function Navbar () {
     const [user, setUser] = useState({})
     const [passwordModal, setPasswordModal] = useState(false)

    useEffect(()=>{
        setUser(Auth.getUser())
        // eslint-disable-next-line
    },[])

    const logout = (e) => {
        e.preventDefault()
        Auth.logout()
    }

    const changePassword = (e) => {
        e.preventDefault()
        setPasswordModal(true)
    }

    return (
        <div className="navbar d-flex flex-row flex-wrap col-12 justify-content-between">
            <h1 className="mx-4">{user.firstName} {user.lastName}</h1>
            <div className="d-flex flex-row col-6 align-items-center mx-4 justify-content-around">
                <a href="/" className="mx-1">Open Applications</a>
                <button className="rounded" onClick={changePassword}>Change Password</button>
                <button className="rounded" onClick={logout}>Log Out</button>
            </div>
            <Modal
                size="lg"
                show={passwordModal}
                onHide={() => {setPasswordModal(false)}}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="passwordmodal">
                    <h3>Change {user.firstName}'s Password</h3>
                </Modal.Header>
                <Modal.Body>
                    <ChangePassword user={user} setPasswordModal={setPasswordModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Navbar