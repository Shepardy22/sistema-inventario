import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebaseConfig";
import { addSectionAcess, getSectionAcess } from "../../services/dataAcess/sectionAcess";

export class SectionService {

    nomeSection = '';
    qntProdutos = 0;
    brutoTotal = 0;
    responsavel = '';
    ultInventario = '';
    status = '';


    constructor() {
        
    }

    adicionarSessao(id, nameSection) {
        const body = {
            sectionName: nameSection,
            qntProdutos: 524,
            brutoTotal: 24348,
            responsavel: 'Dione',
            ultInventario: '18/07/2022',
            status: 'Validado',
        }

        addSectionAcess(body, id)
        alert('Sessão adicionada')
    }

    getSessoes(id) {
       return getSectionAcess(id);
    }

    getRanges(){

        
    }
}