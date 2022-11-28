import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import TabelaDescDep from "../Tabelas/TabelaDescDep";
import TabelaDescSection from "../Tabelas/TabelaDescSection";



export default function Sessoes() {

   
    
    

    const colectionRef = collection(db, 'Departamentos', 'hV3u0tQ1QXugkDf1vXqO', 'Sessoes');

    const [name, setName] = useState('');

    const [sessoes, setSessoes] = useState([]);
    const [sessionSelected, setSessionSelected] = useState(null);

    useEffect (() => {
        const getData = async () => {
            const data = await getDocs(colectionRef);
            setSessoes(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            
        }
        getData();

        
        
    }, []);

    function exiberDescricao(id){
        const session = sessoes.find(session => session.id === id);
        setSessionSelected(session);
       
    }

    return(
       
        
        <div className="mainDep">
            <div className="topMain">
                {/* Departamen */}
                <div className="renderDep">
                    <ul className={`renderList `}>
                        {sessoes && sessoes.map((section) => (
                            <li key={section.id} >
                                <div >
                                    <button className={`renderButton `} onClick={() => { exiberDescricao(section.id) }}>
                                        {section.sectionName}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* Adcionar Departamento */}
                    <div>
                        <p>Adicionar Sessão</p>
                        <input type="text"
                            placeholder="Nome do Departamento"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className="botaoAdd" onClick={()=>{}}>Adicionar</button>
                        <button className="botaoAdd" onClick={()=>{}}>Setar</button>
                    </div>
                </div>

                <div >
                {/* outro render */}
                </div>
            </div>

            {/* Detalhes do Departamento */}
            <div>
                visualizar Sessões
                <div>
                    <div className="Border">
                        <h4>{sessionSelected && sessionSelected.sectionName}</h4>
                        {sessoes && (<button className="botaoAdd" onClick={() => { }}>Excluir Sessão</button>)}
                    </div>
                    <Row>
                        <TabelaDescSection desc={sessionSelected} />
                    </Row>
                </div>

            </div>
        </div>
    ) 
}