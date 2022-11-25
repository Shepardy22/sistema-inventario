import { db } from "../../firebaseConfig";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";





export async function addDepAcess(body) {
    const response = await addDoc(collection(db, "Departamentos"), body);
    
    return response;
   
}

export async function setDepAcess(body , id) {
    const cityRef = doc(db, 'Departamentos' , `${id}`);
   setDoc(cityRef, body);
}

export async function updateDepAcess(body , id) {
    const cityRef = doc(db, 'Departamentos' , `${id}`);
   updateDoc(cityRef, body);
}

export async function getDepAcess() {
    const response = await getDocs(collection(db, "Departamentos"));
    
    response.forEach((doc) => {
        console.log(
            doc.id,
            doc.data()
            );
    });
    return response; 
}

