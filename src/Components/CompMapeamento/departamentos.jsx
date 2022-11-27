import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebaseConfig";
import { addDepAction, getDepAction, setDepAction, updateDepAction } from "../../services/actions/depActions";
import { addDepAcess, getDepAcess, setDepAcess } from "../../services/dataAcess/depAcess";
import DarkExample from "../Tabelas/TabelaDescDep";

import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import TabelaDescDep from "../Tabelas/TabelaDescDep";
import departamento from '../CompMapeamento/departamento.scss';



export default function Departamentos() {
    const colectionRef = collection(db, 'Departamentos');


    const [departamentos, setDepartamentos] = useState([]);
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');

    const [sessionSelected, setSessionSelected] = useState(null);

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
            qntSessoes: 6,
            qntProdutos: 524,
            brutoTotal: 24348,
            responsavel: 'Dione',
            ultInventario: '18/07/2022',
            status: 'Validado',

            areas: [
                { area: 'Sessao 001' },
                { area: 'Sessao 002' },
                { area: 'Sessao 003' },
                { area: 'Sessao 001' },
                { area: 'Sessao 002' },
                { area: 'Sessao 003' }
            ]
        });
    }

    function exiberDescricao(id) {
        const dep = departamentos.find(dep => dep.id === id);
        
        setDescricao(dep);
        
        setSessionSelected(id);
    }



    return (
        <div className="mainDep">
            <div className="topMain">
                {/* Departamen */}
                <div className="renderDep">
                    <ul className={`renderList `}>
                        {departamentos && departamentos.map((departamento) => (
                            <li key={departamento.id} >
                                <div >
                                    <button className={`renderButton ${sessionSelected === departamento.id && 'selected'}`} onClick={() => { exiberDescricao(departamento.id) }}>
                                        {departamento.name}</button>
                                </div>
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
                        <button className="botaoAdd" onClick={addDep}>Adicionar</button>
                        <button className="botaoAdd" onClick={setDep}>Setar</button>
                    </div>
                </div>

                <div >
                    {descricao && (descricao.areas.map((area) => (
                        <div>
                            <button className="Sessoes">{area.area}</button>
                        </div>
                    )))}
                </div>
            </div>

            {/* Detalhes do Departamento */}
            <div>
                visualizar departamentos
                <div>
                    <div className="Border">
                        <h4>{descricao.name}</h4>
                        {descricao && (<button className="botaoAdd" onClick={() => { deleteDep(descricao.id) }}>Excluir Departamento</button>)}
                    </div>
                    <Row>
                        <TabelaDescDep desc={descricao} />
                    </Row>
                </div>

            </div>
        </div>

    )
}