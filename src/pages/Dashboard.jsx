import { useContext, useEffect, useState } from "react"
import LatPanel from "../components/LatPanel"
import { Button } from "antd"
import AppContext from "antd/es/app/context"

const Dashboard = () => {

    const [showList, setShowList] = useState([])
    const {userData} = useContext(AppContext)

    useEffect(() => {
        if(userData == 0){
            // Buscar todas las citas disponibles
        }else if(userData.type == 1){
            // Buscar Citas del doctor
        }else if(userData.type == 2){
            // Buscar citas del paciente
        }
    })

    return( 
        <div className="Dashboard">
            <LatPanel/>
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