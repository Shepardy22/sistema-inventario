import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebaseConfig";
import { addDepAction, getDepAction, setDepAction, updateDepAction } from "../../services/actions/depActions";
import { addDepAcess, getDepAcess, setDepAcess } from "../../services/dataAcess/depAcess";





export default function Departamentos() {
    const colectionRef = collection(db, 'Departamentos');


    const [departamentos, setDepartamentos] = useState([]);
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(colectionRef);
            setDepartamentos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData();
    }, []);

    async function deleteDep(id) {
        const response = await deleteDoc(doc(db, "Departamentos", id));
        return response;
    }

    function setDep() {
        setDepAction({
            name: name,
            areas: [
                { area: '0001' },
                { area: '0022' },
                { area: '0111' }
            ]
        }, 'dep003');
    }


    function addDep() {
        addDepAction({
            name: name,
            areas: [
                { area: 'area001' },
                { area: 'area002' },
                { area: 'area003' }
            ]
        });
    }

    function exiberDescricao(id) {
        const dep = departamentos.find(dep => dep.id === id);
        setDescricao(dep);
    }



    return (
        <div>
            <p>Departamentos</p>

            

            <ul>
                {departamentos && departamentos.map((departamento) => (
                    <li key={departamento.id}>
                        <p >{departamento.name}</p>
                        <button onClick={() => { exiberDescricao(departamento.id) }}>Visualizar</button>
                        <button onClick={() => { deleteDep(departamento.id) }}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
            {/* Adcionar Departamento */}
            <div>
                <p>Adicionar Departamento</p>
                <input type="text"
                    placeholder="Nome do Departamento"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={addDep}>Adicionar</button>
                <button onClick={setDep}>Setar</button>

            </div>
            {/* Detalhes do Departamento */}
            <div>
                visualizar departamentos
                <div><h4>{descricao.name}</h4>
                    <div>
                        {descricao && (descricao.areas.map((area) => (
                            <div>
                                <p>
                                    <p>{area.area}</p>
                                </p>
                            </div>
                        ))
                        )}
                    </div>
                
                    
                </div>
            </div>
        </div>
    )
}