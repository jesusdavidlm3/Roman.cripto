import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar'
import { appContext } from "../context/appContext"

const Root = () => {

    const navigate = useNavigate()
    const { contextHolder } = useContext(appContext)

    useEffect(() => {
        navigate('/Home')
    }, [])

    return(
        <div className="Root">
            { contextHolder }
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Root