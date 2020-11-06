import React, { useEffect, useState } from "react";
import { LinkForm } from "./LinkForm";
import { db } from "../firebase/Firebase";
import { toast } from "react-toastify";

export const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    if (currentId === "") {
      await db.collection("links").doc().set(linkObject);
      toast("New link add", { type: "success" });
    } else {
      await db.collection("links").doc(currentId).update(linkObject);
      toast("Link updated", { type: "info" });
      setCurrentId("");
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("estas seguro")) {
      await db.collection("links").doc(id).delete();
      toast("Link removed", { type: "error", autoClose: 2000 });
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => {
          return (
            <div key={link.id} className="card md-1">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.name}</h4>
                  <div>
                    <i
                      className="material-icons text-danger"
                      onClick={() => onDeleteLink(link.id)}
                    >
                      close
                    </i>
                    <i
                      className="material-icons"
                      onClick={() => setCurrentId(link.id)}
                    >
                      edit
                    </i>
                  </div>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="blank">
                  {" "}
                  Go to website
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
