import "./NavBar-Style.css";
import { Link } from "react-router-dom";

import { FaBars, FaCalculator, FaDatabase, FaFileAlt, FaGripVertical, FaMapSigns, FaTv } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar(props) {

    let selected                            = props.selected;
    return (

            <div className                  = 'flex w-full h-14 justify-between p-1  '>
            <ul className                   = {`w-full sm:w-3/4   border h-full flex justify-around items-center   rounded-md NavBar`}>
                <li className               = {`${selected ==="painel" ? `Selected text-orange-500` : null} ` }>
                    <Link to                = "/">
                        
                            
                            <button className   = {selected ==="painel" ? ` text-orange-500` : `text-gray-300`}><span className="flex gap-1 p-1"><FaTv className="my-auto"/>Painel</span></button>
                        
                    </Link>
                </li>

                <li className               = {selected ==="mapeamento" ? `Selected text-orange-500` : null}>
                    <Link to                = "/Mapeamento">
                        <button className   = {selected ==="mapeamento" ? ` text-orange-500` : `text-gray-300`}><span className="flex gap-1 p-1">
                            <FaMapSigns className="my-auto"/> Mapeamento
                        </span></button>
                    </Link>
                </li>

                <li className               = {selected ==="Produtos" ? `Selected` : 'NavBarItem'}>
                    <Link  to               = "/Sessoes">
                        <button className   = {`text-gray-300 hidden sm:flex sm:list-none`} ><span className="NavBarItem"><span className="flex gap-1">
                            <FaGripVertical className="my-auto"/> Produtos
                        </span></span></button>
                    </Link>
                </li>
                
                <li className               = {selected ==="Dados" ? `Selected` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex"><span className="flex gap-1 p-1">
                            <FaDatabase className="my-auto"/> Dados
                        </span></button>
                    </Link></li>
                <li className               = {selected ==="Relatorios" ? `Selected ` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex"><span className="flex gap-1">
                            <FaFileAlt className="my-auto"/> Relatórios
                        </span></button>
                    </Link></li>
                <li className               = {selected ==="Remotos" ? `Selected` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex"><span className="flex gap-1">
                            <FaCalculator className="my-auto"/> Remotos
                        </span></button>
                    </Link></li>
                <li className="sm:hidden text-2xl text-gray-300">
                    <FaBars/>
                </li>
            </ul>
            
            <div className                  = 'w-1/4  hidden sm:flex justify-center items-center'>
                Usuario Logado
            </div>
            
            
        </div> 

    )

    
}