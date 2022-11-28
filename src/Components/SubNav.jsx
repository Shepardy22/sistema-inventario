import { useEffect, useState } from 'react';
import './SubNav-Style.css';



export default function SubNav(props) {

    const navTo = props.to;
    

    const [subMenu, setSubMenu] = useState('');

    useEffect(() => {
        setSubMenu(navTo);
    }, [navTo]);

    
    

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
                <li className={subMenu === "Sessoes" ? "Selected" : null}>
                    <button className='botaoSub' onClick={()=>{handleSubMenu("Sessoes")}}>{props.submenu02}
                    </button></li>
                <li className={subMenu === "Ranges" ? "Selected" : null}>
                    <button className='botaoSub' onClick={()=>{handleSubMenu("Ranges")}}>{props.submenu03}
                    </button>
                </li>
                <li className={subMenu === "areas" ? "Selected" : null}>
                    <button className='botaoSub' onClick={()=>{handleSubMenu("areas")}}>{props.submenu04}
                    </button>
                </li>
            </ul>
        </div>
    ) 
}