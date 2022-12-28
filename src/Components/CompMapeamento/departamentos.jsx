import { useEffect, useState } from "react"
import TabelaDescDep from "../Tabelas/TabelaDescDep";

import { FireService } from "../../services/FireService";
import MapControl from "../../services/MapControl";

export default function Departamentos(props) {
    const mapControl = MapControl();
    const fireService                                         = new FireService();
    
    const [departamentsList, setDepartamentsList]             = useState([]);
    const [departamentSelected, setDepartamentSelected]       = useState({});
    const [sectionsList, setSectionsList]                     = useState([]);
    const [sectionSelected, setSectionSelected]               = useState({})

    //inputs
    const [nameDepartament, setNameDepartament]               = useState('');
    const [nameSection, setNameSection]                       = useState('');

    const depID                                               = departamentSelected.id;
    const descriptions                                        = descriptionDepartament();

    
    
                                    
    async function loading(){
        const departamentsList                                = await fireService.getDepartamentsList();
        setDepartamentsList(departamentsList);
    }
    
    useEffect(() => { 
        loading();
    }, []);

    function selectDepartament(idDepartament) {
        function findDepartament(){
            const departamentSelected                         = departamentsList.find((departament) => departament.id === idDepartament)
            console.log(`Departamento Selecionado: ${departamentSelected.name}`,departamentSelected)
            setDepartamentSelected(departamentSelected);
            mapControl.setDepartament(departamentSelected);
            
        } 
        async function SectionsList(){
            const sectionsList                                = await fireService.getSectionsList(idDepartament);
            setSectionsList(sectionsList);
        }
        findDepartament()
        SectionsList();
    }

    function selectSection(id) {
        const section                                         = sectionsList.find((section) => section.id === id);
        setSectionSelected(section);
        mapControl.setSection(section);
        console.log(`Sessão Selecionada: ${section.sectionName}` ,section)
    }

    function addDepartamento() {
        const body = {
            name: nameDepartament,
            description: 'Descrição do Departamento',
            status: 'Ativo'
        }
       fireService.addDepartament(body) 
       loading();
       setNameDepartament('');   
    }
    function deleteDepartament(id) {
        fireService.deleteDepartament(id);
        console.log(`Departamento deletado: ${departamentSelected.name}`)
        loading();
    }
    function addSection(){
        const id                                              = departamentSelected.id;
        const body = {
            sectionName: nameSection,
            status: 'Ativo'
        }
        fireService.addSection(id, body);
        const sectionsList                                    = fireService.getSectionsList(id);
        setSectionsList(sectionsList);
        setNameSection('');
    }
    function removeSection(){
        const idDepartament                                   = departamentSelected.id;
        const idSection                                       = sectionSelected.id;
        fireService.deleteSection(idDepartament, idSection);
    }
    function descriptionDepartament(){
        const idDepartament                                   = departamentSelected.id;
        const nameDepartament                                 = departamentSelected.name;
        const descriptionDepartament                          = departamentSelected.description;
        const statusDepartament                               = departamentSelected.status;
        
        return {
            idDepartament,
            nameDepartament,
            descriptionDepartament,
            statusDepartament
        }
        

    }
    

    return (
        <div className                                        = "bg-white ">
            <div className                                    = " flex flex-col sm:flex-row  ">
                {/* Listagem dos Departamentos e inputs */}
                <div className                                = "border flex flex-col w-full sm:w-2/4 m-1 rounded-sm depList shadow-white">
                    
                    <div>
                        <div className                        = "text-lg flex justify-between px-2 bg-orange-500  ">
                                    <span className           = " font-bold text-gray-800">
                                        Departamentos
                                    </span>
                                    <span className           = " font-bold text-gray-800">
                                        QntSessoes
                                    </span>
                                    <span className           = " font-bold text-gray-800">
                                        Status
                                    </span>
                        </div>

                        <div className                        = "bg-secondaryBg-100 ">
                            {departamentsList && departamentsList.map((departament) => (      
                            <div key                          = {departament.id}
                                    className                 = {`bg-secondaryBg-100  flex justify-between px-2 ${departament.id === depID && 'border'}`} >
                                    <div className            = " ">
                                        <button className     = {` h-12 m-1 px-2 rounded-md  border renderDesc text-gray-300 hover:text-orange-500  ${departament.id === depID && 'selected '}`}
                                            onClick           = {() => { selectDepartament(departament.id)}}>
                                            {departament.name}
                                        </button>
                                    </div>
                                    
                                    <div className            = {` h-12  text-gray-400 flex items-center pl-8`} >
                                        {departament.qntSessoes}
                                    </div>
                                    
                                    
                                    <div className            = {` h-12  text-gray-400 flex items-center  `}>
                                        {departament.status}
                                    </div> 
                                    
                            </div>
                        ))}
                        </div>                                
                    </div>

                    <div className                            = "bg-primaryBg-100 p-2">
                        <h3 className                         = "text-lg text-gray-400">Adicionar Departamento</h3>
                        <input
                            className                         = "" 
                            type                           = "text"
                            placeholder                       = "Nome do Departamento"
                            value                             = {nameDepartament}
                            onChange                          = {(e) => setNameDepartament(e.target.value)}
                        />
                        <button className                     = "border p-1 text-gray-300 ml-2" onClick={addDepartamento}>Adicionar</button>
                        
                    </div>

                </div>

                {/* Sessões do Departamento */}           
                <div className                                = "border w-full   sm:w-2/4 m-1 rounded-sm depList bg-orange-500">
                    
                    <h2 className                             = "text-lg  ml-4 font-bold text-gray-800 ">Sessões</h2>

                    <div className                            = "flex bg-secondaryBg-100  h-3/4 	">
                        {/* Listagem das Sessões */}
                        <div className                        = " w-1/3 overflow-y-auto">
                            {   sectionsList.length > 0  ? sectionsList.map((section) => (
                                <div key                      = {section.id}>
                                    <button onClick           = {() => {selectSection(section.id)}}
                                        className             = {`text-gray-300 border rounded-sm p-2 hover:text-orange-500 m-1 renderDesc`}>
                                            {section.sectionName}
                                    </button>
                                </div>)) : (<p className                  = "text-gray-400 p-2">Selecione um Departamento</p>)}
                        </div>
                        {/* Resumo das Sessão */}
                        <div className                        = "text-white border flex flex-col justify-center mx-auto items-center w-2/3  " >
                            Descrição do Departamento
                            <p className                      = "flex flex-col items-center">
                                <span>{departamentSelected.name}</span>
                                <span>qnt Produtos: {departamentSelected.qntProdutos}</span>
                                <span>{sectionSelected.id && <span>Sessao descriçao</span>}</span>
                                <span>{sectionSelected && sectionSelected.sectionName}</span>
                                <span>{sectionSelected && sectionSelected.qntProdutos}</span>
                                 
                            </p>
                            <div>
                                    <button className="border p-2 text-gray-300 ml-2"
                                    onClick={()=>{}}>
                                        +Info
                                    </button>
                                 </div>
                        </div>
                    </div>
                    
                    {/* Adicionar Sessão */}
                    <div className                            = "bg-primaryBg-100 p-2 flex">
                        <input type                           = "text"
                                placeholder                   = "Nome da Sessão"
                                value                         = {nameSection}
                                onChange                      = {(e) => setNameSection(e.target.value)}
                            />
                        <button onClick                       = {()=>{addSection()}} className="border p-1 text-gray-300 ml-2">
                            Adicionar Sessão
                        </button>
                        <button onClick                       = {()=>{removeSection()}} className="border p-1 text-gray-300 ml-2">
                            Excluir Sessão
                        </button>
                        
                    </div>

                </div>

            </div>

            {/* Descrição do Departamento */}
            <div className                                    = "border rounded-sm m-1  bg-orange-500 renderDesc">
                <h4 className                                 = "ml-2 ">Descrição Departamentos</h4>

                <div className                                = " ">
                    <div className                            = "flex justify-between ml-2">

                        <h4>{departamentSelected.name}</h4>
                        {departamentSelected && (<button className   = "botaoAdd"
                            onClick                           = {() => { deleteDepartament(departamentSelected.id) }}>
                                Excluir Departamento
                        </button>)}
                    </div>

                    <div className                            = "">
                        
                        <TabelaDescDep desc                   = {departamentSelected} />
                        
                    </div>
                </div>

            </div>
        </div>

    )
}