import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap"
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/Auth";
import API from "../../utils/API";
import DeleteApplication from "../../components/DeleteApplication"

function ClosedDetails () {
    const {id} = useParams()
    const token = Auth.getToken()
    const [showmodal, setShowModal] = useState(false)
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
            console.log(res.data)
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

    const cancelBtn = (e) => {
        e.preventDefault()
        window.location.href = "/closed"
    }

    const openApplication = (e) => {
        e.preventDefault()
        const tempObj = {
            closed: null,
            open: true,
            id: appData.id
        }
        API.openApp(tempObj,token)
        .then(res=>{
            console.log(res)
            window.location.href = "/closed"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteBtn = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div className="closed-details d-flex flex-column col-12">
            <div className="d-flex flex-column col-11 mx-auto mt-3">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>{appData.employer} - {appData.title} - {appData.closed_date}</h1>
                </div>
                <div className="closed-card d-flex flex-column col-11 mx-auto mt-5">
                    <div className="d-flex flex-column col-11 mx-auto">
                        <div className="d-flex flex-row col-12">
                            <div className="d-flex flex-column col-6 px-2 py-1">
                                <label>Employer:</label>
                                <p className="border border-dark px-1">{appData.employer}</p>
                            </div>
                            <div className="d-flex flex-column col-6 px-2 py-1">
                                <label>Title:</label>
                                <p className="border border-dark px-1">{appData.title}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row col-12">
                            <div className="d-flex flex-column col-8 px-2 py-1">
                                <label>Link:</label>
                                <p className="border border-dark px-1"><a href={appData.link} target="_blank" rel='noreferrer noopener'>{appData.link}</a></p>
                            </div>
                            <div className="d-flex flex-column col-2 px-2 py-1">
                                <label>Applied Date:</label>
                                <p className="border border-dark px-1">{appData.applied_date}</p>
                            </div>
                            <div className="d-flex flex-column col-2 px-2 py-1">
                                <label>Closed Date:</label>
                                <p className="border border-dark px-1">{appData.closed_date}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column px-2 py-1 col-8 mx-auto">
                            <label>Notes:</label>
                            <p className="closed-notes border border-dark px-1">{appData.notes}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row col-6 mx-auto mt-5 justify-content-around">
                    <button className="bg-secondary text-light col-3 rounded" onClick={cancelBtn}>Cancel</button>
                    <button className="bg-secondary text-light col-3 rounded" onClick={openApplication}>Re-Open Application</button>
                    <button className="bg-danger text-light col-3 rounded" onClick={deleteBtn}>Delete Application</button>
                </div>
            </div>
            <Modal
                size="lg"
                show={showmodal}
                onHide={() => {setShowModal(false)}}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="deletemodal">
                    <h3>Delete Application</h3>
                </Modal.Header>
                <Modal.Body>
                    <DeleteApplication setShowModal={setShowModal} id={id}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClosedDetails