import { useContext, useEffect, useState } from "react"
import LatPanel from "../components/LatPanel"
import { Button, message } from "antd"
import { appContext } from "../context/appContext"
import { ChangePassword } from '../components/Modals'
import { changePassword as setNewPassword } from '../client/client'
import { encrypt } from '../functions/hash'

const Dashboard = () => {

    const [showList, setShowList] = useState([])
    const [regDoctorModal, setRegDoctorModal] = useState(false)
    const [newPasswordModal, setNewPasswordModal] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const {userData} = useContext(appContext)

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
    }, [])

    useEffect(() => {
        if(userData == 0){
            // Buscar todas las citas disponibles
        }else if(userData.type == 1){
            // Buscar Citas del doctor
        }else if(userData.type == 2){
            // Buscar citas del paciente
        }
    }, [])

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
            <LatPanel regDoctorModal={() => setRegDoctorModal(true)}/>
            <div className="ListContainer">
                <h1>Citas Agendadas</h1>
                <div className="List">
                    { showList.map((item) => (
                        <div className="ListItem" key={item.id}>
                            <h4>Titulo</h4>
                            <div className="Buttons">
                                <Button type="primary">Editar</Button>
                                <Button variant="solid" color="danger">Cancelar</Button>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
            <ChangePassword
                open={newPasswordModal}
                onOk={submitNewPassword}
            />
        </div>
    )
}

export default Dashboard