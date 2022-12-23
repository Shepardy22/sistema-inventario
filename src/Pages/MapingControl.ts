import { SetStateAction, useState } from "react";

export default function MapingControl(){

    const [departament, setDepartament] = useState([]);
    const [section, setSection] = useState({});
    const [range, setRange] = useState({});
    const [area, setArea] = useState({});

    function handleDepartament(departament){
        setDepartament(departament);
    }
    function handleSection(section){
        setSection(section);
    }
    function handleRange(range){
        setRange(range);
    }
    function handleArea(area){
        setArea(area);
    }

    function departamentCash(){
        return departament;
    }
    function sectionCash(){
        return section;
    }
    function rangeCash(){
        return range;
    }
    function areaCash(){
        return area;
    }

    

    return{
        handleDepartament,
        handleSection,
        handleRange,
        handleArea,

        departamentCash,
        sectionCash,
        rangeCash,
        areaCash,
    }
}