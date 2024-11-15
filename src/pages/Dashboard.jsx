import { useContext, useEffect, useState } from "react"
import LatPanel from "../components/LatPanel"
import { Button, message, Tooltip } from "antd"
import { appContext } from "../context/appContext"
import { ChangePassword, MakeDateModal } from '../components/Modals'
import { getDoctors, changePassword as setNewPassword, getPatientDates } from '../client/client'
import { encrypt } from '../functions/hash'
import { searchById } from '../functions/lists'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const Dashboard = () => {

    const [showList, setShowList] = useState([])
    const [regDoctorModal, setRegDoctorModal] = useState(false)
    const [newPasswordModal, setNewPasswordModal] = useState(false)
    const [makeNewDateModal, setMakeNewDateModal] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const {userData, setDoctorsList, specialties} = useContext(appContext)

    useEffect(() => {
        if(userData.lastPass == '0'){
            console.log('Administrador')
        }else{
            const fechaVencida = new Date()
            fechaVencida.setMonth(fechaVencida.getMonth() -1)
            const lastPass = new Date(`${userData.lastPass[6]}${userData.lastPass[7]}${userData.lastPass[8]}${userData.lastPass[9]}`, `${userData.lastPass[3]}${userData.lastPass[4]}`, `${userData.lastPass[0]}${userData.lastPass[1]}`)
            lastPass.setMonth(lastPass.getMonth() - 1)
            const a = fechaVencida
            const b = lastPass
            if(b <= a){
                setNewPasswordModal(true)
            }
        }

        getDoctorsList()
    }, [])

    useEffect(() => {
        getDatesList()
    }, [])

    async function getDatesList() {
        if(userData == 0){
            // Buscar todas las citas disponibles
        }else if(userData.type == 1){
            // Buscar Citas del doctor
        }else if(userData.type == 2){
            let res = await getPatientDates({patientId: userData.id})
            setShowList(res.data)
        }
    }

    const getDoctorsList = async () => {
        let res = await getDoctors()
        // console.log(res)
        setDoctorsList(res.data)
    }

    const submitNewPassword = async () => {
        const newPassword = document.getElementById('newPassword').value

        const data = {
            userId: userData.id,
            newPassword: await encrypt(newPassword),
            newLastPass : `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        }

        let res = await setNewPassword(data)
        if(res.status == 200){
            setNewPasswordModal(false)
            messageApi.open({
                type: 'success',
                content: 'Contraseña cambiada con exito'
            })
        }
    }

    return( 
        <div className="Dashboard">
            {contextHolder}
            <LatPanel makeNewDate={setMakeNewDateModal}/>
            <div className="ListContainer">
                <h1>Citas Agendadas</h1>
                <div className="List">
                    { showList.map((item) => (
                        <div className="ListItem" key={item.id}>
                            <div className='info'>
                                <h3>Doctor: {item.doctorName}</h3>
                                <h4>{searchById(specialties, item.specialty)}</h4>
                                <h4>Hora: {item.time}</h4>
                                <h4>Fecha: {item.date}</h4>
                            </div>
                            <div className='buttons'>
                                <Tooltip title='Editar'>
                                    <Button shape='circle' icon={<EditOutlined/>} size="large"/>
                                </Tooltip>
                                <Tooltip title='Eliminar'>
                                    <Button shape='circle' color="danger" variant="solid"  icon={<DeleteOutlined/>} size="large"/>
                                </Tooltip>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
            <ChangePassword
                open={newPasswordModal}
                onOk={submitNewPassword}
            />
            <MakeDateModal
                open={makeNewDateModal}
                // onOk={}
                onCancel={() => setMakeNewDateModal(false)}
            />
        </div>
    )
}

export default Dashboard