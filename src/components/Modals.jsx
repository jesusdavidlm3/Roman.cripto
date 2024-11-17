import { Modal, Form, Input, Button, DatePicker, TimePicker, Select, message, InputNumber } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { makeDate } from '../client/client'

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
                <Form.Item name ='regUserName' rules={[{required: true, message: ''}]}>
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

export const MakeDateModal = ({open, onCancel, listUpdate}) => {

    const { specialties, doctorsList, userData } = useContext(appContext)

    const [selectedSpecialty, setSelectedSpecialty] = useState(-1)
    const [SelectedDoctor, setSelectedDoctor] = useState(0)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    const [activeDoctorSelec, setActiveDoctorSelect] = useState(false)
    const [aviableDoctors, setAviableDoctors] = useState([])
    const aviableSpecialties = specialties.map(item => ({
        value: item.id,
        label: item.name
    }))

    const specialtyChange = (e) => {
        setSelectedSpecialty(e)
        setActiveDoctorSelect(true)
        let filteredDoctors = doctorsList.filter(item => item.specialtyId == e)
        setAviableDoctors(filteredDoctors.map(item => ({
            value: item.id,
            label: item.name
        })))
        console.log(aviableDoctors)
    }

    const submitDate = async () => {
        const patientIdField = document.getElementById('patientId').value
        let patientId
        if(userData.type == 0){
            patientId = patientIdField
        }else{
            patientId = userData.id
        }
        const data = {
            date: selectedDate,
            time: selectedTime,
            patientId: patientId,
            doctorId: SelectedDoctor
        }
        let res = await makeDate(data)
        if(res.status == 200){
            listUpdate()
            onCancel()
        }
    }

    return(
        <Modal title='Agendar cita' destroyOnClose onOk={submitDate} onCancel={onCancel} open={open}>
            <Form>
                { userData.type == 0 && (
                    <Form.Item name='patientId'>
                        <InputNumber placeholder="Cedula del paciente" style={{width: '100%'}}/>
                    </Form.Item>
                ) }
                <Form.Item label='Especialidad'>
                    <Select
                        onChange={specialtyChange}
                        options={aviableSpecialties}
                    />
                </Form.Item>
                <Form.Item label='Doctor'>
                    <Select
                        onChange={(e) => setSelectedDoctor(e)}
                        options={aviableDoctors}
                        disabled={!activeDoctorSelec}
                    />
                </Form.Item>
                <Form.Item label='Fecha: '>
                    <DatePicker
                        onChange={(a, b) => setSelectedDate(b)}
                    />
                </Form.Item>
                <Form.Item label='Hora: '>
                    <TimePicker
                        onChange={(a, b) => setSelectedTime(b)}
                        defaultOpenValue={dayjs('00:00', 'HH:mm')}
                        format='HH:mm'
                        use12Hours
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const EditDateModal = ({onCancel, open, info}) => {

    console.log(info)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    const submitEdit = () => {
        const data = {
            date: selectedDate,
            time: selectedTime,
            id: info.dateId
        }
    }

    return(
        <Modal title = 'Editar cita' destroyOnClose onOk={onOk} onCancel={onCancel} open={open}>
            <Form>
                <Form.Item label='Fecha: '>
                    <DatePicker
                        onChange={(a, b) => setSelectedDate(b)}
                    />
                </Form.Item>
                <Form.Item label='Hora: '>
                    <TimePicker
                        onChange={(a, b) => setSelectedTime(b)}
                        defaultOpenValue={dayjs('00:00', 'HH:mm')}
                        format='HH:mm'
                        use12Hours
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}