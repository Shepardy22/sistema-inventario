import "./NavBar-Style.css";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar(props) {

    let selected = props.selected;


    return (
        // <div className='NavBar'>
        //         <ul >
        //             <li className={selected ==="painel" ? `Selected` : null}><Link to="/">Painel</Link></li>
        //             <li className={selected ==="mapeamento" ? `Selected` : null}><Link to="/Mapeamento">Mapeamento</Link></li>
        //             <li className={selected ==="Produtos" ? `Selected` : null}><Link  to="/">Produtos</Link></li>
        //             <li className={selected ==="Dados" ? `Selected` : null}><Link  to="/">Dados</Link></li>
        //             <li className={selected ==="Relatorios" ? `Selected` : null}><Link  to="/">Relatórios</Link></li>
        //             <li className={selected ==="Remotos" ? `Selected` : null}><Link  to="/">Remotos</Link></li>
        //         </ul>

        //         <div className='User'>
        //             Usuario Logado
        //         </div> 
        // </div>

        <div>
            <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home"><Link to="/">Painel</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home"><Link to="/Mapeamento">Mapeamento</Link></Nav.Link>
                            <Nav.Link href="#features">Produtos</Nav.Link>
                            <Nav.Link href="#pricing">Dados</Nav.Link>
                            <Nav.Link href="#pricing">Relatórios</Nav.Link>
                            <Nav.Link href="#pricing">Remotos</Nav.Link>
                        </Nav>
            
                    </Container>
            </Navbar>
        </div>

    )
}