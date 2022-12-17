import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebaseConfig";
import { addSectionAcess } from "../../services/dataAcess/sectionAcess";

export class SectionService {
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






    getSections() {
        return this.sections;
    }

    setSections(sections) {
        this.sections = sections;
    }
}