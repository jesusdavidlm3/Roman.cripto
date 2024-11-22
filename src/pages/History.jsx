import { Input, Tooltip } from "antd"
import { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import { getHistory } from '../client/client'

const History = () => {

    const {userData} = useContext(appContext)
    const [showList, setShowList] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        search()
    }, [])

    async function search(){
        if(userData.type == 2){
            let res = await getHistory(userData.id)
            setShowList(res.data)
        }else{
            let res = await getHistory(searchInput)
            setShowList(res.data)
        }
    }

    return(
        <div className="History">
            

            <div className="List">
                <h1>Historial</h1>
                { userData.type != 2 && <div className="SearchBar">
                    <Input.Search
                        placeholder="Ingrese la cedula de un paciente"
                        onChange={(e) => setSearchInput(e.target.value)}
                        onSearch={() => search()}
                        style={{width: '100%'}}
                    />
                </div> }
                { showList.map((item) => (
                    <div key={item.id} className='listItem'>
                        <h2>Doctor: {item.doctorName} - Fecha: {item.date}</h2>
                        <h3>{item.description}</h3>
                    </div>
                )) }
                <Tooltip title='
                    Este modulo es para consultar el historial de pacientes, si usted es un paciente su historial
                    se consulta de forma automatica pero si es doctor tendra disponible una barra de busqueda para
                    ingresar la dentificacion de un paciente y al presional el boton buscar se le proporcionara
                    su historial correspondiente.
                '>
                    <p style={{textAlign: 'center'}}>Ayuda</p>
                </Tooltip>    
            </div>

        </div>
    )
}

export default History