import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaAlignCenter, FaAngleDoubleLeft, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { db } from "../../firebaseConfig";
import { editAreaAction, getAreaAction, updateItemAction } from "../../services/actions/areaAction";
import { getAreaAcess } from "../../services/dataAcess/areaAcess";

import styles from "./Areas.module.css";
export default function Areas(props) {

    
    const idDep = props.dep
    const idSection = props.section.id
    const idRange = props.range.id
    const idArea = props.area.id
    const area = props.area

    const [produtos, setProdutos] = useState([]);
    const [sku, setsku] = useState(0);
    const [nomeProduto, setNomeProduto] = useState('');
    const [qntProduto, setQntProduto] = useState(0);

    useEffect(() => {
            if(area){
                setProdutos(area.produtos) 
            }
            
            

            
    }, [area]);

    function criarProduto(){
        
        const qntConvertida = parseInt(qntProduto)
        console.log(typeof(qntConvertida))
        const produtos = {
            sku: sku,
            nomeProduto: nomeProduto,
            qntProduto: qntConvertida,
        }
        editAreaAction(idDep, idSection, idRange, idArea, produtos )
        setsku(0)
        setNomeProduto('')
        setQntProduto(0) 

    }

    function selectProdutos(sku){

        const areaSelecionada = produtos.find((item) => item.sku === sku)
        
        setsku(areaSelecionada.sku)
        setNomeProduto(areaSelecionada.nomeProduto)
        setQntProduto(areaSelecionada.qntProduto)
        
    }

     function AtualizaItem(){
        
        const produtos = area.produtos;
        console.log(produtos)
        const areaSelecionada = area.produtos.find((item) => item.sku === sku);
        

        areaSelecionada.sku = sku;
        areaSelecionada.nomeProduto = nomeProduto;
        areaSelecionada.qntProduto = qntProduto;
        
        updateItemAction(idDep, idSection, idRange, idArea, produtos)
        setProdutos(produtos)
        setsku(0)
        setNomeProduto('')
        setQntProduto(0)
        
    }

    function removeArea(sku){
        
        const areaSelecionada = produtos.findIndex((item) => item.sku === sku)
        produtos.splice(areaSelecionada, 1)
        setProdutos(produtos)
        setsku('')
        setNomeProduto('')
        setQntProduto('')
        updateItemAction(idDep, idSection, idRange, idArea, produtos)
    
    }
   
    return(
        <div className="flex flex-col  ">
            <div className={`bg-orange-500 ${styles.boxShadow} `} >
                <h2>Area { area && area.nomeArea}</h2>
                <h3>Produtos</h3>
            </div>
                
            
                    <div className="">
                        <Table striped bordered hover variant="dark" responsive="sm"  >
                            <thead>
                                <tr>
                                    <th className="">sku</th>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Op.</th>
                                </tr>
                            </thead>
                            <tbody className=" " >
                            <tr>
                                    <td className=""> <input  onChange={e => {setsku(e.target.value)}} type="number" value={sku} placeholder="Codigo de Barras" /></td>
                                    <td><input onChange={e => {setNomeProduto(e.target.value)}} value={nomeProduto} type="text" placeholder="Nome Produto" /></td>
                                    <td><input onChange={e => {setQntProduto(e.target.value)}} value={qntProduto} type="Number" placeholder="Quantidade" /></td>
                                    <td className=""><button onClick={()=>{criarProduto()}}><span className="flex"><FaAngleDoubleLeft className="my-auto mr-1 text-orange-500"/> Adicionar Produto</span></button>
                                        <button onClick={()=>{AtualizaItem()}}><span className="flex ml-4"><FaAlignCenter className="my-auto mr-1 text-orange-500 "/> Atualizar</span></button>
                                    </td>
                                </tr>
                                {produtos && produtos.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.sku}</td>
                                        <td>{item.nomeProduto}</td>
                                        <td>{item.qntProduto}</td>
                                            <td className="flex gap-4 ">
                                                <button onClick={()=>{removeArea(item.sku)}}><span className="flex"><FaTrashAlt className="my-auto mr-1 text-orange-500"/> Remover</span></button>
                                                <button onClick={()=>{selectProdutos(item.sku)}}><span className="flex"><FaPencilAlt className="my-auto mr-1 text-orange-500"/> Editar</span></button>
                                            </td>
                                    </tr>
                                ))}
                        
                        
                            </tbody>
                        </Table>
                    </div>
            </div>
            
        
    ) 
}