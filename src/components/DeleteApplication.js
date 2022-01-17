import React from "react";
import Auth from "../utils/Auth";
import API from "../utils/API"

function DeleteApplication (props) {
    const id = props.id
    const token = Auth.getToken()

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        API.deleteApp(id,token)
        .then(res=>{
            console.log(res)
            props.setShowModal(false)
            window.location.href = "/closed"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column">
            <div>
                <h1 className="text-center">Are you sure?</h1>
                <h3 className="text-center">This will <strong className="text-danger">permanently</strong> delete this application!</h3>
            </div>
            <div className="d-flex flex-row justify-content-around mt-3">
                <button className="bg-danger text-light rounded col-3" onClick={handleFormSubmit}>Yes</button>
                <button className="bg-secondary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteApplication