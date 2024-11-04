import { Input, Button, message, Tooltip } from "antd"
import { useContext, useState } from "react"
import { NewDoctorModal } from "../components/Modals"
import { encrypt } from "../functions/hash"
import { createDoctor, getDoctors } from "../client/client"
import { appContext } from "../context/appContext"
import { DeleteOutlined } from '@ant-design/icons'

const AdminDocs = () => {

    const [newDocModal, setNewDocModal] = useState(false)
    const [regSpecialty, setRegSpecialty] = useState('')
    const [messageApi, contextHolder] = message.useMessage()
    const [selectedSpecialty, setSelectedSpecialty] = useState(0)
    const {doctorsList, setDoctorsList} = useContext(appContext)
    const [showList, setShowList] = useState(doctorsList)

    const submitDocRegister = async () => {
        const regId = document.getElementById('regId').value
        const regName = document.getElementById('regName').value
        const regAddress = document.getElementById('regAddress').value
        const regEmail = document.getElementById('regEmail').value
        const regPassword = document.getElementById('regPassword').value
        const regphone = document.getElementById('regPhone').value
        const regBirthDate = document.getElementById('regBirthDate').value
        const regUserName = document.getElementById('regUserName').value

        const data = {
            id: regId,
            name: regName,
            address: regAddress,
            email: regEmail,
            userName: await encrypt(regUserName),
            password: await encrypt(regPassword),
            phone: regphone,
            birthDate: regBirthDate,
            specialty: selectedSpecialty,
            type: 1,
        }

        let res = await createDoctor(data)
        if(res.status == 200){
            setNewDocModal(false)
            messageApi.open({
                type: 'success',
                content: 'Registro exitoso'
            })
            let list = await getDoctors()
            setDoctorsList(list.data)
            setShowList(list.data)
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
                {showList.map(item => (
                    <div className="ListItem">
                        <div className="info">
                            <h3>{item.id}</h3>
                            <h3>{item.name}</h3>
                            <h3>{item.specialtyName}</h3>
                        </div>

                        <div className="Buttons">
                            <Tooltip title='Eliminar'>
                                <Button shape="circle" icon={<DeleteOutlined />}/>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
            <NewDoctorModal
                open={newDocModal}
                onCancel={() => setNewDocModal(false)}
                onOk={submitDocRegister}
                specialtyHandler={setSelectedSpecialty}
            />
        </div>
    )
}

export default AdminDocs