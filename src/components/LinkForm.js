import React, { useState, useEffect } from "react";
import { db } from "../firebase/Firebase";

export const LinkForm = ({ addOrEditLink, currentId, links }) => {
  const initialStateValue = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditLink(values);
    setValues({ ...initialStateValue });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    return setValues({ ...doc.data() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialStateValue });
    } else {
      getLinkById(currentId);
    }
  }, [currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          onChange={handleInputChange}
          className="form-control"
          placeholder="http://someurl.com"
          name="url"
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          onChange={handleInputChange}
          className="form-control"
          name="name"
          placeholder="nombre"
          value={values.name}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          onChange={handleInputChange}
          className="form-control"
          placeholder="Escribe descripción"
          value={values.description}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        {currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};
