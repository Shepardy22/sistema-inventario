import { db } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export async function addAreasAcess(idDep, idSection, idRange, body) {
    
    const response = await addDoc(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`, "Areas"), body);
    return response;

}