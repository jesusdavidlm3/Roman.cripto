import { appContext } from './appContext'
import { useState } from 'react'
import { message } from 'antd'

const AppContextProvider = ({children}) => {

    const [messageApi, contextHolder] = message.useMessage()
    const [userData, setUserData] = useState('')
    const [logged, setLogged] = useState(false)
    const [specialties, setSpecialties] = useState([
        {id: 1, name: 'Cardiologia'},
        {id: 2, name: 'Neumonologia'},
        {id: 3, name: 'Dermatologia'},
        {id: 4, name: 'Neurologia'},
        {id: 5, name: 'Oncologia'}
    ])
    const [doctorsList, setDoctorsList] = useState([])

    return(
        <appContext.Provider value={{
            userData,
            setUserData,
            logged,
            setLogged,
            specialties,
            doctorsList,
            setDoctorsList,
            messageApi,
            contextHolder,
        }}>
            {children}
        </appContext.Provider>
    )

}

export default AppContextProvider