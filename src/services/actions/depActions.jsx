import { addDepAcess, getDepAcess, setDepAcess } from "../dataAcess/depAcess";

export async function addDepAction(body){
    const response = await addDepAcess(body);
    return response.id;
}

export async function setDepAction(body){
    const response = await setDepAcess(body);
    return response;
}

export async function getDepAction(body){
    const response = await getDepAcess(body);
    return response;
}