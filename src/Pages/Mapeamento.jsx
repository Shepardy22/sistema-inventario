import { useEffect } from "react";
import { useState } from "react";
import Areas from "../Components/CompMapeamento/Areas";
import Departamentos from "../Components/CompMapeamento/departamentos";
import { DepartamentService } from "../Components/CompMapeamento/DepartamentService";
import Ranges from "../Components/CompMapeamento/Ranges";
import Sessoes from "../Components/CompMapeamento/Sessoes";
import NavBar from "../Components/NavBar";
import SubNav from "../Components/SubNav";

import MapControl from "../services/MapControl";





export default function Mapeamento() {

    const mapControl = MapControl();
    
    
    const [departamento, setdepartamento]   = useState(mapControl.getDepartamento());
    const [session, setSession]             = useState(null);
    const [range, setRange]                 = useState(null);
    const [area, setArea]                   = useState(null);

    //SubMenu Navbar Handler
    const [subMenu, setSubMenu]             = useState('departamentos');

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
        <div className                      = "">
            <NavBar selected                = 'mapeamento' />
            

            <div className                  = 'MainPainel '>
                
                <div className              = 'topPainel'>
                    <SubNav submenu01       = 'Departamentos'
                        submenu02           = 'Sessoes'
                        submenu03           = 'Ranges'
                        submenu04           = 'Áreas'

                        subMenu             = {handleSubMenu}
                        to                  = {subMenu}/>
                        
                    
                    
                    

                </div>

                {/* Área de Renderização Condiçional */}
                <div className="">
                    {subMenu === 'departamentos' && <Departamentos
                        handleDep               = {selecaoDepartamento}
                        sectionObj              = {selecaoSessao}
                        handleSubMenu           = {handleSubMenu}
                        />}
                    {subMenu === 'Sessoes' && <Sessoes
                        dep                     = {departamento}
                        section                 = {session}
                        range                   = {selecaoRange}
                        handleSubMenu           = {handleSubMenu}/>}
                    {subMenu === 'Ranges' && <Ranges
                        dep                     = {departamento}
                        section                 = {session}
                        range                   = {range}
                        area                    = {selecaoArea}
                        to                      = {handleSubMenu}/>}
                    
                    {subMenu === 'Areas' && <Areas
                        dep                     = {departamento}
                        section                 = {session}
                        range                   = {range}
                        area                    = {area}
                        to                      = {handleSubMenu}
                    />}
                    
                </div>


            </div>

        </div>
    )
}