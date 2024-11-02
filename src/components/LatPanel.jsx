import { Button } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../context/appContext'

const LatPanel = () => {

    const navigate = useNavigate()
    const { userData } = useContext(appContext)
    const type = userData.type
    // console.log(userData)
    return(
        <div className="LatPanel">

            { type == 0 && <>
                <Button type='primary' onClick={() => navigate('/AdminDocs')}>Administrar doctores</Button>
                <Button type='primary' onClick={() => navigate('/History')}> Consultar historial</Button>
                <Button type='primary'> Agendar cita</Button>
            </> }

            { type == 1 && <>
                <Button type='primary'>Editar mi perfil</Button>
                <Button type='primary' onClick={() => navigate('/History')}>Consultar historial</Button>
                <Button type='primary'>Agregar registro</Button>
            </> }

            { type == 2 && <>
                <Button type='primary'>Agendar cita</Button>
                <Button type='primary'>Editar mi perfil</Button>
                <Button type='primary' onClick={() => navigate('/History')}>Mi historial</Button>
            </> }
        </div>
    )
}

export default LatPanel