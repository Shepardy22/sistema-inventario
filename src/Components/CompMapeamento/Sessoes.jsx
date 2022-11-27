import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Sessoes() {

    const colectionRef = collection(db, 'Sessoes');

    return(
        <div>
            Sessoes
        </div>
    ) 
}