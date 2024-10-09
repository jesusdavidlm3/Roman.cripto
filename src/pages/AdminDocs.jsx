import { Input, Button, message } from "antd"
import { useState } from "react"
import { NewDoctorModal } from "../components/Modals"
import { encrypt } from "../functions/hash"
import { createDoctor } from "../client/client"

const AdminDocs = () => {

    const [newDocModal, setNewDocModal] = useState(false)
    const [regSpecialty, setRegSpecialty] = useState('')
    const [messageApi, contextHolder] = message.useMessage()

    const submitDocRegister = async () => {
        const regId = document.getElementById('regId').value
        const regName = document.getElementById('regName').value
        const regAddress = document.getElementById('regAddress').value
        const regEmail = document.getElementById('regEmail').value
        const regPassword = document.getElementById('regPassword').value
        const regphone = document.getElementById('regPhone').value
        const regBirthDate = document.getElementById('regBirthDate').value

        const data = {
            id: regId,
            name: regName,
            Address: regAddress,
            email: regEmail,
            password: await encrypt(regPassword),
            phone: regphone,
            birthDate: regBirthDate,
            specialty: regSpecialty,
            type: 1,
        }

        let res = await createDoctor(data)
        if(res.status == 200){
            setNewDocModal(false)
            messageApi.open({
                type: 'success',
                content: 'Registro exitoso'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="AdminDocs">
            {contextHolder}
            <div className="SearchBar">
                <Input placeholder="Ingrese la identificacion del doctor"/>
                <Button type="primary" onClick={() => setNewDocModal(true)}>Agregar</Button>
            </div>
            <div className="ListContainer">

            </div>
            <NewDoctorModal open={newDocModal} onCancel={() => setNewDocModal(false)} onOk={submitDocRegister}/>
        </div>
    )
}

export default AdminDocs