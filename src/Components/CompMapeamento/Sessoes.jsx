import React from "react";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import TabelaDescDep from "../Tabelas/TabelaDescDep";
import TabelaDescSection from "../Tabelas/TabelaDescSection";
import { addRangeAction, removeRangeAction } from "../../services/actions/sectionActions";
import { addRangeAcess } from "../../services/dataAcess/sectionAcess";
import { addAreasAction } from "../../services/actions/rangeAction";
import styles from "./Sessoes.module.scss";





export default function Sessoes(props) {

   
    const departamentoID = props.dep;
    const sessionID = props.section.id;
    const sessionObj = props.section;
    const rangeHandle = props.range;

    const colectionRef = collection(db, 'Departamentos', `${departamentoID}`, 'Sessoes', );

    const [rangeSelected, setRangeSelected] = useState(null);

    const [nameRange, setNameRange] = useState('');
    
    const [rangeFinal, setRangeFinal] = useState(0);
    
    const [sessoes, setSessoes] = useState([]);

    useEffect (() => {
        const unsubscribe = onSnapshot(collection(db,
            'Departamentos', `${departamentoID}`,
            'Sessoes', `${sessionID}`,
            'Ranges'),
           (snapshot) => {
            setSessoes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        
        return unsubscribe;
    }, []);

    function removerRange(id) {
        const idDep = departamentoID;
        const idSection = sessionID;
        const idRange = id;
        removeRangeAction(idDep, idSection, idRange);
    }
    function removerSession(id) {
        const idDep = departamentoID;
        const idSection = id;
        //removeSessionAction(idDep, idSection);
    }

    const [rangeInitial, setRangeInitial] = useState(0);
    const [geradorAreas, setGeradorAreas] = useState(false);
   function gerarAreas(item){
        setRangeSelected(item);
    

        let idDep = departamentoID;
        let idSection = sessionID;
        let idRange = item.id;

        if(geradorAreas === true){
            let r = rangeInitial
            for (let i = r; i <= rangeFinal; i++) {
                const body = {
                        nomeArea: i ,
                        status: 'Mapeado',
                        produtos: [
                            {
                                sku: '789456325412',
                                nomeProduto: 'Batata Palha',
                                qntProduto: 24,
                            },
                            {
                                sku: '7892256432333',
                                nomeProduto: 'Molho de Tomate',
                                qntProduto: 32,
                            },
                            {
                                sku: '78932569887421',
                                nomeProduto: 'Arroz',
                                qntProduto: 48,
                            }
                        ]
                }
                addAreasAction(body, idDep, idSection, idRange);
            }  
            setGeradorAreas(false);
        }
    }

   function addRange(){ 
        const body = {
            nameRange: ` ${nameRange} ${rangeInitial}-${rangeFinal}`,
            status: 'Mapeado',
            qntProdutos: 12,
            brutoTotal: 123123,
        }
        const idDep = departamentoID;
        const idSection = sessionID;
        addRangeAcess(body, idDep, idSection); 
        setGeradorAreas(true); 
    }

   const handleSubMenu = props.handleSubMenu;
   function navigation(props){
        rangeHandle(props)
        handleSubMenu("Ranges")
    }

   
    return(
        <div className="">
            <div className=''>
                {<h2 className={`bg-orange-500 w-2/4 pl-2 rounded-sm ${styles.sectionTitle}`}>{sessionObj && sessionObj.sectionName}</h2>}  

                <div className={`${styles.sessaoRenderFlex} `}>
                    {/*Sessão List*/}
                    <div className={`bg-slate-700 w-2/4 ${styles.sectionTitle}`}  >
                        {sessoes && sessoes.map((item) => {
                                return (
                                    <ul  key={item.id}>
                                        <li className={styles.list} >
                                            <button className={`${styles.renderButton} `}
                                                onClick={()=>{gerarAreas(item)}}>
                                                    {item.nameRange}
                                            </button>
                                        </li>
                                    </ul>
                            )})
                        }
                    </div>
                    
                        {/*Descrição da Sessão */}
                    <div className={styles.sectionRenderDescription} onClick={()=>{navigation(rangeSelected)}}>
                        <h3>Descrição do Range</h3>
                            {rangeSelected && (
                            <div>
                                <div>{rangeSelected.id}</div>
                                <div>{rangeSelected.status}</div>
                            </div>
                            )}
                    </div>
                </div>

                <div className={`bg-gray-800 w-2/4 flex items-center ${styles.sectionTitle}`} >
                    <input className=" border h-8 w-32 mx-2" type="text" value={nameRange} onChange={e => (setNameRange(e.target.value))}/>
                    <input className=" border h-8 w-32 mx-2" type="number" value={rangeInitial} onChange={(e)=>{setRangeInitial(e.target.value)}} />
                    <input className=" border h-8 w-32 mx-2" type="number" value={rangeFinal} onChange={(e)=>{setRangeFinal(e.target.value)}} />
                    <button className={`${styles.renderButton} `} onClick={()=>{addRange()}}>Adicionar Range</button>
                </div>


            </div>

            {/* Detalhes da Sessão */}
            <div>
                Visualizar Ranges de Áreas
                <div>
                    <div className="Border">
                        <h4>{rangeSelected && rangeSelected.nameRange}</h4>
                        
                        {sessoes && (<button className="botaoAdd" onClick={() => {removerRange(rangeSelected.id) }}>Excluir Range</button>)}
                    </div>
                    <Row>
                        <TabelaDescSection desc={rangeSelected} />
                    </Row>
                </div>

            </div>
        </div>
    ) 
}