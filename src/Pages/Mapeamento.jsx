import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Areas from "../Components/CompMapeamento/Areas";
import Departamentos from "../Components/CompMapeamento/departamentos";
import Ranges from "../Components/CompMapeamento/Ranges";
import NavBar from "../Components/NavBar";
import SubNav from "../Components/SubNav";

export default function Mapeamento() {

    const [subMenu, setSubMenu] = useState('departamentos');

    function handleSubMenu(subMenu) {
        setSubMenu(subMenu);
    }

    return (
        <div className="Painel">
            <NavBar selected='mapeamento' />
            

            <div className='MainPainel'>
                {/* SubNav e Descrição da Empresa */}
                <div className='topPainel'>
                    <SubNav submenu01='departamentos'
                        submenu02='Ranges'
                        submenu03='Áreas'

                        subMenu={handleSubMenu} />

                    {/* Descrição Empresa Contratante */}
                    <div className='DescEmp'>
                        <span>Nome Empresa Contratante</span>
                        <span>CNPJ: XXXXXXXXXXX</span>
                        <span>Data: xy/xy/xy</span>
                    </div>

                </div>

                {/* Área de Renderização Condiçional */}
                {subMenu === 'departamentos' && <Departamentos />}
                {subMenu === 'Ranges' && <Ranges />}
                {subMenu === 'Áreas' && <Areas />}

            </div>

        </div>
    )
}