import { FireService } from '../../services/FireService';
import { useEffect, useState } from "react";

export function DepartamentService(){

    const fireService = new FireService();

    const [departamentsListCash, setDepartamentsListCash] = useState([]);
    


    function serviceSwitcher(service){
        switch(service){
            case 'getDepartaments':
                return fireService.getDepartamentsList();
            case 'getSections':
                return fireService.getSectionsList();
            default:
                return null;
        }
    }



    
    //return departaments Arraylist
    function getDepartamentsList(){
        if(departamentsListCash.length === 0){
           const departamentsList = serviceSwitcher('getDepartaments');
           setDepartamentsListCash(departamentsList);    
        }
        return serviceSwitcher('getDepartaments');         
    }

    //return departament object
    function getDepartamentById(departamentId){
        const departament = serviceSwitcher('getDepartaments').filter(departament => departament.id === departamentId);
        return departament;
        
    }
    
    //return sections Arraylist
    function getSectionsList(){
    }




    return {
        getDepartamentsList,
        getDepartamentById,
        getSectionsList,
        
        
    }
}