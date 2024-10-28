import axios from "axios"

const url = 'http://localhost:3000'

export async function login(data){
    try{
        let res = await axios.post(`${url}/api/login`, data)
        return res
    }catch(err){
        return err
    }

}

export async function createUser(data){
    try{
        let res = await axios.post(`${url}/api/createUser`, data)
        return res
    }catch(err){
        return err
    }
}

export async function createDoctor(data){
    try{
        let res = axios.post(`${url}/api/createDoctor`, data)
        return res
    }catch(err){
        return res
    }
}

export async function getEmployes(){
    try{
        let res = await axios.get(`${url}/api/getEmployes`)
        return res
    }catch(err){
        return err
    }
}

export async function deleteUser(id){
    try{
        let res = await axios.delete(`${url}/api/deleteUser/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function createNewSpecialty(){
    try{
        let res = await axios.post(`${url}/api/createSpecialty`)
        return res
    }catch(err){
        return err
    }
}

export async function changePassword(data) {
    try{
        let res = await axios.patch(`${url}/api/changePassword`, data)
        return res
    }catch(err){
        return err
    }
}