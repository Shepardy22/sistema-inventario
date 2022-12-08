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
    const sessionObj = props.section;

    const colectionRef = collection(db, 'Departamentos', `${departamentoID}`, 'Sessoes', );

    const [name, setName] = useState('');

    const [sessoes, setSessoes] = useState([]);
    const [sessionSelected, setSessionSelected] = useState(null);
    const [rangeSelected, setRangeSelected] = useState(null);

    const [nameRange, setNameRange] = useState('');
    const [rangeInitial, setRangeInitial] = useState(0);
    const [rangeFinal, setRangeFinal] = useState(0);

    const [qntAreas, setQntAreas] = useState(0);
    

    useEffect (() => {
        //criar snapshot
        const unsubscribe = onSnapshot(collection(db,'Departamentos', `${departamentoID}`, 'Sessoes', `${sessionObj.id}`, 'Ranges'), (snapshot) => {
            setSessoes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            //console.log(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        
        return unsubscribe;
    }, []);

    function removerSection(rangeId) {
        const idDep = departamentoID;
        const idSection = sessionObj.id;
        const idRange = rangeId;
        removeRangeAction(idDep, idSection, idRange);
    }


    const qntAreasCriar = rangeFinal - rangeInitial;
   function addRange(){

        
        console.log(qntAreasCriar);
        setQntAreas(qntAreasCriar)
         const body = {
            nameRange: ` ${nameRange} ${rangeInitial}-${rangeFinal}`,
            status: 'Mapeado',
            qntProdutos: 12,
            brutoTotal: 123123,
         }
        const idDep = departamentoID;
        const idSection = sessionObj.id;
        addRangeAcess(body, idDep, idSection); 
   }

   function addArea(){
        const body = {
        nomeArea: '0001',
        status: 'Mapeado',
        produtos: [
            {
                SKu: '',
                nomeProduto: '',
                qntProduto: 0,
            }
        ]
    }
        const idDep = departamentoID;
        const idSection = sessionObj.id;
        const idRange = rangeSelected.id;
        for (let i = 0; i < qntAreas; i++) {
            addAreasAction(body, idDep, idSection, idRange);
        }
        
        
   }

   function navigation(props){
       console.log(props);
    }

   
    return(
       
        
        <div className="">
            <div className="">
                
                
                {<h2>{sessionObj && sessionObj.sectionName}</h2>}  
                

                <div className={styles.sessaoRenderFlex}>
                    {/*Sessão List*/}
                    <div>
                        {sessoes && sessoes.map((item) => {
                                return (
                                    <ul  key={item.id}>
                                        <li className={styles.list} >
                                            <button className={`${styles.renderButton} ${rangeSelected && rangeSelected.id === item.id && styles.selected}`}onClick={()=>{setRangeSelected(item)}}>
                                                {item.nameRange}
                                            </button>
                                            
                                             <span><button className={`${styles.renderButton}`} onClick={()=>{addArea()}}>Gerar Áreas</button></span>
                    
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

                <div>
                    <input type="text" value={nameRange} onChange={e => (setNameRange(e.target.value))}/>
                    <input type="number" value={rangeInitial} onChange={(e)=>{setRangeInitial(e.target.value)}} />
                    <input type="number" value={rangeFinal} onChange={(e)=>{setRangeFinal(e.target.value)}} />
                    <button className={`${styles.renderButton}`} onClick={()=>{addRange()}}>Adicionar Range</button>
                </div>


            </div>

            {/* Detalhes da Sessão */}
            <div>
                Visualizar Ranges de Áreas
                <div>
                    <div className="Border">
                        <h4>{rangeSelected && rangeSelected.nameRange}</h4>
                        
                        {sessoes && (<button className="botaoAdd" onClick={() => {removerSection(rangeSelected.id) }}>Excluir Range</button>)}
                    </div>
                    <Row>
                        <TabelaDescSection desc={sessionSelected} />
                    </Row>
                </div>

            </div>
        </div>
    ) 
}