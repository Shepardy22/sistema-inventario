import './SubNav-Style.css';
export default function SubNav() {
    return(
        <div className="SubNav">
            <ul>
                <li className='Selected'><a href="/">Contagens</a></li>
                <li>Detalhes</li>
                <li>Mapa</li>
            </ul>
        </div>
    ) 
}