import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import styles from "./Ranges.module.scss";

export default function Ranges(props) {

    const departamentoID = props.dep;
    const sessionObj = props.section.id;
    const rangeObj = props.range.id;

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

    const [area, setArea] = useState(0);
    const [areaId, setAreaId] = useState(area.id);
    const [areaSelected, setAreaSelected] = useState(null);

    function selectAreas(area){
        setArea(area);
        setAreaId(area.id);
    }

    const nomeRange = props.range.nameRange;
    return(
        <div className={styles.renderAreas}>
            <div >
                <h3>{nomeRange}</h3>
                
                {areas && areas.map((area) => (
                        
                    <div key={area.id} >
                        <button onClick={()=>{selectAreas(area)}} className={`${styles.renderButton} ${areaId === area.id  && styles.selected}`}>Área {area.nomeArea}</button>
                    </div>
                    ))}
                    <div>
                        <input type="number" />
                        <button className={styles.renderButton}>Adicionar Área</button>
                    </div>
            </div>
                    
                <div className={styles.info}>
                    {area && (<h2>{area.nomeArea} <span>{area.status}</span></h2>)}
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
                                                    <td>{produto.SKu}</td>
                                                    <td>{produto.nomeProduto}</td>
                                                    <td>{produto.qntProduto}</td>
                                                </tr>
                                                
                                                

                                            ))}

                                        

                                    </tbody>
                                </Table>
                        </div>
                    </div>
                    <div>
                        <button className={styles.renderButton}>+Info</button>
                    </div>
                </div>
        </div>
    ) 
}