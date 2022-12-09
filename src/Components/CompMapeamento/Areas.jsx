import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import { editAreaAction, getAreaAction, removeItemAction } from "../../services/actions/areaAction";
import { getAreaAcess } from "../../services/dataAcess/areaAcess";

export default function Areas(props) {

    const area = props.area
    const idDep = props.dep
    const idSection = props.section.id
    const idRange = props.range.id
    const idArea = props.area.id

    const [areas, setAreas] = useState([]);

    useEffect(() => {
            if(area){
                setAreas(area.produtos)
                console.log(area.produtos)
            }
    }, []);



    function editArea(){

        const area = {
            
            produtos: [
                {
                    SKu: '123',
                    nomeProduto: 'Produto 1',
                    qntProduto: 1,
                },
                {
                    SKu: '456',
                    nomeProduto: 'Produto 2',
                    qntProduto: 2,
                }
            ]
        }


        editAreaAction(idDep, idSection, idRange, idArea, area)
    }

    function criarProduto(){
        const produtos = {
            SKu: '9999',
            nomeProduto: 'cc',
            qntProduto: 56,
        }
        editAreaAction(idDep, idSection, idRange, idArea, produtos )
        
    }

     function AtualizaItem(){
        console.log(areas)
        const areaSelecionada = areas.filter((item) => item.SKu === '789456325412')
        console.log(areaSelecionada)
        
        
       
    }
   
    return(
        <div className="AreaMain">
            <h2>Area { area && area.nomeArea}</h2>
           
                <p>Produtos</p>
                
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Op.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas && areas.map((item, index) => (
                            <tr key={index}>
                                <td>{item.SKu}</td>
                                <td>{item.nomeProduto}</td>
                                <td>{item.qntProduto}</td>
                                <td><button onClick={()=>{removeItemAction(idDep, idSection, idRange, idArea, item)}}>Remover</button></td>
                            </tr>
                        ))}
                        
                        <tr>
                            <td><input type="num" placeholder="SKU 78922345672" /></td>
                            <td><input type="text" placeholder="Nome Produto" /></td>
                            <td><input type="num" placeholder="Quantidade" /></td>
                            <td><button onClick={()=>{AtualizaItem()}}>Adicionar Produto</button></td>
                        </tr>
                    </tbody> 
                </Table>
            
        </div>
    ) 
}