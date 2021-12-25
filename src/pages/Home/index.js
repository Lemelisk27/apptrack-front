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
    const [appData, setAppData] = useState([])
    const [addAppModal, setAddAppModal] = useState(false)

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[addAppModal])

    const loadPage = () => {
        API.getApps(user.id,token)
        .then(res=>{
            const tempArray = res.data
            setAppData(tempArray.filter(item => item.open === true))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const addApp = (e) => {
        e.preventDefault()
        setAddAppModal(true)
    }

    return (
        <div className="home d-flex col-12">
            <div className="d-flex flex-column col-11 mx-auto mt-3">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Open Applications</h1>
                    <button className="bg-secondary text-light col-2 rounded" onClick={addApp}>Add Application</button>
                </div>
                <form className="d-flex justify-content-start mt-5 col-11 mx-auto">
                    <div className="d-flex flex-column col-6">
                        <label>Employer</label>
                        <input type="text" name="employer" placeholder="Type Here to Search..."></input>
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