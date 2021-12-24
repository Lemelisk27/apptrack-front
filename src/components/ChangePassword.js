import React, {useState} from "react";
import Auth from "../utils/Auth"
import API from "../utils/API"

function ChangePassword (props) {
    const token = Auth.getToken()
    const [confPass, setConfPass] = useState("")
    const [confError, setConfError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [newError, setNewError] = useState(false)
    const [userData, setUserData] = useState({
        id: props.user.id,
        password: "",
        newpassword: ""
    })

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setPasswordModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "password") {
            setUserData({
                ...userData,
                password: e.target.value
            })
        }
        if (e.target.name === "newpassword") {
            setUserData({
                ...userData,
                newpassword: e.target.value
            })
        }
        if (e.target.name === "confPass") {
            setConfPass(e.target.value) 
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (userData.password === "" || userData.password === null) {
            setPasswordError(true)
            return
        }
        if (userData.newpassword === "" || userData.newpassword === null) {
            setNewError(true)
            return
        }
        if (userData.newpassword !== confPass) {
            setConfError(true)
            return
        }
        API.changePassword(userData,token)
        .then(res=>{
            console.log(res)
            props.setPasswordModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setPasswordError(false)
        setNewError(false)
        setConfError(false)
    }

    return (
        <form className="d-flex flex-column col-12" onSubmit={handleFormSubmit}>
            <div className="d-flex flex-column">
                <label>Current Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleInputChange}></input>
                {passwordError && (
                    <p className="text-danger mb-0">A Password is Required</p>
                )}
            </div>
            <div className="d-flex flex-column">
                <label>New Password</label>
                <input type="password" name="newpassword" value={userData.newpassword} onChange={handleInputChange}></input>
                {newError && (
                    <p className="text-danger mb-0">A new Password is Required</p>
                )}
            </div>
            <div className="d-flex flex-column">
                <label>Confirm New Password</label>
                <input type="password" name="confPass" value={confPass} onChange={handleInputChange}></input>
                {confError && (
                    <p className="text-danger mb-0">The Passwords Must Match</p>
                )}
            </div>
            <div className="d-flex flex-row mt-3 justify-content-around">
                <button className="bg-secondary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-secondary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </form>
    )
}

export default ChangePassword