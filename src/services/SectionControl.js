import { getSectionAcess } from "./dataAcess/sectionAcess";


export default function SectionControl(){

    let sectionSelected = null;

   async function getSections(idDepartament){
        const section  = await getSectionAcess(idDepartament);
        sectionSelected = section;
        
    
        return sectionSelected;
    }
    

    return{
        getSections,
    }
}


