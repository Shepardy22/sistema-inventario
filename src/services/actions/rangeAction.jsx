import { addAreasAcess } from "../dataAcess/RangeAcess";

export async function addAreasAction(body, idDep, idSection, idRange) {
    const response = await addAreasAcess(idDep, idSection, idRange, body);
    return response;
}