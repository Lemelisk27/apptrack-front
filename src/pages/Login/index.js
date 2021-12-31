import React, {useState} from "react";
import {Modal} from "react-bootstrap"
import "./style.css"
import API from "../../utils/API"
import Auth from "../../utils/Auth"
import SignUp from "../../components/SignUp"

function Login () {
    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = (e) => {
        if (e.target.name === "username") {
            setUser({
                ...user,
                username: e.target.value
            })
        }
        if (e.target.name === "password") {
            setUser({
                ...user,
                password: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (user.username === "" || user.username === null) {
            setUserError(true)
            return
        }
        if (user.password === "" || user.password === null) {
            setPasswordError(true)
            return
        }
        API.login(user)
        .then(res=>{
            if (res.status !== 200) {
                setLoginError(true)
                return
            }
            localStorage.setItem("token", res.data.token)
            const userData = {
                id: res.data.user.id,
                username: res.data.user.username,
                firstName: res.data.user.first_name,
                lastName: res.data.user.last_name
            }
            Auth.saveUser(userData)
            setUser({
                ...user,
                username: "",
                password: ""
            })
            window.location.href = "/"
        })
        .catch(err=>{
            console.log(err)
            setLoginError(true)
        })
    }

    const resetErrors = () => {
        setUserError(false)
        setPasswordError(false)
        setLoginError(false)
    }

    const signUpBtn = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div className="login">
            <h1 className="text-center pt-5">Job Application Tracker</h1>
            <form className="d-flex flex-column col-10 mx-auto align-items-center pt-5" onSubmit={handleFormSubmit}>
                <h1>Please Log In</h1>
                <div className="d-flex flex-column col-4">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleInputChange}></input>
                    {userError && (
                        <p className="bg-white text-danger text-center rounded col-6 mx-auto mt-1">A Username Is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}></input>
                    {passwordError && (
                        <p className="bg-white text-danger text-center rounded col-6 mx-auto mt-1">A Password Is Required</p>
                    )}
                </div>
                <button className="col-2 mt-3 rounded" onClick={handleFormSubmit}>Submit</button>
                {loginError && (
                    <p className="bg-white text-danger text-center rounded col-3 mx-auto mt-3">Incorrect Username or Password</p>
                )}
                <button className="col-1 mt-3 rounded" onClick={signUpBtn}>Sign Up</button>
            </form>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => {setShowModal(false)}}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="sign-up">
                    <h3>Sign Up</h3>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <SignUp setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login