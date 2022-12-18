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
import {RangeService} from "./RangeService";

import styles from "./Sessoes.module.scss";





export default function Sessoes(props) {

   
    const departamentoID                                                = props.dep;
    const sessionID                                                     = props.section.id;
    const sessionObj                                                    = props.section;
    const rangeHandle                                                   = props.range;

    const colectionRef                                                  = collection(db, 'Departamentos', `${departamentoID}`, 'Sessoes', );
    const [rangeSelected, setRangeSelected]                             = useState(null);
    const [nameRange, setNameRange]                                     = useState('');

    const [rangeFinal, setRangeFinal]                                   = useState(0);

    const [ranges, setRanges]                                         = useState([]);

    const [rangeInitial, setRangeInitial]                               = useState(0);
    const [geradorAreas, setGeradorAreas]                               = useState(false);
    const handleSubMenu                                                  = props.handleSubMenu;

     const rangeService = new RangeService();

    useEffect (() => {
        handleListRanges(); 
    }, []);

   async function handleListRanges(){
        const ranges = await rangeService.getRanges(departamentoID, sessionID);
        setRanges(ranges);
        //console.log(ranges);
    }

    function removerRange(id) {
        const idDep                                                     = departamentoID;
        const idSection                                                 = sessionID;
        const idRange                                                   = id;
        rangeService.removerRange(idDep, idSection, idRange);
        handleListRanges();
    }
    
   function gerarAreas(item){

        setRangeSelected(item);
        

        let idDep                                                       = departamentoID;
        let idSection                                                   = sessionID;
        let idRange                                                     = item.id;

        if(geradorAreas === true){
            let r                                                       = rangeInitial
            for (let i = r; i <= rangeFinal; i++) {
                const body = {
                        nomeArea                                        : i ,
                        qntItens                                        : 0,
                        status                                          : 'Mapeado',
                        produtos: [
                            {
                                sku                                     : '789456325412',
                                nomeProduto                             : 'Batata Palha',
                                qntProduto                              : 24,
                            },
                            {
                                sku                                     : '7892256432333',
                                nomeProduto                             : 'Molho de Tomate',
                                qntProduto                              : 32,
                            },
                            {
                                sku                                     : '78932569887421',
                                nomeProduto                             : 'Arroz',
                                qntProduto                              : 48,
                            }
                        ],
                        obs                                             : ''
                }
                addAreasAction(body, idDep, idSection, idRange);
            }  
            setGeradorAreas(false);
        }
    }

   function adicionarRange(){ 
        
        const idDep                                                     = departamentoID;
        const idSection                                                 = sessionID;
        rangeService.addRange(idDep, idSection, nameRange, rangeInitial, rangeFinal);
        setGeradorAreas(true); 
        handleListRanges();
    }

   function navigation(props){
        rangeHandle(props);
        handleSubMenu("Ranges");
    }

   
    return(
        <div className                                                  = " bg-gray-200 ">
            

            <div className                                              = {`w-full flex flex-col sm:flex-row items-top border rounded-sm p-2 boxShadow ${styles.boxShadow}`}>
                {/*Ranges  */}
                <div className                                          = "flex flex-col  w-full sm:w-1/2 mb-2">
                    {<h2 className                                      = {` bg-orange-500 w-full pl-2 rounded-sm ${styles.sectionTitle}`}>
                        {sessionObj && sessionObj.sectionName}</h2>}
                
                    <div className                                      = {`flex flex-col sm:flex-row justify-center `}>
                        {/*Lista Ranges*/}
                        <div className                                  = {`bg-primaryBg-100 w-full border  ${styles.sectionTitle} `}  >
                                {ranges && ranges.map((item) => {
                                        return (
                                            <ul  key                    = {item.id}
                                            className                   = {`flex mt-2 `}>
                                                <li className           = {``} >
                                                    <button className   = {`border rounded-md  p-1 text-gray-300 hover:text-orange-500 ${item.rangeName === nameRange && 'text-orange-500'}  ${styles.boxShadow} `}
                                                        onClick         = {()=>{gerarAreas(item)}}>
                                                            {item.rangeName}
                                                    </button>
                                                </li>
                                            </ul>
                                    )})
                                }
                                           {/*Inputs  */}
                            <div className                              = {`bg-secondaryBg-100  flex items-center mb-2 gap-1 justify-end`} >
                                <input className                        = " w-1/5 h-8" type="text" placeholder="ex: Range 01" value={nameRange} onChange={e => (setNameRange(e.target.value))}/>
                                <input className                        = "w-1/5 h-8" type="number" value={rangeInitial} onChange={(e)=>{setRangeInitial(e.target.value)}} />
                                <input className                        = "w-1/5 h-8" type="number" value={rangeFinal} onChange={(e)=>{setRangeFinal(e.target.value)}} />
                                <button className                       = {`w-1/5 h-8 ${styles.renderButton} text-sm`} onClick={()=>{adicionarRange()}}>Add</button>
                            </div>
                
                        </div>
                    </div>
                    
                </div>

                {/*Descrição  */}
                <div className                                          = {` w-full  sm:w-2/4 flex flex-col items-center sm:pl-2 mb-2 cursor-pointer`} onClick={()=>{navigation(rangeSelected)}}>
                        {<h2 className                                  = {`bg-orange-500 w-full rounded-sm  ${styles.sectionTitle}`}>Descrição do Range</h2>}
                        <div className                                  = {`border  ${styles.sectionRenderDescription} w-full h-full p-2 hover:bg-secondaryBg-100`} >
                
                                {rangeSelected && (
                                <div className                          = {`   text-gray-300 `}>
                                    <div>{rangeSelected.id}</div>
                                    <div>{rangeSelected.status}</div>
                                    <p>Selecione para +Info</p>
                                </div>
                                
                                )}
                                
                        </div>
                </div>
            </div>
            

            {/* Detalhes da Sessão */}
            <div  className                                             = {`w-full border mt-2 bg-gray-200 rounded-sm ${styles.boxShadow } p-2`}>
                <h5 className                                           = {`bg-orange-500 p-2 rounded-sm ${styles.boxShadow}`}>Visualizar Ranges de Áreas</h5>
                <div>
                    <div className                                      = "flex justify-between">
                        <h4>{rangeSelected && rangeSelected.nameRange}</h4>
                        
                        {ranges && (<button className                  = "botaoAdd" onClick={() => {removerRange(rangeSelected.id) }}>Excluir Range</button>)}
                    </div>
                    <div className                                      = {`mt-2 ${styles.boxShadow}`}>
                        <TabelaDescSection desc                         = {rangeSelected} />
                    </div>
                </div>

            </div>
        </div>
    ) 
}