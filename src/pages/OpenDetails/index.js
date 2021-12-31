import React, {useEffect, useState} from "react";
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/Auth";
import API from "../../utils/API";

function OpenDetails () {
    const {id} = useParams()
    const token = Auth.getToken()
    const [empError, setEmpError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [appData, setAppData] = useState({
        UserId: 0,
        applied: "",
        applied_date: "",
        closed: "",
        closed_date: "",
        employer: "",
        id: 0,
        link: "",
        notes: "",
        open: true,
        title: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    const loadPage = () => {
        API.getOneApp(id,token)
        .then(res=>{
            setAppData({
                ...appData,
                UserId: res.data.UserId,
                applied: res.data.applied,
                applied_date: res.data.applied_date,
                closed: res.data.closed,
                closed_date: res.data.closed_date,
                employer: res.data.employer,
                id: res.data.id,
                link: res.data.link,
                notes: res.data.notes,
                open: res.data.open,
                title: res.data.title
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "employer") {
            setAppData({
                ...appData,
                employer: e.target.value
            })
        }
        if (e.target.name === "title") {
            setAppData({
                ...appData,
                title: e.target.value
            })
        }
        if (e.target.name === "link") {
            setAppData({
                ...appData,
                link: e.target.value
            })
        }
        if (e.target.name === "applied") {
            setAppData({
                ...appData,
                applied: e.target.value
            })
        }
        if (e.target.name === "notes") {
            setAppData({
                ...appData,
                notes: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (appData.employer === "" || appData.employer === null) {
            setEmpError(true)
            return
        }
        if (appData.title === "" || appData.title === null) {
            setTitleError(true)
            return
        }
        API.updateApp(appData,token)
        .then(res=>{
            console.log(res)
            window.location.href = "/"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        window.location.href = "/"
    }

    const closeBtn = (e) => {
        e.preventDefault()
        const today = new Date()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const year = today.getFullYear()
        const dtToday = year + "-" + month + "-" + day
        const tempObj = {
            closed: dtToday,
            open: false,
            id: appData.id
        }
        API.closeApp(tempObj,token)
        .then(res=>{
            console.log(res)
            window.location.href = "/"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setEmpError(false)
        setTitleError(false)
    }

    return (
        <div className="open-details d-flex col-12">
            <div className="d-flex flex-column col-11 mx-auto mt-3">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dart pb-4">
                    <h1>{appData.employer} - {appData.title} - {appData.applied_date}</h1>
                </div>
                <form className="d-flex flex-column col-11 mx-auto mt-5">
                    <div className="d-flex flex-row col-12">
                        <div className="d-flex flex-column col-6 px-2 py-1">
                            <label>Employer</label>
                            <input type="text" name="employer" value={appData.employer} onChange={handleInputChange}></input>
                            {empError && (
                                <p className="bg-white text-danger mb-0 px-2 rounded col-6">An Employer is Required</p>
                            )}
                        </div>
                        <div className="d-flex flex-column col-6 px-2 py-1">
                            <label>Title</label>
                            <input type="text" name="title" value={appData.title} onChange={handleInputChange}></input>
                            {titleError && (
                                <p className="bg-white text-danger mb-0 px-2 rounded col-6">A Title is Required</p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-row col-12">
                        <div className="d-flex flex-column col-10 px-2 py-1">
                            <label>Link</label>
                            <input type="text" name="link" value={appData.link} onChange={handleInputChange}></input>
                        </div>
                        <div className="d-flex flex-column col-2 px-2 py-1">
                            <label>Applied</label>
                            <input type="date" name="applied" value={appData.applied} onChange={handleInputChange}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column px-2 py-1 col-8 mx-auto">
                        <label>Notes</label>
                        <textarea name="notes" cols="30" rows="10" value={appData.notes} onChange={handleInputChange}></textarea>
                    </div>
                </form>
                <div className="d-flex flex-row justify-content-around mt-5 col-6 mx-auto">
                    <button className="bg-secondary text-light col-3 rounded" onClick={handleFormSubmit}>Save</button>
                    <button className="bg-secondary text-light col-3 rounded" onClick={cancelBtn}>Cancel</button>
                    <button className="bg-secondary text-light col-3 rounded" onClick={closeBtn}>Close Application</button>
                </div>
            </div>
        </div>
    )
}

export default OpenDetails