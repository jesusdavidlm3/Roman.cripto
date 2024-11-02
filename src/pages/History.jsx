import { Input } from "antd"
import { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"

const History = () => {

    const {userData} = useContext(appContext)
    const [showList, setShowList] = useState([])

    useEffect(() => {
        if(userData.type == 2){
            // buscar los registros correspondientes al id
        }
    }, [])

    const search = (e) => {
        //buscar los registros del input
    }

    return(
        <div className="History">
            { userData.type != 2 && <div className="SearchBar">
                <Input onChange={search}/>
            </div> }

            <div className="List">
                { showList.map((item) => (
                    <div key={item.id}>
                        {/* Cambiar el div por un desplegable */}
                    </div>
                )) }
            </div>

        </div>
    )
}

export default History