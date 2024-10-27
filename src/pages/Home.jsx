import { Form, Button, Input, Modal, message } from 'antd'
import { encrypt } from '../functions/hash'
import { login, createUser } from '../client/client'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { RegModal } from '../components/Modals'
import { appContext } from '../context/appContext'

const Home = () => {

    const {logged, setLogged, setUserData} = useContext(appContext)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const [modalReg, setModalReg] = useState(false)
    const [regBirthDate, setRegBirthDate] = useState('')

    const sendLogin = async () => {

        const userName = document.getElementById('loginUserName').value
        const password = document.getElementById('loginPassword').value

        const data = {
            userName: await encrypt(userName),
            password: await encrypt(password)
        }
        let res = await login(data)
        if(res.status == 200){
            setUserData(res.data)
            setLogged(true)
            navigate('/Dashboard')
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const sendRegister = async () => {
        const id = document.getElementById('regId').value
        const name = document.getElementById('regName').value
        const userName = document.getElementById('regUserName').value
        const address = document.getElementById('regAddress').value
        const phone = document.getElementById('regPhone').value
        const email = document.getElementById('regEmail').value
        const birthDate = regBirthDate
        const password = document.getElementById('regPassword').value
        const lastPass = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

        const data = {
            id: id,
            name: name,
            userName: await encrypt (userName),
            address: address,
            phone: phone,
            email: email,
            birthDate: `${birthDate.$D}/${birthDate.$M + 1}/${birthDate.$y}`,
            password: await encrypt(password),
            type: 2,
            lastPass: lastPass
        }
        console.log(data)
        let res = await createUser(data)
        if(res.status == 200){
            setModalReg(false)
            messageApi.open({
                type: 'success',
                content: 'Usuario creado con exito'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Home">
            {contextHolder}
            <h3>Inicie sesion o registrese para agendar su cita</h3>
            <Form className='formulario'>
                <h2>Iniciar sesion</h2>
                <Form.Item className='Input' name='loginUserName' rules={[{type: 'email', required: true, message: 'Por favor ingrese un correo valido'}]}>
                    <Input placeholder='Usuario'/>
                </Form.Item>
                <Form.Item className='Input' name='loginPassword' rules={[{required: true, message: 'Por favor ingrese un correo valido'}]}>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>

                <Button className='Button' onClick={sendLogin} type='primary'>Iniciar sesion</Button>
                <Button className='Button' onClick={() => setModalReg(true)}>Registrarse</Button>
            </Form>
            <RegModal open={modalReg} onCancel={() => setModalReg(false)} onOk={() => sendRegister()} BirthDateControl={setRegBirthDate}/>
        </div>
    )
}

export default Home