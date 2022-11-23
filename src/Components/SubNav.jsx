import { useState } from 'react';
import './SubNav-Style.css';
export default function SubNav(props) {

    const [subMenu, setSubMenu] = useState('departamentos');

    function handleSubMenu(subMenu){
        
        setSubMenu(subMenu)
        props.subMenu(subMenu);
    }

    return(
        <div className="SubNav">
            <ul>
                <li className={subMenu === "departamentos" ? "Selected" : null}>
                    <button className='botaoSub'  onClick={()=>{handleSubMenu("departamentos")}} >{props.submenu01}
                    </button>
                </li>
                <li className={subMenu === "Ranges" ? "Selected" : null}>
                    <button className='botaoSub' onClick={()=>{handleSubMenu("Ranges")}}>{props.submenu02}
                    </button></li>
                <li className={subMenu === "Áreas" ? "Selected" : null}>
                    <button className='botaoSub' onClick={()=>{handleSubMenu("Áreas")}}>{props.submenu03}
                    </button>
                </li>
            </ul>
        </div>
    ) 
}