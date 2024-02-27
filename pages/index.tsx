import {
  emailSignIn,
  emailSignUp,
  getFirebaseAuth,
  userDelete,
  userSignOut,
} from "@/helpers/firebase-util";
import { ChangeEvent, MutableRefObject, useRef } from "react";
import { CarAccessoryModel } from "@/helpers/models";

export default function Home() {
  const photoUrls: string[] = [];
  const aliasRef = useRef() as MutableRefObject<HTMLInputElement>;
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const quantityRef = useRef() as MutableRefObject<HTMLInputElement>;
  const outerTypeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const innerTypeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>;

  function signInUserClient() {
    emailSignIn("danik9970711@gmail.com", "123456789")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createUserClient() {
    emailSignUp("danik9970711@gmail.com", "123456789", "regular")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    userSignOut()
      .then(() => console.log("Signed Out"))
      .catch((err) => console.log(err));
  }

  function deleteUser() {
    userDelete()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  function checkAuth() {
    const auth = getFirebaseAuth();

    console.log(auth);
    console.log(auth.currentUser);
  }

  function parsePhotos(event: ChangeEvent<HTMLInputElement>) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const files = event.target.files;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image")) continue;

          const imageReader = new FileReader();
          imageReader.addEventListener("load", (eventImage) => {
            if (eventImage.target) {
              const file = eventImage.target.result;

              if (typeof file === "string") {
                photoUrls.push(file);
              }
            }
          });
          imageReader.readAsDataURL(files[i]);
        }
      } else alert("Failed to upload files");
    } else {
      alert("Ваш Браузер не поддерживает загрузку файлов");
    }
  }

  function createAccessory() {
    const alias = aliasRef.current.value;
    const title = titleRef.current.value;
    const quantity = quantityRef.current.value;
    const outerType = outerTypeRef.current.value;
    const innerType = innerTypeRef.current.value;
    const price = parseFloat(priceRef.current.value);
    const description = descriptionRef.current.value;

    const body: CarAccessoryModel = {
      title,
      price,
      quantity,
      outerType,
      innerType,
      id: alias,
      description,
      available: true,
      photos: photoUrls,
    };

    fetch("/api/create-accessory", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className={"self-start flex flex-col"}>
      <div>
        <button className="p-4 ml-4 bg-sky-500" onClick={createUserClient}>
          Create User Client
        </button>

        <button className="p-4 ml-4 bg-sky-500" onClick={signInUserClient}>
          Sign In User Client
        </button>

        <button className="p-4 ml-4 bg-sky-500" onClick={signOut}>
          Sign Out
        </button>

        <button className="p-4 ml-4 bg-sky-500" onClick={deleteUser}>
          Delete
        </button>

        <button className="p-4 ml-4 bg-sky-500" onClick={checkAuth}>
          Check Auth
        </button>
      </div>

      <div className={"flex flex-col"}>
        <p>Create Accessory</p>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Alias</label>
          <input
            ref={aliasRef}
            type="text"
            placeholder="alias"
            name="alias"
            id="accessory-alias"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Title</label>
          <input
            ref={titleRef}
            type="text"
            placeholder="title"
            name="title"
            id="accessory-title"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Photos</label>
          <input
            type="file"
            name="photos"
            multiple={true}
            accept="image/*"
            id="accessory-photos"
            onChange={parsePhotos}
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            name="quanity"
            ref={quantityRef}
            placeholder="Quantity"
            id="accessory-quantity"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            ref={descriptionRef}
            placeholder="Description"
            id="accessory-description"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Price</label>
          <input
            type="number"
            name="price"
            ref={priceRef}
            placeholder="Price"
            id="accessory-price"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Outer Type</label>
          <input
            type="text"
            name="outerType"
            ref={outerTypeRef}
            placeholder="Outer Type"
            id="accessory-outer-type"
          />
        </div>
        <div className={"flex flex-col my-2"}>
          <label htmlFor="">Inner Type</label>
          <input
            type="text"
            name="innerType"
            ref={innerTypeRef}
            placeholder="Inner Type"
            id="accessory-inner-type"
          />
        </div>

        <button className={"p-4 ml-4 bg-sky-500"} onClick={createAccessory}>
          Create Accessory
        </button>
      </div>
    </div>
  );
}
