import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar'

const Root = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/Home')
    }, [])

    return(
        <div className="Root">
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Root