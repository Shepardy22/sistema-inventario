import "./NavBar-Style.css";

export default function NavBar() {
    return(
        <div className='NavBar'>
                <ul >
                    <li className="Selected"><a href="/">Painel</a></li>
                    <li><a href="/">Áreas</a></li>
                    <li><a href="/">Produtos</a></li>
                    <li><a href="/">Dados</a></li>
                    <li><a href="/">Relatórios</a></li>
                    <li><a href="/">Remotos</a></li>
                </ul>

                <div className='User'>
                    Usuario Logado
                </div>
            </div>
    ) 
}