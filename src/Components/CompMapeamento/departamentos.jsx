import { async } from "@firebase/util";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebaseConfig";
import { addDepAction, getDepAction, setDepAction } from "../../services/actions/depActions";
import { addDepAcess, getDepAcess, setDepAcess } from "../../services/dataAcess/depAcess";





export default function Departamentos() {
    const colectionRef = collection(db, 'Departamentos');

    const [departamentos, setDepartamentos] = useState([]);
    const [name, setName] = useState('');

   
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(colectionRef);
            setDepartamentos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData();
    }, []);

    async function deleteDep(id) {
        const response = await deleteDoc(doc(db, "Departamentos", id));
        console.log(response);
        return response;
    }

    
    function addDep() {
        addDepAcess({ name: name });
        //console.log(departamentos);
        
    }

    return (
        <div>
            <p>Departamentos</p>

            <ul>
                {departamentos && departamentos.map((departamento) => (
                    <li key={departamento.id}>
                        <p >
                            {departamento.name}
                        </p>
                        <button onClick={() => { deleteDep(departamento.id) }}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                <p>Adicionar Departamento</p>
               
                    <input 
                        type="text" 
                        placeholder="Nome do Departamento" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        />
                    
                    <button onClick={addDep}>Adicionar</button>
                    
               
            </div>
        </div>
    )
}