import React from "react";
import { useEffect, useState } from "react";
import { storage } from "./firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

export const Box = (props) => {
  const [imgUrl, setImgUrl] = useState("");
  const reference = ref(storage, `${props.image}`);

  useEffect(() => {
    const getImage = async () => {
      const url = await getDownloadURL(reference);
      setImgUrl(url);
    };

    getImage();
  });

  return (
    <div className="card" key={props.ky}>
      <div className="imgBx">
        <img src={imgUrl} />
      </div>
      <br />
      <br />
      <br />
      <h2>
        Name: {props.name}, Age: {props.age}
        <button onClick={() => props.updateUserAge(props.id, props.age)}>
          Age+1
        </button>
        <button onClick={() => props.deleteUser(props.id, props.image)}>
          Delete User
        </button>
      </h2>
    </div>
  );
};
