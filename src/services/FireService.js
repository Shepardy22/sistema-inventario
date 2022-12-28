import { GetDepAcess, addDepAcess, removeDepAcess } from "./dataAcess/depAcess";
import { addSectionAcess, getSectionAcess, removeSectionAcess } from "./dataAcess/sectionAcess";



export class FireService{

    getDepartamentsList(){
       
       async function getDepartamentsList(){
        console.log(`[FireService] Carregando Lista de Departamentos...`)
        let departamentsList = await GetDepAcess();

        return departamentsList;
       }


         return getDepartamentsList();
    }

    getSectionsList(id){
        async function getSectionsList(id){
            console.log('[FireService] Carregando Lista de Sessões...')
            let sectionsList = await getSectionAcess(id);
            
            return sectionsList;
        }

        return getSectionsList(id);
    }

    getRangesList(id){
        async function getRangesList(id){
            let rangesList = await getSectionAcess(id);
            return rangesList;
        }

        return getRangesList(id);
    }

    getAreasList(id){
        async function getAreasList(id){
            let areasList = await getSectionAcess(id);
            return areasList;
        }

        return getAreasList(id);
    }

    addDepartament(body){
         console.log('[FireService] Adicionando Departamento...')
        addDepAcess(body);
      
    }
    
    deleteDepartament(id){
        removeDepAcess(id)
    }

    addSection(id, body){
        console.log('[FireService] Adicionando Sessão...')
        addSectionAcess(id, body);
    }

    deleteSection(idDep, idSec){
        console.log('[FireService] Removendo Sessão...')
        removeSectionAcess(idDep, idSec);

    }


}

