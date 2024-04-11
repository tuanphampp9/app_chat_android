import { child, getDatabase, push, ref, update } from 'firebase/database';
import { getFirebaseApp } from '../firebaseConfig';
export const createStudent = async (data) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    await push(child(dbRef, 'students'), data);
}

export const updateTest = async (id, text) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const testRef = child(dbRef, `tests/${id}`);
    await update(testRef, { content: text })
}