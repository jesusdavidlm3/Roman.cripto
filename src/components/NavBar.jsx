import { Button, Flex } from "antd"
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { useNavigate, useLocation } from "react-router-dom"
import { LeftCircleOutlined } from "@ant-design/icons"

const NavBar = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {userData, setUserData, setLogged, logged} = useContext(appContext)

    function logout(){
        navigate('/home')
        setUserData('')
        setLogged(false)
    }

    return(
        <div className="NavBar">
            <h1>Bienvenido {logged ? (userData.name):(<>a MediControl</>)}</h1>
            <div className="Buttons">
                {location.pathname != '/Home' && location.pathname != '/Dashboard' &&
                    <Button onClick={() => navigate(-1)} style={{margin: '15px'}}>
                        {'< Volver'}
                    </Button>
                }
                {logged && <Button color="danger" variant="solid" onClick={logout}>Cerrar Sesion</Button>}
            </div>
        </div>
    )
}

export default NavBar