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

export function getGamesSnapshot(email, callback, callbackOpp) {
  const q = query(
    collection(db, "games"),
    where("user", "==", email),
    orderBy("updatedAt", "desc")
  );
  const first = onSnapshot(q, (snapshot) => {
    const games = snapshot.docs.map((doc) => {
      let d = doc.data();
      let opponent = d.opponent === email ? d.user : d.opponent;
      return { ...d, id: doc.id, opponent };
    });
    callback(games);
  });
  const q2 = query(
    collection(db, "games"),
    where("opponent", "==", email),
    orderBy("updatedAt", "desc")
  );
  const second = onSnapshot(q2, (snapshot) => {
    const games = snapshot.docs.map((doc) => {
      let d = doc.data();
      let opponent = d.opponent === email ? d.user : d.opponent;
      return { ...d, id: doc.id, opponent };
    });
    callbackOpp(games);
  });
  return () => {
    first();
    second();
  };
}

export async function newGame(uid, myEmail, opponentEmail) {
  if (await emailExists(opponentEmail)) {
    let q = query(
      collection(db, "games"),
      // where("users", "array-contains-any", [myEmail, opponentEmail]),
      // where("users." + myEmail, "==", true),
      // where("users." + opponentEmail, "==", true),
      where("user", "==", myEmail),
      where("opponent", "==", opponentEmail),
      where("status", "!=", status.complete)
    );
    let qr = await getDocs(q);
    if (qr.empty) {
      q = query(
        collection(db, "games"),
        // where("users", "array-contains-any", [myEmail, opponentEmail]),
        // where("users." + myEmail, "==", true),
        // where("users." + opponentEmail, "==", true),
        where("opponent", "==", myEmail),
        where("user", "==", opponentEmail),
        where("status", "!=", status.complete)
      );
    }
    qr = await getDocs(q);
    if (qr.empty) {
      const game = {
        board: ["", "", "", "", "", "", "", "", ""],
        status: status.waiting_user,
        // users: { myEmail: true, opponentEmail: true },
        // users: [myEmail, opponentEmail],
        user: myEmail,
        opponent: opponentEmail,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        owner: myEmail,
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
    // let opponent = d.users.filter((u) => u !== email)[0];
    if (d.opponent === email) d.opponent = d.user;
    callback({ ...d, id: snapshot.id });
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
