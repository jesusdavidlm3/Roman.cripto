import { useContext, useEffect, useState } from "react"
import LatPanel from "../components/LatPanel"
import { Button, message, Tooltip } from "antd"
import { appContext } from "../context/appContext"
import { ChangePassword, MakeDateModal, EditDateModal as EditDate, AddEntryModal as AddEntry } from '../components/Modals'
import { getDoctors, changePassword as setNewPassword, getPatientDates, getDoctorsDate, getAllDates, deleteDate } from '../client/client'
import { encrypt } from '../functions/hash'
import { searchById } from '../functions/lists'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const Dashboard = () => {

    const [showList, setShowList] = useState([])
    const [regDoctorModal, setRegDoctorModal] = useState(false)
    const [newPasswordModal, setNewPasswordModal] = useState(false)
    const [makeNewDateModal, setMakeNewDateModal] = useState(false)
    const [editDateModal, setEditDateModal] = useState(false)
    const [addEntryModal, setAddEntryModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const {userData, setDoctorsList, specialties, messageApi} = useContext(appContext)

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
        if(userData.type == 0){
            // let res = await getAllDates()
            // console.log(res)
            // setShowList(res.data)
        }else if(userData.type == 1){
            let res = await getDoctorsDate({doctorId: userData.id})
            setShowList(res.data)
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

    const submitDelete = async (id) => {
        let res = await deleteDate(id)
        if(res.status == 200){
            getDatesList()
            messageApi.open({
                type: 'success',
                content: 'Eliminado con exito'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'error al eliminar'
            })
        }
    }

    return( 
        <div className="Dashboard">
            <LatPanel makeNewDate={setMakeNewDateModal} addEntry={setAddEntryModal}/>
            <div className="ListContainer">
                <h1>Citas Agendadas</h1>
                <div className="List">
                    { showList.map((item) => (
                        <div className="ListItem" key={item.id}>
                            <div className='info'>
                                {item.doctorName && (<>
                                    <h3>Doctor: {item.doctorName}</h3>
                                    <h4>{searchById(specialties, item.specialty)}</h4>
                                </>)}
                                {item.patientName && <h3>Paciente: {item.patientName}</h3>}
                                <h4>Hora: {item.time}</h4>
                                <h4>Fecha: {item.date}</h4>
                            </div>
                            <div className='buttons'>
                                <Tooltip title='Editar'>
                                    <Button onClick={() => {setSelectedDate(item); setEditDateModal(true)}} shape='circle' icon={<EditOutlined/>} size="large"/>
                                </Tooltip>
                                <Tooltip title='Eliminar'>
                                    <Button onClick={() => submitDelete(item.dateId)} shape='circle' color="danger" variant="solid"  icon={<DeleteOutlined/>} size="large"/>
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
                onCancel={() => setMakeNewDateModal(false)}
                listUpdate={() => getDatesList()}
            />
            <EditDate
                open={editDateModal}
                // onOk={}
                onCancel={() => setEditDateModal(false)}
                info={selectedDate}
                listUpdate={() => getDatesList()}
            />
            <AddEntry 
                open={addEntryModal}
                onCancel={() => setAddEntryModal(false)}
            />
        </div>
    )
}

export default Dashboard