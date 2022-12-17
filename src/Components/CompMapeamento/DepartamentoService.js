import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import {GetData} from "../../services/dataAcess/depAcess";
import { addDepAcess } from "../../services/dataAcess/depAcess";
import {removeDepAcess} from '../../services/dataAcess/depAcess'

export class DepartamentoService {



    

    adicionarDepartamento(name) {
        const body = {
            name                                            : name,
            qntSessoes                                      : 6,
            qntProdutos                                     : 524,
            brutoTotal                                      : 24348,
            responsavel                                     : 'Dione',
            ultInventario                                   : '18/07/2022',
            status                                          : 'Validado',
        }    
        addDepAcess(body);
        alert('Departamento adicionado')
    }
    removerDepartamento(id) {
        removeDepAcess(id);
        alert('Departamento removido')
    }

    exibirDescricao() {
        
    }
    selecionarSessao() {
        alert('Sessão selecionada')
    }

    
    
}


export default function DeptoObserver() {

    const departamentoService = new DepartamentoService();
    const [departamento, setDepartamento] = useState([]);

    useEffect(() => {
        setDepartamento(departamentoService.getDepartamento());
    }, [])

    return departamento;
}

