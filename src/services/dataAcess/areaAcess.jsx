import { db } from "../../firebaseConfig";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, deleteField, doc, FieldValue, getDocs, setDoc, updateDoc } from "firebase/firestore";

export async function getAreaAcess(idDep, idSection, idRange, idArea) {
    const response = await getDocs(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`, "Areas", `${idArea}`));
    return response;
}

export async function addAreasAcess(idDep, idSection, idRange, body) {
    const response = await addDoc(collection(db, "Departamentos", `${idDep}`, "Sessoes", `${idSection}`, "Ranges", `${idRange}`, "Areas"), body);
    return response;
}

export async function editAreaAcess(idDep, idSection, idRange, idArea, produtos, ) {
    const responseRef = await doc(db,
    "Departamentos", `${idDep}`,
     "Sessoes", `${idSection}`,
      "Ranges", `${idRange}`,
       "Areas", `${idArea}`,);
    const response = await updateDoc(responseRef, { 
        produtos: arrayUnion(produtos),
    });
    return response;
}

export async function updateItemAcess(idDep, idSection, idRange, idArea, produtos) {
    const responseRef = await doc(db,
    "Departamentos", `${idDep}`,
     "Sessoes", `${idSection}`,
      "Ranges", `${idRange}`,
       "Areas", `${idArea}`,
    )
    await updateDoc(responseRef, {
        produtos: produtos,


    });
    
    




    

            

}

