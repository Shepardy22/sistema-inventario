
export default function MapControl(){
    let departamentSelected = null;
    let sectionSeleced = null;
    let rangeSeleced = null;
    let areaSeleced = null;
    
    function setDepartament(departament) {
        departamentSelected = departament;
    }
    function setSection(section) {
        sectionSeleced = section;
    }
    function setRange(range) {
        rangeSeleced = range;
    }
    function setArea(area) {
        areaSeleced = area;
    }
    function getDepartament() {
        return departamentSelected;
    }
    function getSection() {
        return sectionSeleced;
    }
    function getRange() {
        return rangeSeleced;
    }
    function getArea() {
        return areaSeleced;
    }
    return {
        setDepartament,
        setSection,
        setRange,
        setArea,
        getDepartament,
        getSection,
        getRange,
        getArea
    }

}

