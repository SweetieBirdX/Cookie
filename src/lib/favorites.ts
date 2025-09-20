import { db } from "./firebase";
import {
  doc, setDoc, deleteDoc, getDoc, getDocs, collection, serverTimestamp,
} from "firebase/firestore";

export type FavoriteDoc = {
  title: string;
  imageUrl?: string;
  addedAt: any; // Firestore Timestamp
};

/** users/{uid}/favorites/{recipeId} doc ref */
function favDocRef(uid: string, recipeId: string) {
  return doc(db, "users", uid, "favorites", recipeId);
}

export async function addFavorite(uid: string, recipeId: string, title: string, imageUrl?: string) {
  await setDoc(favDocRef(uid, recipeId), {
    title,
    imageUrl: imageUrl || null,
    addedAt: serverTimestamp(),
  } as FavoriteDoc);
}

export async function removeFavorite(uid: string, recipeId: string) {
  await deleteDoc(favDocRef(uid, recipeId));
}

export async function isFavorite(uid: string, recipeId: string): Promise<boolean> {
  const snap = await getDoc(favDocRef(uid, recipeId));
  return snap.exists();
}

export async function listFavorites(uid: string) {
  const snap = await getDocs(collection(db, "users", uid, "favorites"));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as FavoriteDoc) }));
}
