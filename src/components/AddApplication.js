import React, {useState} from "react";
import Auth from "../utils/Auth"
import API from "../utils/API";

function AddApplication (props) {
    const token = Auth.getToken()
    const today = new Date()
    const month = (today.getMonth() + 1).toString().padStart(2, "0")
    const day = today.getDate()
    const year = today.getFullYear()
    const dtToday = year + "-" + month + "-" + day
    const [empError, setEmpError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [appData, setAppData] = useState({
        UserId: props.user.id,
        employer: "",
        applied: dtToday,
        link: "",
        notes: "",
        title: ""
    })

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setAddAppModal(false)
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
        if (e.target.name === "notes") {
            setAppData({
                ...appData,
                notes: e.target.value
            })
        }
        if (e.target.name === "applied") {
            setAppData({
                ...appData,
                applied: e.target.value
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
        console.log(appData)
        API.addApp(appData,token)
        .then(res=>{
            console.log(res)
            props.setAddAppModal(false)
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
        <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <div className="d-flex flex-row">
                <div className="d-flex flex-column col-4 px-2 py-1">
                    <label>Employer</label>
                    <input type="text" name="employer" value={appData.employer} onChange={handleInputChange}></input>
                    {empError && (
                        <p className="text-danger mb-0">An Employer is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4 px-2 py-1">
                    <label>Job Title</label>
                    <input type="text" name="title" value={appData.title} onChange={handleInputChange}></input>
                    {titleError && (
                        <p className="text-danger mb-0">A Job Title is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4 px-2 py-1">
                    <label>Applied Date</label>
                    <input type="date" name="applied" value={appData.applied} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="d-flex flex-column col-12 px-2 py-1">
                <label>Link</label>
                <input type="text" name="link" value={appData.link} onChange={handleInputChange}></input>
            </div>
            <div className="d-flex flex-column col-12 px-2 py-1">
                <label>Notes</label>
                <textarea name="notes" cols="30" rows="10" value={appData.notes} onChange={handleInputChange}></textarea>
            </div>
            <div className="d-flex flex-row mt-3 justify-content-around">
                <button className="bg-secondary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-secondary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </form>
    )
}

export default AddApplication