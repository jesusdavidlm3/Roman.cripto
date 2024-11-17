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

export async function getDoctors(){
    try{
        let res = await axios.get(`${url}/api/getDoctors`)
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

export async function changePassword(data) {
    try{
        let res = await axios.patch(`${url}/api/changePassword`, data)
        return res
    }catch(err){
        return err
    }
}

export async function makeDate(data){
    try{
        let res = await axios.post(`${url}/api/makeDate`, data)
        return res
    }catch(err){
        return err
    }
}

export async function getPatientDates(data){
    try{
        let res = axios.post(`${url}/api/getPatientDates`, data)
        return res
    }catch(err){
        return err
    }
}

export async function getDoctorsDate(data){
    try{
        let res = axios.post(`${url}/api/getDoctorsDate`, data)
        return res
    }catch(err){
        return err
    }
}

export async function getAllDates(){
    try{
        let res = axios.get(`${url}/api/getAllDates`)
        return res
    }catch(err){
        return err
    }
}

export async function deleteDate(id) {
    try{
        let res = await axios.delete(`${url}/api/deleteDate/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function editDate(data) {
    try{
        let res = await axios.patch(`${url}/api/editDate`, data)
        return res
    }catch(err){
        return err
    }
}

export async function addEntry(data) {
    try{
        let res = await axios.post(`${url}/api/addEntry`, data)
        return res
    }catch(err){
        return err
    }
}