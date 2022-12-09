import { editAreaAcess, getAreaAcess, removeItemAcess } from "../dataAcess/areaAcess";
import { addDepAcess, addSectionAcess, getDepAcess, setDepAcess, updateDepAcess } from "../dataAcess/depAcess";


export async function getAreaAction(idDep, idSection, idRange, idArea) {
    const response = await getAreaAcess(idDep, idSection, idRange, idArea);
    return response;
}

export async function editAreaAction(idDep, idSection, idRange, idArea, produtos, ) {
    const response = await editAreaAcess(idDep, idSection, idRange, idArea, produtos, );
    return response;
}

export async function removeItemAction(idDep, idSection, idRange, idArea, idItem) {
    const response = await removeItemAcess(idDep, idSection, idRange, idArea, idItem);
    return response;
}