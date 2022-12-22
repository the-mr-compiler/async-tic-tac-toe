import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function addUser(uid, name, username, email) {
  const user = {
    uid: uid,
    name: name,
    username: username,
    email: email,
  };

  setDoc(doc(db, "users", uid), user);
}

async function usernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const qs = await getDocs(q);
  return qs.empty ? false : true;
}
async function emailExists(email) {
  if (users[email]) return true;
  const q = query(collection(db, "users"), where("email", "==", email));
  const qs = await getDocs(q);
  return qs.empty ? false : true;
}

const users = new Map();

export async function getUserByEmail(email) {
  if (users[email]) return users[email];
  const q = query(collection(db, "users"), where("email", "==", email));
  const qs = await getDocs(q);
  if (qs.empty) return null;
  users[email] = qs.docs[0].data();
  return qs.docs[0].data();
}
async function getUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export function getGamesSnapshot(email, callback) {
  const q = query(
    collection(db, "games"),
    where("users", "array-contains", email),
    orderBy("updatedAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const games = snapshot.docs.map((doc) => {
      let d = doc.data();
      let opponent = d.users.filter((u) => u !== email)[0];
      return { ...d, id: doc.id, opponent };
    });
    callback(games);
  });
}

export async function newGame(uid, myEmail, opponentEmail) {
  if (await emailExists(opponentEmail)) {
    const q = query(
      collection(db, "games"),
      where("users", "array-contains-any", [myEmail, opponentEmail]),
      where("status", "!=", status.complete)
    );
    const qr = await getDocs(q);
    if (qr.empty) {
      const game = {
        board: ["", "", "", "", "", "", "", "", ""],
        status: status.waiting_user,
        users: [myEmail, opponentEmail],
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        owner: uid,
      };
      return (await addDoc(collection(db, "games"), game)).id;
    } else {
      return qr.docs[0].id;
    }
  } else {
    return null;
  }
}

export function getGameSnapshot(gameId, email, callback) {
  return onSnapshot(doc(db, "games", gameId), (snapshot) => {
    let d = snapshot.data();
    let opponent = d.users.filter((u) => u !== email)[0];
    callback({ ...d, id: snapshot.id, opponent });
  });
}

export function updateBoard(gameid, board, status) {
  const d = doc(db, "games", gameid);
  setDoc(d, { board, status, updatedAt: serverTimestamp() }, { merge: true });
}

export function updateStatus(gameid, status, winner) {
  const d = doc(db, "games", gameid);
  setDoc(d, { status, winner, updatedAt: serverTimestamp() }, { merge: true });
}

export const status = {
  complete: "complete",
  waiting_opponent: "waiting_opponent",
  waiting_user: "waiting_user",
};

export { addUser, getUser, usernameExists };
