import axios from "axios"

// const URL_PREFIX = "http://localhost:3001"

const URL_PREFIX = "https://zwsapptrack-back.herokuapp.com"

const API = {
    login:(data)=>{
        return axios.post(`${URL_PREFIX}/api/users/login`, data)
    },
    changePassword:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/users/change`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getApps:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/apps/user/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    addApp:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/apps`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getOneApp:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/apps/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    closeApp:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/apps/close`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateApp:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/apps`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    }
}

export default API