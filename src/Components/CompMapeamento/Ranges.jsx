import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import { updateItemAction } from "../../services/actions/areaAction";
import { removeAreaAction, updateQntAction } from "../../services/actions/rangeAction";
import { addAreasAcess } from "../../services/dataAcess/RangeAcess";
import styles from "./Ranges.module.scss";

export default function Ranges(props) {

    const departamentoID                                            = props.dep;
    const sessionObj                                                = props.section.id;
    const rangeObj                                                  = props.range.id;
    const areaObj                                                   = props.area;

    const [areas, setAreas]                                         = useState([]);
    const [area, setArea]                                           = useState('');
    const [areaId, setAreaId]                                       = useState(area.id);
    const [areaSelected, setAreaSelected]                           = useState(null);
    const [areaNameCreate, setAreaNameCreate]                       = useState('');
    const [qntItens, setQntItens]                                   = useState(0);
    const [somaAreas, setSomaAreas]                                 = useState(0);
    const to                                                        = props.to;

    useEffect(() => {
        
        const unsubscribe                                           = onSnapshot(collection(db,'Departamentos', `${departamentoID}`,
        'Sessoes', `${sessionObj}`,
         'Ranges', `${rangeObj}`, 'Areas'),
         (snapshot) => {
            setAreas(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        
        return unsubscribe
    }, []);

    

    useEffect(() => {   
        if(area){
            somaItemsArea(area.produtos);
            
        }
    }, [area]);

    function somaItemsArea(area){
        
        let qntItens                                                = [];
        for (let i = 0; i < area.length; i++) {
            
            qntItens.push(area[i].qntProduto);
        }
       
        const soma                                                  = qntItens.reduce((a, b) => a + b, 0);
        setQntItens(soma);
        
        
    }

    function somaItensRange(){
            
            let qntAreas                                                = [];
            for (let i = 0; i < areas.length; i++) {
                
                qntAreas.push(areas[i].qntItens);
            }
        
            const soma                                                  = qntAreas.reduce((a, b) => a + b, 0);
            setSomaAreas(soma);
            console.log(somaAreas);
            
            
    }

    function atualizaQuantidades(qnt){
        const idDep                                                 = departamentoID;
        const idSection                                             = sessionObj;
        const idRange                                               = rangeObj;
        const idArea                                                = areaId;
        
        const itens                                                 = qnt;
        updateQntAction(idDep, idSection, idRange, idArea, itens);
    }
    function selectAreas(area){
        
        if(area.qntItens < qntItens){
            atualizaQuantidades(qntItens);
            setSomaAreas(somaAreas);
        }
        setArea(area);
        setAreaId(area.id);
        areaObj(area);
    }
    function addArea(){
      
        const body = {
            nomeArea                                                : areaNameCreate,
            status                                                  : 'Mapeado',
            produtos: [
                {
                    
                }
            ]
        }
        setAreaNameCreate('');
        addAreasAcess(departamentoID, sessionObj, rangeObj, body)
        
    }
    function removeArea(){
        const idDep                                                 = departamentoID;
        const idSection                                             = sessionObj;
        const idRange                                               = rangeObj;
        const idArea                                                = areaId;
        removeAreaAction(idDep, idSection, idRange, idArea);
    }
    function navigateTo(){
        to("Areas")
    }

    

    const nomeRange                                                 = props.range.nameRange;

    return(
        <div className                                              = {`flex flex-col sm:flex-row border p-2  ${styles.boxShadow}`}>
            {/*Areas*/} 
            <div className                                          = {`bg-primaryBg-100 w-full sm:w-1/2 mr-2  ${styles.boxShadow}`}>
                <div className                                      = {`bg-orange-500  p-2    ${styles.boxShadow} flex justify-between `}>
                    <span>{nomeRange && nomeRange}</span>
                       <span>Produtos</span> 
                       <span className                              = "mr-2">Itens</span>
                    
                </div>
                
                {areas && areas.map((area) => (  
                    <div key                                        = {area.id}
                    className                                       = {` border m-1 flex justify-between text-orange-500 `}>
                        <button onClick                             = {()=>{selectAreas(area)}} className={`bg-gray-300 ${styles.renderButton} ${areaId === area.id  && `${styles.selected} `} `}>Área {area.nomeArea}</button>
                        <span>{area && area.produtos.length}</span>
                        <span className                             = "mr-2">{area.qntItens}</span>
                        
                    </div>
                    ))}
                    <div className                                  = "bg-secondaryBg-100 flex items-center ml-2">
                        <input value                                = {areaNameCreate} type="number" onChange={ (e)=>{setAreaNameCreate(e.target.value)}}
                        className                                   = {`text-primaryBg-100 bg-gray-300 `} />
                        <button onClick                             = {()=>{addArea()}} className={`bg-gray-300 ${styles.renderButton} ${areaId === area.id  && `text-orange-500 `}`}>Adicionar Área</button>
                    </div>
                    <div className                                  = "text-orange-500 flex items-center gap-4">
                        <span>{somaAreas}</span>
                        <button onClick={()=>{somaItensRange()}}>SOma</button>
                    </div>
                    
            </div>
                    {/*Items*/}    
            <div className                                          = {`w-full sm:w-1/2 ${styles.info} ${styles.boxShadow}`}>
                    {area && (
                        <div className                              = {`bg-orange-500 w-full flex justify-between p-2 rounded-md ${styles.boxShadow}`}>
                            <div className                          = "w-full flex justify-between">
                                <h4>Área {area && area.nomeArea}</h4>
                                <h4> Status                         : {area && area.status}</h4>
                            </div>
                        </div>
                    )}
                    <h2 className                                   = "m-2">Produtos</h2>
                    <div className                                  = {`w-full`}>
                        
                            <Table striped bordered hover variant   = "dark">
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {area ? area.produtos.map((produto, index) =>(  
                                            <tr key                 = {index}>
                                                <td>{produto.sku}</td>
                                                <td>{produto.nomeProduto}</td>
                                                <td>{produto.qntProduto}</td>
                                            </tr>)) : 
                                            <tr>
                                                <td colSpan         = "3">Nenhuma área selecionada</td>
                                            </tr>}
                                    </tbody>
                                </Table>
                        
                    </div>
                    <div className                                  = "w-full flex justify-between ">
                        <button onClick                             = {()=>{navigateTo()}} className={`bg-orange-500  ${styles.renderButton}`}>+Info</button>
                        <button onClick                             = {()=>{removeArea()}} className={`bg-gray-800 text-white ${styles.renderButton}`}>Deletar</button>
                    </div>
            </div>
        </div>
    ) 
}