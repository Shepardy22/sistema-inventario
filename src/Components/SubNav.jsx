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
                <li className={subMenu === "departamentos" && "Selected"}>
                    <button  onClick={()=>{handleSubMenu("departamentos")}} >{props.submenu01}
                    </button>
                </li>
                <li className={subMenu === "Ranges" && "Selected"}>
                    <button onClick={()=>{handleSubMenu("Ranges")}}>{props.submenu02}
                    </button></li>
                <li className={subMenu === "Áreas" && "Selected"}>
                    <button onClick={()=>{handleSubMenu("Áreas")}}>{props.submenu03}
                    </button>
                </li>
            </ul>
        </div>
    ) 
}