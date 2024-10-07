import { Button } from 'antd'
import AppContext from 'antd/es/app/context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const LatPanel = () => {

    const navigate = useNavigate()
    const { userData } = useContext(AppContext)
    const type = userData.type
    return(
        <div className="LatPanel">

            { type == 0 && <>
                <Button type='primary'>Registrar doctor</Button>
                <Button type='primary' onClick={() => navigate('/History')}> Consultar historial</Button>
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