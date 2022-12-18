import { db } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";




export async function addRangeAcess(body, idDep, idSection) {
    const response = await addDoc(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges"), body);
    return response;
}

export async function removeRangeAcess(idDep, idSection , idRange) {
    const response = await deleteDoc(doc(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`));
    return response;
}

export async function addSectionAcess(body, id) {
    const response = await addDoc(collection(db, "Departamentos", `${id}`, "Sessoes"), body);
    return response;
}

export async function getSectionAcess(id) {
    const response = await getDocs(collection(db, "Departamentos", `${id}`, "Sessoes"));

    const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}