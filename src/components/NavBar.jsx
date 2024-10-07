import { Button } from "antd"
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"

const NavBar = () => {

    const navigate = useNavigate()
    const {userData, setUserData, setLogged, logged} = useContext(appContext)

    function logout(){
        navigate('/home')
        setUserData('')
        setLogged(false)
    }

    return(
        <div className="NavBar">
            <h1>Bienvenido {logged ? (userData.name):(<>a MediControl</>)}</h1>
            {logged && <Button color="danger" variant="solid" onClick={logout}>Cerrar Sesion</Button>}
        </div>
    )
}

export default NavBar