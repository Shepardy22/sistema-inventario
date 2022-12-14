import { editAreaAcess, getAreaAcess, updateItemAcess } from "../dataAcess/areaAcess";
import { addDepAcess, addSectionAcess, getDepAcess, setDepAcess, updateDepAcess } from "../dataAcess/depAcess";


export async function getAreaAction(idDep, idSection, idRange, idArea) {
    const response = await getAreaAcess(idDep, idSection, idRange, idArea);
    return response;
}

export async function editAreaAction(idDep, idSection, idRange, idArea, produtos, ) {
    const response = await editAreaAcess(idDep, idSection, idRange, idArea, produtos, );
    return response;
}

export async function updateItemAction(idDep, idSection, idRange, idArea, produtos) {
    const response = await updateItemAcess(idDep, idSection, idRange, idArea, produtos);
    return response;
}