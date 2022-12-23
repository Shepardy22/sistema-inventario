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
    

    function handleListCache(){
        const departament = mapControl.getDepartament();
        const session = mapControl.getSection();
        const range = mapControl.getRange();
        const area = mapControl.getArea();

        return {
            departament,
            session,
            range,
            area
        }
    }

    const selectControl = handleListCache();

    //SubMenu Navbar Handler
    const [subMenu, setSubMenu]             = useState('departamentos');

    function handleSubMenu(subMenu) {
        setSubMenu(subMenu);  
    }



    return (
        <div className                      = "">
            <NavBar selected                = 'mapeamento' />
            

            <div className                  = 'MainPainel '>
                
                <div className              = 'topPainel'>
                    <SubNav 
                        submenu01       = 'Departamentos'
                        submenu02           = 'Sessoes'
                        submenu03           = 'Ranges'
                        submenu04           = 'Áreas'

                        subMenu             = {handleSubMenu}
                        to                  = {subMenu}
                    />
                </div>

                {/* Área de Renderização Condiçional */}
                <div className="">
                    {subMenu === 'departamentos' && <Departamentos/>}
                    {subMenu === 'Sessoes' && <Sessoes handleSubMenu = {handleSubMenu}/>}
                    {subMenu === 'Ranges' && <Ranges to = {handleSubMenu}/>}
                    {subMenu === 'Areas' && <Areas to = {handleSubMenu}/>}
                </div>

            </div>

        </div>
    )
}