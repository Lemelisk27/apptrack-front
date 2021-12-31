import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap"
import "./style.css"
import Auth from "../../utils/Auth"
import API from "../../utils/API"
import OpenAppList from "../../components/OpenAppList"
import AddApplication from "../../components/AddApplication"

function HomePage () {
    const token = Auth.getToken()
    const user = Auth.getUser()
    const [rawData, setRawData] = useState([])
    const [appData, setAppData] = useState([])
    const [addAppModal, setAddAppModal] = useState(false)
    const [search, setSearch] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[addAppModal])

    useEffect(()=>{
        const regex = new RegExp(`${search}.*`, "i")
        if (search === "" || search === null) {
            clearSearch()
        }
        else {
            setAppData(appData.filter(name => regex.exec(name.employer)))
        }
        // eslint-disable-next-line
    },[search])

    useEffect(()=>{
        if (endDate === "" || endDate === null) {
            clearSearch()
        }
        else {
            setAppData(appData.filter(date => date.applied <= endDate))
        }
        // eslint-disable-next-line
    },[endDate])

    useEffect(()=>{
        if (startDate === "" || startDate === null) {
            clearSearch()
        }
        else {
            setAppData(appData.filter(date => date.applied >= startDate))
        }
        // eslint-disable-next-line
    },[startDate])

    const loadPage = () => {
        API.getApps(user.id,token)
        .then(res=>{
            const tempArray = res.data
            setAppData(tempArray.filter(item => item.open === true))
            setRawData(tempArray.filter(item => item.open === true))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const addApp = (e) => {
        e.preventDefault()
        setAddAppModal(true)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "search") {
            setSearch(e.target.value)
        }
        if (e.target.name === "startDate") {
            setStartDate(e.target.value)
        }
        if (e.target.name === "endDate") {
            setEndDate(e.target.value)
        }
    }

    const clearSearch = (e) => {
        setAppData(rawData)
        setSearch("")
        setStartDate("")
        setEndDate("")
    }

    const clearButton = (e) => {
        e.preventDefault()
        clearSearch()
    }

    return (
        <div className="home d-flex col-12">
            <div className="d-flex flex-column col-11 mx-auto mt-3">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Open Applications</h1>
                    <button className="bg-secondary text-light col-2 rounded" onClick={addApp}>Add Application</button>
                </div>
                <form className="d-flex justify-content-start mt-5 col-11 mx-auto justify-content-between">
                    <div className="d-flex flex-column col-6">
                        <label>Employer</label>
                        <input type="text" name="search" placeholder="Type Here to Search..." value={search} onChange={handleInputChange}></input>
                    </div>
                    <div className="d-flex flex-row col-6 justify-content-around">
                        <div className="d-flex flex-column">
                            <label>Start Date</label>
                            <input type="date" name="startDate" value={startDate} onChange={handleInputChange}></input>
                        </div>
                        <div className="d-flex flex-column">
                            <label>End Date</label>
                            <input type="date" name="endDate" value={endDate} onChange={handleInputChange}></input>
                        </div>
                        <button className="bg-secondary text-light col-2 rounded align-self-end" onClick={clearButton}>Clear Search</button>
                    </div>
                </form>
                <div className="app-table col-11 mx-auto mt-5 overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col" className="col-4">Employer</th>
                                <th scope="col" className="col-3">Title</th>
                                <th scope="col" className="col-4">Link</th>
                                <th scope="col" className="col-1">Date Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appData.map(item => <OpenAppList key={item.id} app={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                size="lg"
                show={addAppModal}
                onHide={() => {setAddAppModal(false)}}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="add-application">
                    <h3>Add Application</h3>
                </Modal.Header>
                <Modal.Body>
                    <AddApplication user={user} setAddAppModal={setAddAppModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HomePage