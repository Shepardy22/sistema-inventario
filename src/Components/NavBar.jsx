import "./NavBar-Style.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {

    let selected = props.selected;
    

    return(
        <div className='NavBar'>
                <ul >
                    <li className={selected ==="painel" ? `Selected` : null}><Link to="/">Painel</Link></li>
                    <li className={selected ==="mapeamento" ? `Selected` : null}><Link to="/Mapeamento">Mapeamento</Link></li>
                    <li className={selected ==="Produtos" ? `Selected` : null}><Link  to="/">Produtos</Link></li>
                    <li className={selected ==="Dados" ? `Selected` : null}><Link  to="/">Dados</Link></li>
                    <li className={selected ==="Relatorios" ? `Selected` : null}><Link  to="/">Relatórios</Link></li>
                    <li className={selected ==="Remotos" ? `Selected` : null}><Link  to="/">Remotos</Link></li>
                </ul>

                <div className='User'>
                    Usuario Logado
                </div>
        </div>
    ) 
}