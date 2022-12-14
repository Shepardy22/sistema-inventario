import { addAreasAcess, removeAreaAcess } from "../dataAcess/RangeAcess";

export async function addAreasAction(body, idDep, idSection, idRange) {
    const response = await addAreasAcess(idDep, idSection, idRange, body);
    return response;
}

export async function removeAreaAction(idDep, idSection, idRange, idArea) {
    const response = await removeAreaAcess(idDep, idSection, idRange, idArea);
    return response;
}