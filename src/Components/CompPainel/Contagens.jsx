import { useEffect, useState } from 'react';
import '../CompPainel/Contagens-Style.scss';
import {collection, getDocs,  } from 'firebase/firestore';


import { db } from '../../firebaseConfig';

export default function Contagens() {



    const [departamentos, setDepartamentos] = useState([]);
    const [rangesDepartamentos, setRangesDepartamentos] = useState([]);
    const [areas, setAreas] = useState([]);


 const colectionRef = collection(db, 'Departamentos');

 const [dep, setDep] = useState('');

 
 // eslint-disable-next-line no-unused-vars
 let area = 'area001';
    // Ao carregar o componente, faz a leitura dos dados do firebase e traz o Primeiro menu Departamentos
    useEffect(() => {

        const getData = async () => {
            const data = await getDocs(colectionRef);
            setDepartamentos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Ao selecionar um departamento, faz a leitura dos dados do firebase 
    //e traz uma segunda Lista de Ranges de Departamentos
    // props = id do departamento selecionado dep001, dep002, dep003
    function getRanges(props){
            setDep(props);
        
        
            const getDepartamento = async () => {
            const rangesRef = collection(db,'Departamentos', `${props}`, 'areas' );
            const rangesDepartamentos = await getDocs(rangesRef);
            setRangesDepartamentos(rangesDepartamentos.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            
        }
        getDepartamento();
    }

    // Seleciona as areas do departamento selecionado
    function getAreas  (props) {

        area = props;
        let range = dep;
        const getAreasSelecionadas = async () => {
            const AreaRef = collection(db,'Departamentos', `${range}`, 'areas', `${props}`, 'area' );
            const areas = await getDocs(AreaRef);
            setAreas(areas.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            
        }
    getAreasSelecionadas();
    }

    
    return(
       
            <div className='Container'>

                <ul className="TitulosSubMenu">
                    <li>Departamentos</li>
                    <li>Range/Dep</li>
                    <li>Área</li>
                    <li>Status</li>
                </ul>

                <div className='Descricao'>

                    <div className='CxContagem'>

                        {/* Departamentos */}
                        <div >
                            <ul className='dep'>
                                {departamentos && departamentos.map((dep) => (
                                    <li key={dep.id}>
                                        <button onClick={() =>{getRanges(dep.id)}}>{dep.nome}</button>    
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Range/Dep */}
                        <div>
                            <ul className='dep'>
                                {
                                    rangesDepartamentos && rangesDepartamentos.map((range) => (
                                        <li key={range.id}>
                                            <button onClick={()=> {getAreas(range.id)}}>
                                                {range.id}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* Áreas */}
                        <div>
                            <ul className='dep'>
                                {areas && areas.map((item) => (
                                    <li key={item.id}>{item.id}</li>
                                ))}
                            </ul>
                        </div>
                        {/* Status */}
                        <div>
                            <ul className='dep'>
                                {areas && areas.map((item) => (
                                    <li key={item.id}>{item.Status}</li>
                                ))}
                            </ul>
                        </div>


                    </div>

                    <div className='painelLateral'>
                        painel lateral
                    </div>

                </div>
            </div>
        
    ) 
}