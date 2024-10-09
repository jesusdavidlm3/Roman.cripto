import { Button, message } from "antd"
import { useState } from "react"
import { NewSpecialty } from "../components/Modals"
import { createNewSpecialty } from "../client/client"

const Specialties = () => {

    const [newSpecModal, setNewSpecModal] = useState(false)
    const [messageApi, contextHandler] = message.useMessage()

    const submitNewSpec = () => {

        const specName = document.getElementById('specName').value

        const data = {
            name: specName 
        }

        let res = createNewSpecialty(data)
        if(res.status == 200){
            setNewSpecModal(false)
            messageApi.open({
                type: "success",
                content: 'Especialidad registrada con exito'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Specialties">
            {contextHandler}
            <div className="ListContainer">
                <div className="info">
                    <h1>Especialidades</h1>
                    <Button type="primary" onClick={() => setNewSpecModal(true)}>Agregar</Button>
                </div>
            </div>

            <NewSpecialty open={newSpecModal} onCancel={() => setNewSpecModal(false)} onOk={submitNewSpec}/>
        </div>
    )
}

export default Specialties