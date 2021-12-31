import React, {useEffect, useState} from "react";
import "./style.css"
import Auth from "../../utils/Auth";
import API from "../../utils/API";
import ClosedAppList from "../../components/ClosedAppList"

function ClosedApps () {
    const token = Auth.getToken()
    const user = Auth.getUser()
    const [appData, setAppData] = useState([])
    const [rawData, setRawData] = useState([])
    const [search, setSearch] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

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
        if (startDate === "" || startDate === null) {
            clearSearch()
        }
        else {
            setAppData(appData.filter(date => date.closed >= startDate))
        }
        // eslint-disable-next-line
    },[startDate])

    useEffect(()=>{
        if (endDate === "" || endDate === null) {
            clearSearch()
        }
        else {
            setAppData(appData.filter(date => date.closed <= endDate))
        }
        // eslint-disable-next-line
    },[endDate])

    const loadPage = () => {
        API.getApps(user.id,token)
        .then(res=>{
            const tempArray = res.data
            setAppData(tempArray.filter(item => item.open === false))
            setRawData(tempArray.filter(item => item.open === false))
        })
        .catch(err=>{
            console.log(err)
        })
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

    const clearSearch = () => {
        setAppData(rawData)
        setSearch("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <div className="closed d-flex col-12">
            <div className="d-flex flex-column col-11 mx-auto mt-3">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Closed Applications</h1>
                </div>
                <form className="d-flex justify-content-start mt-5 col-11 mx-auto justify-content-between">
                    <div className="d-flex flex-column col-6">
                        <label>Employer</label>
                        <input type="text" name="search" placeholder="Type Here to Serarch..." value={search} onChange={handleInputChange}></input>
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
                        <button className="bg-secondary text-light col-2 rounded align-self-end">Clear Search</button>
                    </div>
                </form>
                <div className="closed-table col-11 mx-auto mt-5 overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col" className="col-4">Employer</th>
                                <th scope="col" className="col-3">Title</th>
                                <th scope="col" className="col-3">Link</th>
                                <th scope="col" className="col-1">Date Applied</th>
                                <th scope="col" className="col-1">Date Closed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appData.map(item => <ClosedAppList key={item.id} app={item}/>)}
                        </tbody>
                    </table>
                </div>
                <h3 className="text-center">Showing {appData.length} Applications</h3>
            </div>
        </div>
    )
}

export default ClosedApps