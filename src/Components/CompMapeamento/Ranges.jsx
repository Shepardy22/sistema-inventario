import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import { removeAreaAction } from "../../services/actions/rangeAction";
import { addAreasAcess } from "../../services/dataAcess/RangeAcess";
import styles from "./Ranges.module.scss";

export default function Ranges(props) {

    const departamentoID = props.dep;
    const sessionObj = props.section.id;
    const rangeObj = props.range.id;
    const areaObj = props.area;

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        
        const unsubscribe = onSnapshot(collection(db,'Departamentos', `${departamentoID}`, 
        'Sessoes', `${sessionObj}`,
         'Ranges', `${rangeObj}`, 'Areas'),
         (snapshot) => {
            setAreas(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        
        return unsubscribe
    }, []);

    const [area, setArea] = useState('');
    const [areaId, setAreaId] = useState(area.id);
    const [areaSelected, setAreaSelected] = useState(null);
    const [areaNameCreate, setAreaNameCreate] = useState('');

    function selectAreas(area){
        setArea(area);
        setAreaId(area.id);
        areaObj(area);
    }
    function addArea(){
      
        const body = {
            nomeArea: areaNameCreate,
            status: 'Mapeado',
            produtos: [
                {
                    SKu: '',
                    nomeProduto: '',
                    qntProduto: 0,
                }
            ]
        }
        setAreaNameCreate('');
        addAreasAcess(departamentoID, sessionObj, rangeObj, body)
        
    }
    function removeArea(){
        const idDep = departamentoID;
        const idSection = sessionObj;
        const idRange = rangeObj;
        const idArea = areaId;
        removeAreaAction(idDep, idSection, idRange, idArea);
    }
    const to = props.to;
    function navigateTo(){
        to("Areas")
    }

    const nomeRange = props.range.nameRange;
    return(
        <div className={styles.renderAreas}>
            <div >
                <h3>{nomeRange && nomeRange}</h3>
                
                {areas && areas.map((area) => (
                        
                    <div key={area.id} >
                        <button onClick={()=>{selectAreas(area)}} className={`${styles.renderButton} ${areaId === area.id  && styles.selected}`}>Área {area.nomeArea}</button>
                    </div>
                    ))}
                    <div>
                        <input value={areaNameCreate} type="number" onChange={ (e)=>{setAreaNameCreate(e.target.value)}} />
                        <button onClick={()=>{addArea()}} className={styles.renderButton}>Adicionar Área</button>
                    </div>
            </div>
                    
                <div className={styles.info}>
                    {area && (<h2>{area && area.nomeArea} <span>{area && area.status}</span></h2>)}
                    <h2>Produtos</h2>
                    <div className={styles.renderProdutos}>
                        <div>
                            
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>SKU</th>
                                            <th>Nome</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {area && area.produtos.map((produto) =>  (  
                                            <tr key={produto.id}>
                                                <td key={produto.id}>{produto.SKu}</td>
                                                <td key={produto.id}>{produto.nomeProduto}</td>
                                                <td key={produto.id}>{produto.qntProduto}</td>
                                            </tr>
                                            ))}
                                    </tbody>
                                </Table>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>{navigateTo()}} className={styles.renderButton}>+Info</button>
                        <button onClick={()=>{removeArea()}} className={styles.renderButton}>Deletar</button>
                    </div>
                </div>
        </div>
    ) 
}