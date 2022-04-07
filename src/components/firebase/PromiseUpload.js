import firebase from "firebase/compat/app";

export const UploadFirebase = ({ value }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storageRef = firebase.storage().ref(`Ivo/${value.name}`);
      const task = storageRef.put(value);
      task.on("state_changed", async (snapshot) => {
        resolve(await task.snapshot.ref.getDownloadURL());
      });
    }, 1000);
  });
};
