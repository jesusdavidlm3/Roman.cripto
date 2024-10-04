import { Form, Button, Input, Modal, message } from 'antd'
import { encrypt } from '../functions/hash'
import { login, createUser } from '../client/client'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RegModal } from '../components/Modals'

const Home = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const [modalReg, setModalReg] = useState(false)

    const sendLogin = async () => {

        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPassword').value

        const data = {
            email: email,
            password: await encrypt(password)
        }

        let res = await login(data)
        if(res.status == 200){
            navigate('/Dashboard')
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const sendRegister = async () => {
        const id = document.getElementById('').value

        const data = {
            id: id,
        }

        let res = await createUser(data)
        if(res.status == 200){
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
                <Form.Item className='Input' name='loginEmail' rules={[{type: 'email', required: true, message: 'Por favor ingrese un correo valido'}]}>
                    <Input placeholder='Correo'/>
                </Form.Item>
                <Form.Item className='Input' name='loginPassword' rules={[{required: true, message: 'Por favor ingrese un correo valido'}]}>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>

                <Button className='Button' onClick={sendLogin} type='primary'>Iniciar sesion</Button>
                <Button className='Button' onClick={() => setModalReg(true)}>Registrarse</Button>
            </Form>
            <RegModal open={modalReg} onCancel={() => setModalReg(false)} onOk={() => sendRegister()}/>
        </div>
    )
}

export default Home