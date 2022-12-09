import { useState } from "react";
import Areas from "../Components/CompMapeamento/Areas";
import Departamentos from "../Components/CompMapeamento/departamentos";
import Ranges from "../Components/CompMapeamento/Ranges";
import Sessoes from "../Components/CompMapeamento/Sessoes";
import NavBar from "../Components/NavBar";
import SubNav from "../Components/SubNav";

export default function Mapeamento() {

    const [subMenu, setSubMenu] = useState('departamentos');
    const [navSubMenu, setNavSubMenu] = useState('');
    const [departamento, setdepartamento] = useState(null);
    const [session, setSession] = useState(null);
    const [range, setRange] = useState(null);
    const [area, setArea] = useState(null);
    

    function handleNavSub(subMenu){  
        setNavSubMenu(subMenu)
    }
    function handleSubMenu(subMenu) {
        setSubMenu(subMenu);  
    }
    function selecaoDepartamento(id){
        setdepartamento(id)

    }
    function selecaoSessao(obj){
        setSession(obj)

    }
    function selecaoRange(obj){
        setRange(obj)
        
    }
    function selecaoArea(obj){
        setArea(obj)
    }
    


    return (
        <div className="Painel">
            <NavBar selected='mapeamento' />
            

            <div className='MainPainel'>
                {/* SubNav e Descrição da Empresa */}
                <div className='topPainel'>
                    <SubNav submenu01='Departamentos'
                        submenu02='Sessoes'
                        submenu03='Ranges'
                        submenu04='Áreas'

                        subMenu={handleSubMenu} 
                        to={subMenu}/>
                        
                    {/* Descrição Empresa Contratante */}
                    <div className='DescEmp'>
                        <span>Nome Empresa Contratante</span>
                        <span>CNPJ: XXXXXXXXXXX</span>
                        <span>Data: xy/xy/xy</span>
                    </div>

                </div>

                {/* Área de Renderização Condiçional */}
                {subMenu === 'departamentos' && <Departamentos 
                    handleDep={selecaoDepartamento} 
                    sectionObj={selecaoSessao}
                    to={handleSubMenu}
                    />}

                {subMenu === 'Sessoes' && <Sessoes 
                    dep={departamento} 
                    section={session}
                    range={selecaoRange}
                    to={handleSubMenu}/>}

                {subMenu === 'Ranges' && <Ranges 
                    dep={departamento} 
                    section={session}
                    range={range}
                    area={selecaoArea}
                    to={handleSubMenu}/>}
                    

                {subMenu === 'Areas' && <Areas
                    dep={departamento}
                    section={session}
                    range={range}
                    area={area}
                    to={handleSubMenu}
                />}
                


            </div>

        </div>
    )
}