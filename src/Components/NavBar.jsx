import "./NavBar-Style.css";
import { Link } from "react-router-dom";

import { FaBars } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar(props) {

    let selected                            = props.selected;
    return (

            <div className                  = 'flex w-full h-12 justify-between p-1  '>
            <ul className                   = {`w-full sm:w-3/4   border h-full flex justify-around items-center   rounded-md NavBar`}>
                <li className               = {`${selected ==="painel" ? `Selected` : null} ` }>
                    <Link to                = "/">
                        <button className   = "text-gray-300 ">Painel</button>
                    </Link>
                </li>
                <li className               = {selected ==="mapeamento" ? `Selected ` : null}>
                    <Link to                = "/Mapeamento">
                        <button className   = "text-gray-300 ">Mapeamento</button>
                    </Link></li>
                <li className               = {selected ==="Produtos" ? `Selected` : 'NavBarItem'}>
                    <Link  to               = "/Sessoes">
                        <button className   = "text-gray-300 hidden sm:flex sm:list-none "><span className="NavBarItem">Produtos</span></button>
                    </Link></li>
                <li className               = {selected ==="Dados" ? `Selected` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex">Dados</button>
                    </Link></li>
                <li className               = {selected ==="Relatorios" ? `Selected` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex">Relatórios</button>
                    </Link></li>
                <li className               = {selected ==="Remotos" ? `Selected` : null}>
                    <Link  to               = "/">
                        <button className   = "text-gray-300 hidden sm:flex">Remotos</button>
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