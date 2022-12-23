import { GetDepAcess, addDepAcess, removeDepAcess } from "./dataAcess/depAcess";
import { getSectionAcess } from "./dataAcess/sectionAcess";



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
        addDepAcess(body)
    }
    
    deleteDepartament(id){
        removeDepAcess(id)
    }

}

