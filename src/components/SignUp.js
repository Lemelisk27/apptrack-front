import React, {useState, useEffect} from "react";
import API from "../utils/API";

function SignUp (props) {
    const [usernames, setUsernames] = useState([])
    const [firstError, setFirstError] = useState(false)
    const [lastError, setLastError] = useState(false)
    const [userError, setUserError] = useState(false)
    const [existError, setExistError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [confPassword, setConfPassword] = useState("")
    const [confError, setConfError] = useState(false)
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    const loadPage = () => {
        API.getUsernames()
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].username.toLowerCase())
            }
            setUsernames(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "firstName") {
            setUser({
                ...user,
                first_name: e.target.value
            })
        }
        if (e.target.name === "lastName") {
            setUser({
                ...user,
                last_name: e.target.value
            })
        }
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
        if (e.target.name === "confPassword") {
            setConfPassword(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (user.first_name === "" || user.first_name === null) {
            setFirstError(true)
            return
        }
        if (user.last_name === "" || user.last_name === null) {
            setLastError(true)
            return
        }
        if (user.username === "" || user.username === null) {
            setUserError(true)
            return
        }
        if (usernames.includes(user.username.toLowerCase())) {
            setExistError(true)
            return
        }
        if (user.password === "" || user.password === null) {
            setPassError(true)
            return
        }
        if (user.password !== confPassword) {
            setConfError(true)
            return
        }
        API.newUser(user)
        .then(res=>{
            console.log(res)
            props.setShowModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setFirstError(false)
        setLastError(false)
        setUserError(false)
        setExistError(false)
        setPassError(false)
        setConfError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-row">
                <div className="d-flex flex-column col-6 px-2 py-1">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.first_name} onChange={handleInputChange}></input>
                    {firstError && (
                        <p className="text-danger mb-0">A First Name is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-2 py-1">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.last_name} onChange={handleInputChange}></input>
                    {lastError && (
                        <p className="text-danger mb-0">A Last Name is Required</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-column col-6 mx-auto">
                <div className="d-flex flex-column col-12 px-2 py-1">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleInputChange}></input>
                    {userError && (
                        <p className="text-danger mb-0">A Username is Required</p>
                    )}
                    {existError && (
                        <p className="text-danger mb-0">That Username is Already Used</p>
                    )}
                </div>
                <div className="d-flex flex-column col-12 px-2 py-1">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}></input>
                    {passError && (
                        <p className="text-danger mb-0">A Password is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-12 px-2 py-1">
                    <label>Confirm Password</label>
                    <input type="password" name="confPassword" value={confPassword} onChange={handleInputChange}></input>
                    {confError && (
                        <p className="text-danger mb-0">The Passwords Must Match</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around mt-3">
                <button className="rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default SignUp