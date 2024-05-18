import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Box } from "./Box";
import { storage } from "./firebase-config";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  //for adding of data
  const [newName, setName] = useState("");
  const [newAge, setAge] = useState();
  const [image, setImage] = useState(null);

  const addUser = async () => {
    if (newName === "" || newAge === undefined || image === null) {
      alert("Incomplete fields");
      return;
    }

    const imageLoc = `images/${image.name + v4()}`;
    const imageRef = ref(storage, imageLoc);
    uploadBytes(imageRef, image).then(() => {
      alert("Image uploaded");
      console.log(imageRef);
    });

    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
      image: imageLoc,
    });

    openCollection();
  };

  const updateUserAge = async (id, age) => {
    const tempDoc = doc(db, "users", id);
    const newField = { age: age + 1 };
    await updateDoc(tempDoc, newField);

    openCollection();
  };

  const deleteUser = async (id, imageName) => {
    const tempDoc = doc(db, "users", id);
    await deleteDoc(tempDoc);

    const refToDelete = ref(storage, `${imageName}`);
    console.log(refToDelete);

    deleteObject(refToDelete)
      .then(() => {
        console.log("delete successfully");
      })
      .catch(() => {
        console.log("error has occured");
      });

    openCollection();
  };

  const uploadImage = () => {
    if (image === null) return;
  };

  useEffect(() => {
    openCollection();
  }, []);

  return (
    <div className="App">
      <div id="inputBox">
        <input
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button onClick={addUser}>Add user</button>
        <input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <button onClick={uploadImage}> Upload Image </button>
      </div>
      <h1>
        {newName}
        {newAge}
      </h1>
      {users.map((user, key) => {
        return (
          <Box
            ky={key}
            name={user.name}
            age={user.age}
            image={user.image}
            id={user.id}
            updateUserAge={updateUserAge}
            deleteUser={deleteUser}
          />
        );
      })}
    </div>
  );

  function openCollection() {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }
}

export default App;
