import { addDepAcess, getDepAcess, setDepAcess, updateDepAcess } from "../dataAcess/depAcess";


export async function addDepAction(body){
    const response = await addDepAcess(body);
    return response.id;
}

export async function setDepAction(body, id){
    const response = await setDepAcess(body, id);
    return response;
}

export async function updateDepAction(body, id){
    const response = await updateDepAcess(body, id);
    return response;
}

export async function getDepAction(){
    const response = await getDepAcess();
    return response;
}

