import { Modal, Form, Input, Button, DatePicker } from "antd"

export const RegModal = ({open, onOk, onCancel, BirthDateControl}) => {
    return(
        <Modal title='Registrarse' onCancel={onCancel} onOk={onOk} open={open} destroyOnClose>
            <Form>
                <Form.Item name='regId' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Cedula"/>
                </Form.Item>
                <Form.Item name='regName' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Nombre"/>
                </Form.Item>
                <Form.Item name='regAddress' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Direccion"/>
                </Form.Item>
                <Form.Item name='regPhone' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Telefono"/>
                </Form.Item>
                <Form.Item name='regEmail' rules={[{required: true, message: 'Por favor ingrese un ... valido', type: 'email'}]}>
                    <Input placeholder="Correo"/>
                </Form.Item>
                <Form.Item name='regBirthDate' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <DatePicker onChange={BirthDateControl}/>
                </Form.Item>
                <Form.Item name='regPassword' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input.Password placeholder="Contraseña"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}