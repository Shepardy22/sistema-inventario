import { db } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export async function addAreasAcess(idDep, idSection, idRange, body) {
    
    const response = await addDoc(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`, "Areas"), body);
    return response;

}

export async function removeAreaAcess(idDep, idSection, idRange, idArea) {
    const response = await deleteDoc(doc(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`, "Areas", `${idArea}`));
    return response;
}