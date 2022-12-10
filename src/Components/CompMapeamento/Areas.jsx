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

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
            if(area){
                setProdutos(area.produtos)
                
            }
    }, [area]);


    const [sku, setsku] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [qntProduto, setQntProduto] = useState(0);

    

    function criarProduto(){
        const produtos = {
            sku: sku,
            nomeProduto: nomeProduto,
            qntProduto: qntProduto,
        }
        editAreaAction(idDep, idSection, idRange, idArea, produtos )
        setsku('')
        setNomeProduto('')
        setQntProduto('')
        
    }

    function selectProdutos(sku){
        
        
        const areaSelecionada = produtos.find((item) => item.sku === sku)
        
        setsku(areaSelecionada.sku)
        setNomeProduto(areaSelecionada.nomeProduto)
        setQntProduto(areaSelecionada.qntProduto)

    }

     function AtualizaItem(){
        
        const produtos = area.produtos;
        const areaSelecionada = area.produtos.find((item) => item.sku === sku);

        areaSelecionada.sku = sku;
        areaSelecionada.nomeProduto = nomeProduto;
        areaSelecionada.qntProduto = qntProduto;

       
        removeItemAction(idDep, idSection, idRange, idArea, produtos)
        setProdutos(area.produtos)
        setsku('')
        setNomeProduto('')
        setQntProduto('')
       
    }
    function removeArea(sku){
        
        const areaSelecionada = produtos.findIndex((item) => item.sku === sku)
        produtos.splice(areaSelecionada, 1)
        setProdutos(produtos)
        setsku('')
        setNomeProduto('')
        setQntProduto('')
        removeItemAction(idDep, idSection, idRange, idArea, produtos)
    
    }
   
    return(
        <div className="AreaMain">
            <h2>Area { area && area.nomeArea}</h2>
            
                <p>Produtos</p>
                
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>sku</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Op.</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td><input onChange={e => {setsku(e.target.value)}} value={sku} type="num" placeholder="Codigo de Barras" /></td>
                            <td><input onChange={e => {setNomeProduto(e.target.value)}} value={nomeProduto} type="text" placeholder="Nome Produto" /></td>
                            <td><input onChange={e => {setQntProduto(e.target.value)}} value={qntProduto} type="num" placeholder="Quantidade" /></td>
                            <td><button onClick={()=>{criarProduto()}}>Adicionar Produto</button>
                                <button onClick={()=>{AtualizaItem()}}>Atualizar</button>
                            </td>
                        </tr>
                        {produtos && produtos.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sku}</td>
                                <td>{item.nomeProduto}</td>
                                <td>{item.qntProduto}</td>
                                <td>
                                    <button onClick={()=>{removeArea(item.sku)}}>Remover</button>
                                    <button onClick={()=>{selectProdutos(item.sku)}}>Editar</button>
                                    </td>
                            </tr>
                        ))}
                        
                        
                    </tbody> 
                </Table>
            
        </div>
    ) 
}