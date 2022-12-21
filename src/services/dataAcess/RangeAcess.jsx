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

export async function updateQntAcess(idDep, idSection, idRange, idArea, itens) {
    const responseRef = await doc(db, "Departamentos", `${idDep}`,
     "Sessoes", `${idSection}`,
      "Ranges", `${idRange}`,
       "Areas", `${idArea}`);
     await updateDoc(responseRef, {
        qntItens: itens,
    });

}


export async function rangeAcess(idDep, idSection) {
    

    const response = await getDocs(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges"));

    const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
       
    }));
    //console.log(data)
    return data;

}

export async function removeRangeAcess(idDep, idSection , idRange) {
    const response = await deleteDoc(doc(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`));
    return response;
}

export async function addRangeAcess(body, idDep, idSection) {
    const response = await addDoc(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges"), body);
    return response;
}
