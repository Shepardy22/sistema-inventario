import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Areas from "../Components/CompMapeamento/Areas";
import Departamentos from "../Components/CompMapeamento/departamentos";
import Ranges from "../Components/CompMapeamento/Ranges";
import Sessoes from "../Components/CompMapeamento/Sessoes";
import NavBar from "../Components/NavBar";
import SubNav from "../Components/SubNav";

export default function Mapeamento() {

    const [subMenu, setSubMenu] = useState('departamentos');
    const [sessionSelected, setSessionSelected] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    function handleSubMenu(subMenu) {
        setSubMenu(subMenu);
    }

    function handleSetSection(id){
        setSessionSelected(id)  
    }

    function handleSectionID(id){
        setSessionId(id)
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

                        subMenu={handleSubMenu} />

                    {/* Descrição Empresa Contratante */}
                    <div className='DescEmp'>
                        <span>Nome Empresa Contratante</span>
                        <span>CNPJ: XXXXXXXXXXX</span>
                        <span>Data: xy/xy/xy</span>
                    </div>

                </div>

                {/* Área de Renderização Condiçional */}
                {subMenu === 'departamentos' && <Departamentos handle={handleSetSection} sectionId={handleSectionID}/>}
                {subMenu === 'Sessoes' && <Sessoes sessionS={sessionSelected}  sessionID={sessionId}/>}
                {subMenu === 'Ranges' && <Ranges />}
                {subMenu === 'Áreas' && <Areas />}
                


            </div>

        </div>
    )
}