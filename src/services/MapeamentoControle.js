
import { useEffect, useState } from "react";
import { DepartamentoService } from "../Components/CompMapeamento/DepartamentoService.js";
import RangeControl from "./RangeControl.js";
import SectionControl from "./SectionControl.js";

    
    



export default function MapeamentoControle() {

    const sectionControl = SectionControl();
    const rangeControl = RangeControl();


    

    let departamentSelected = null;
    let sectionSelected = null;
    let rangeSelected = null;
    let areaSelected = null;

   async function getDepartaments() {
          

  
    }

  async function getDepartamentId(id){
        console.log('getDepartamentId: ', id);
        
      


        return {
            departamentSelected,
        }
    }

    async function setDepartaments(dep){
        departamentSelected = dep;
        
    }

    function getDepartamentSelected(){
        return departamentSelected;
    }

    function getSectionSelected(){
        console.log('sectionSelected: ', sectionSelected);
        return sectionSelected;
    }

    function setSectionSelected(section){
        sectionSelected = section;
    }

 

  

    

    async function getRanges(){
        
    }

    return {
        getDepartaments,
        getDepartamentId,
        getDepartamentSelected,
        setDepartaments,
        setSectionSelected,
        getSectionSelected,
        getRanges, 
    }

    
}

