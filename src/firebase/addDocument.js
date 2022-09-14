import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const addDocument = (collectionName, documentObj, id) => {
    const docRef = doc(collection(getFirestore(), collectionName), id);
    return setDoc(docRef, {
        ...documentObj,
        timestamp: serverTimestamp(),
    });
};

export default addDocument;