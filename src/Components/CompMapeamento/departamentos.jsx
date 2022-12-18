import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebaseConfig";
import { addDepAction, addSectionAction, getDepAction, setDepAction, updateDepAction } from "../../services/actions/depActions";

import { Row } from 'react-bootstrap';
import TabelaDescDep from "../Tabelas/TabelaDescDep";
import departamentos from "./departamento.scss";
import { DepartamentoService } from "./DepartamentoService";
import { SectionService } from "./SectionService";

import DeptoObserver from "./DepartamentoService";
import { async } from "@firebase/util";


export default function Departamentos(props) {

    const handle                                            = props.handleDep;
    const sectionObj                                        = props.sectionObj;
    const handleSubMenu                                     = props.handleSubMenu;

    const [IdDepSelecionado, setIdDepSelecionado]           = useState(null);

    const [name, setName]                                   = useState('');
    const [nameSection, setNameSection]                     = useState('');
    const [descricao, setDescricao]                         = useState('');
    const [sectionList, setSectionList]                     = useState([]);
    const [departamentos, setDepartamentos]                 = useState([]);

    const depService                                        = new DepartamentoService();
    const sectionService                                    = new SectionService();


    useEffect(() => {
        handleListDepartamentos();
     }, []);

   async function handleListDepartamentos() {
        const dep                                           = await depService.getDepartamentos();
        setDepartamentos(dep);
        //console.log('Departamentos: ', dep);
    }

    async function handleListSessoes(id) {
        const sessoes                                       = await sectionService.getSessoes(id);
        setSectionList(sessoes);
        //console.log('Sessoes: ', section);
    }


    function addDepartamento() {
        depService.adicionarDepartamento(name)
        handleListDepartamentos();
        setName('');    
    }

    function deleteDepartamento(id) {
        depService.removerDepartamento(id);
    }

    function addSessao(){
        const id                                            = IdDepSelecionado;
        sectionService.adicionarSessao(id, nameSection);
        setNameSection('');
        handleListSessoes(id);
    }

    function deleteSessao(id){
        sectionService.removerSessao(id);
    }

    function exibirDescricao(id) {
        const dep                                           = departamentos.find(dep => dep.id === id);
        setIdDepSelecionado(id);
        handleListSessoes(id);
        handle(id);
        setDescricao(dep);  
    }

    function selecaoSessao(id) {
        const session                                       = sectionList.find(session => session.id === id);
        sectionObj(session);
        handleSubMenu("Sessoes")
    }

    return (
        <div className                                      = "bg-white ">
            <div className                                  = " flex flex-col sm:flex-row  ">
                {/* Listagem dos Departamentos */}
                <div className                              = "border flex flex-col w-full sm:w-2/4 m-1 rounded-sm depList shadow-white">
                    <div className                          = {``}>

                                <div className              = "text-lg flex justify-between px-2 bg-orange-500  ">
                                    <span className         = " font-bold text-gray-800">Departamentos</span>
                                    <span className         = " font-bold text-gray-800">QntSessoes</span>
                                    <span className         = " font-bold text-gray-800">Status</span>
                                </div>

                        <div className                      = "bg-secondaryBg-100 ">
                                {departamentos && departamentos.map((departamento) => (      
                            
                                <div key                    = {departamento.id}
                                    className               = {`bg-secondaryBg-100  flex justify-between px-2 ${IdDepSelecionado === departamento.id && '  border '}`} >
                                    <div className          = " ">
                                        <button className   = {` h-12 m-1 px-2 rounded-md  border renderDesc text-gray-300 hover:text-orange-500  ${IdDepSelecionado === departamento.id && 'selected '}`} onClick={() => { exibirDescricao(departamento.id) }}>
                                            {departamento.name}
                                        </button>
                                    </div>
                                    <div className          = "">
                                        <div className      = {` h-12  text-gray-400 flex items-center pl-8`} onClick={() => { exibirDescricao(departamento.id) }}>
                                            {departamento.qntSessoes}
                                        </div>
                                    </div>
                                    <div className          = "">
                                        <div className      = {` h-12  text-gray-400 flex items-center  `} onClick={() => { exibirDescricao(departamento.id) }}>
                                            {departamento.status}
                                        </div> 
                                    </div>
                                </div>
                        ))}
                               
                            
                        </div>                                
                    </div>
                    {/* Adicionar Departamento */}
                    <div className                          = "bg-primaryBg-100">
                        <h3 className                       = "text-lg text-gray-400">Adicionar Departamento</h3>
                        <input type                         = "text"
                            placeholder                     = "Nome do Departamento"
                            value                           = {name}
                            onChange                        = {(e) => setName(e.target.value)}
                        />
                        <button className                   = "botaoAdd" onClick={addDepartamento}>Adicionar</button>
                        {/* <button className                   = "botaoAdd" onClick={()=>{}}>Setar</button> */}
                    </div>
                </div>

                {/* Sessões do Departamento */}           
                <div className                              = "border w-full   sm:w-2/4 m-1 rounded-sm depList bg-orange-500">
                    <h2 className                           = "text-lg  ml-4 font-bold text-gray-800 ">Sessões</h2>

                    <div className                          = "flex bg-secondaryBg-100  h-3/4 	">
                        <div className                      = " w-1/3 overflow-y-auto">
                            {   sectionList.length > 0  ? sectionList.map((section) => (
                                <div key                    = {section.id}>
                                    <button onClick         = {() => {selecaoSessao(section.id)}} className={`text-gray-300 border rounded-sm p-2 hover:text-orange-500 m-1 renderDesc`}>{section.sectionName}</button>
                                </div>
                            ))                              : (
                            <p className                    = "text-gray-400 p-2">Selecione um Departamento</p>)}
                        </div>
                        <div className                      = "text-white border flex flex-col justify-center mx-auto items-center w-2/3  " >
                            Descrição de Inventário
                            <p className                    = "flex flex-col items-center">
                                <span>Quantidade de Produtos</span>
                                <span>{descricao && descricao.qntProdutos}</span>
                                <span>{descricao && descricao.name}</span>
                            </p>
                        </div>
                    </div>
                    
                    
                    <div className                          = "bg-primaryBg-100">
                        <input type                         = "text"
                                placeholder                 = "Nome da Sessão"
                                value                       = {nameSection}
                                onChange                    = {(e) => setNameSection(e.target.value)}
                            />
                        <button onClick                     = {()=>{addSessao()}} className="Sessoes addSection">Adicionar Sessão</button>
                        
                    </div>
                </div>

            </div>

            {/* Descrição do Departamento */}
            <div className                                  = "border rounded-sm m-1  bg-orange-500 renderDesc">
                <h4 className                               = "ml-2 ">Descrição Departamentos</h4>

                <div className                              = " ">
                    <div className                          = "flex justify-between ml-2">
                        <h4>{descricao.name}</h4>
                        {descricao && (<button className    = "botaoAdd" onClick={() => { deleteDepartamento(descricao.id) }}>Excluir Departamento</button>)}
                    </div>
                    <div className                          = "">
                        
                            <TabelaDescDep desc             = {descricao} />
                        
                    </div>
                </div>

            </div>
        </div>

    )
}