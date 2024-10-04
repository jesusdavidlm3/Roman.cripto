import { Modal, Form, Input, Button, message } from "antd"

export const RegModal = ({open, onOk, onCancel}) => {
    return(
        <Modal title='Registrarse' onCancel={onCancel} onOk={onOk} open={open}>
            <Form>
                <Form.Item name='id' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Cedula"/>
                </Form.Item>
                <Form.Item name='name' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Nombre"/>
                </Form.Item>
                <Form.Item name='address' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Direccion"/>
                </Form.Item>
                <Form.Item name='phone' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Telefono"/>
                </Form.Item>
                <Form.Item name='email' rules={[{required: true, message: 'Por favor ingrese un ... valido', type: 'email'}]}>
                    <Input placeholder="Correo"/>
                </Form.Item>
                <Form.Item name='birthDate' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Fecha de Nacimiento"/>
                </Form.Item>
                <Form.Item name='password' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input.Password placeholder="Contraseña"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}