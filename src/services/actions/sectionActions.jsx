import { addRangeAcess, removeRangeAcess } from "../dataAcess/sectionAcess";


export async function addRangeAction(body, id, idSection){
    const response = await addRangeAcess(body, id, idSection);
    return response;
}

export async function removeRangeAction(id, idSection, idRange){
    const response = await removeRangeAcess(id, idSection, idRange);
    return response;
}