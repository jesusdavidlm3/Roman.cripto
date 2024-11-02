import { Modal, Form, Input, Button, DatePicker, TimePicker, Select, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"

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
                <Form.Item name='regUserName' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input placeholder="Usuario"/>
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
                    <DatePicker onChange={(a, b) => BirthDateControl(b)}/>
                </Form.Item>
                <Form.Item name='regPassword' rules={[{required: true, message: 'Por favor ingrese un ... valido'}]}>
                    <Input.Password placeholder="Contraseña"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const NewDoctorModal = ({birthDateReg, onOk, onCancel, open, specialtyHandler}) => {

    const { specialties } = useContext(appContext)
    let options = []

    specialties.forEach(item => {
        let current = {
            value: item.id,
            label: item.name
        }
        options.push(current)
    });

    return(
        <Modal title='Registrar un doctor' onOk={onOk} onCancel={onCancel} open={open} destroyOnClose>
            <Form>
                <Form.Item name ='regId' rules={[{required: true, message: ''}]}>
                    <Input placeholder="Cedula"/>
                </Form.Item>
                <Form.Item name ='regName' rules={[{required: true, message: ''}]}>
                    <Input placeholder="Nombre"/>
                </Form.Item>
                <Form.Item name ='regAddress' rules={[{required: true, message: ''}]}>
                    <Input placeholder="Direccion"/>
                </Form.Item>
                <Form.Item name ='regEmail' rules={[{required: true, message: '', type: 'email'}]}>
                    <Input placeholder="Correo"/>
                </Form.Item>
                <Form.Item name ='regUserName' rules={[{required: true, message: '', type: 'email'}]}>
                    <Input placeholder="Usuario"/>
                </Form.Item>
                <Form.Item name ='regPassword' rules={[{required: true, message: ''}]}>
                    <Input.Password placeholder="Contraseña"/>
                </Form.Item>
                <Form.Item name ='regPhone' rules={[{required: true, message: ''}]}>
                    <Input placeholder="Telefono"/>
                </Form.Item>
                <Form.Item label='Fecha de nacimiento' name ='regBirthDate' rules={[{required: true, message: ''}]}>
                    <DatePicker onChange={(a, b) => birthDateReg(b)}/>
                </Form.Item>
                <Form.Item label='Especialidad' name ='regSpecialty' rules={[{required: true, message: ''}]}>
                    <Select
                        onChange={(e) => specialtyHandler(e)}
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const NewSpecialty = ({open, onCancel, onOk}) => {
    return(
        <Modal title='Agreggar nueva especialidad' open={open} onCancel={onCancel} onOk={onOk} destroyOnClose>
            <Form>
                <Form.Item name='specName'>
                    <Input placeholder="Nombre de la especialidad"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const ChangePassword = ({open, onOk}) => {

    const [messageApi, contextHolder] = message.useMessage()

    const cancelTry = () => {
        messageApi.open({
            type: 'error',
            content: 'Debe suministrar una nueva contraseña'
        })
    }

    return(
        <Modal title='Su contraseña se ha vencido' onOk={onOk} onCancel={cancelTry} open={open} destroyOnClose>
            {contextHolder}
            <Form>
                <FormItem name='newPassword'>
                    <Input.Password placeholder="Contraseña Nueva"/>
                </FormItem>
            </Form>
        </Modal>
    )
}