import { useState } from "react";
import Departamentos from "../Components/CompMapeamento/departamentos";
import { GetDepAcess } from "./dataAcess/depAcess";

function DepartamentoControle(){

    console.log('DepartamentoControle...');
    console.log('getDepartaments...');

  async function getDepartaments(){
        const departamentosList = await GetDepAcess();
        
        return departamentosList
    }


   async function getDepartamentById(id){
        const departamentosList = await GetDepAcess();
        const departament = await departamentosList.find(dep => dep.id === id);
        //console.log('departament: ', departament);

        return departament;
    }





    return {
        getDepartaments,
        getDepartamentById,
    }

}

export default DepartamentoControle();
