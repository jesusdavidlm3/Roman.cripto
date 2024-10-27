import { useContext, useEffect, useState } from "react"
import LatPanel from "../components/LatPanel"
import { Button } from "antd"
import { appContext } from "../context/appContext"

const Dashboard = () => {

    const [showList, setShowList] = useState([])
    const [regDoctorModal, setRegDoctorModal] = useState(false)
    const {userData} = useContext(appContext)

    useEffect(() => {
        const fechaVencida = new Date()
        fechaVencida.setMonth(fechaVencida.getMonth() -1)
        const lastPass = new Date(`${userData.lastPass[6]}${userData.lastPass[7]}${userData.lastPass[8]}${userData.lastPass[9]}`, `${userData.lastPass[3]}${userData.lastPass[4]}`, `${userData.lastPass[0]}${userData.lastPass[1]}`)
        lastPass.setMonth(lastPass.getMonth() - 1)
        const a = fechaVencida
        const b = lastPass
        console.log(b <= a)
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

    return( 
        <div className="Dashboard">
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
        </div>
    )
}

export default Dashboard