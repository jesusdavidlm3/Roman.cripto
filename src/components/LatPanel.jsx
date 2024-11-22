import { Button, Tooltip } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../context/appContext'

const LatPanel = ({makeNewDate, addEntry}) => {

    const navigate = useNavigate()
    const { userData } = useContext(appContext)
    const type = userData.type
    // console.log(userData)
    return(
        <div className="LatPanel">

            { type == 0 && <>
                <Button type='primary' onClick={() => navigate('/AdminDocs')}>Administrar doctores</Button>
                <Button type='primary' onClick={() => navigate('/History')}> Consultar historial</Button>
                <Button type='primary' onClick={() => addEntry(true)}>Agregar registro</Button>
                <Button type='primary' onClick={() => makeNewDate(true)}> Agendar cita</Button>
            </> }

            { type == 1 && <>
                {/* <Button type='primary'>Editar mi perfil</Button> */}
                <Button type='primary' onClick={() => navigate('/History')}>Consultar historial</Button>
                <Button type='primary' onClick={() => addEntry(true)}>Agregar registro</Button>
            </> }

            { type == 2 && <>
                <Button type='primary' onClick={() => makeNewDate(true)}>Agendar cita</Button>
                {/* <Button type='primary'>Editar mi perfil</Button> */}
                <Button type='primary' onClick={() => navigate('/History')}>Mi historial</Button>
            </> }
            <Tooltip title='
                Este panel le proporciona opciones para navegar entre los modulos de administrar doctores o consultar historial
                segun si usted es un doctor, paciente o administrador. Tambien le da la opcion de desplegar ventanas para agendar
                citas o entradas a las historias.
            '>
                <p>Ayuda</p>
            </Tooltip>
        </div>
    )
}

export default LatPanel