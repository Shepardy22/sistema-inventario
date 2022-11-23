import "./NavBar-Style.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {

    let selected = props.selected;
    

    return(
        <div className='NavBar'>
                <ul >
                    <li className={selected ==="painel" && `Selected`}><Link to="/">Painel</Link></li>
                    <li className={selected ==="mapeamento" && `Selected`}><Link to="/Mapeamento">Mapeamento</Link></li>
                    <li className={selected ==="Produtos" && `Selected`}><Link  to="/">Produtos</Link></li>
                    <li className={selected ==="Dados" && `Selected`}><Link  to="/">Dados</Link></li>
                    <li className={selected ==="Relatorios" && `Selected`}><Link  to="/">Relatórios</Link></li>
                    <li className={selected ==="Remotos" && `Selected`}><Link  to="/">Remotos</Link></li>
                </ul>

                <div className='User'>
                    Usuario Logado
                </div>
        </div>
    ) 
}