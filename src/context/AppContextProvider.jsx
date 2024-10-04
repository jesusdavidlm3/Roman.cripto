import { appContext } from './appContext'
import { useState } from 'react'

const AppContextProvider = ({children}) => {

    const [userData, setUserData] = useState('')
    const [logged, setLogged] = useState(false)

    return(
        <appContext.Provider value={{
            userData,
            setUserData,
            logged,
            setLogged
        }}>
            {children}
        </appContext.Provider>
    )

}

export default AppContextProvider