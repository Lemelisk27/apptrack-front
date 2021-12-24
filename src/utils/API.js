import axios from "axios"

// const URL_PREFIX = "http://localhost:3001"

const URL_PREFIX = "https://zwsapptrack-back.herokuapp.com"

const API = {
    login:(data)=>{
        return axios.post(`${URL_PREFIX}/api/users/login`, data)
    }
}

export default API