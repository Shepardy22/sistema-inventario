import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";


export async function addDepAcess(body) {
    const response = await addDoc(collection(db, "Departamentos"), body);
    
    return response;
   
}

export async function setDepAcess(body) {
    const response = await setDoc(collection(db, "Departamentos"),body);
    
    return response; 
}

export async function getDepAcess() {
    const response = await getDocs(collection(db, "Departamentos"));
    
    response.forEach((doc) => {
        console.log(doc.id, doc.data());
    });
    return response; 
}

