import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function UpdateProfile() {
  const initialStateValue = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [values, setValues] = useState(initialStateValue);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (values.password !== values.passwordConfirm) {
      return toast("Password do not math", { type: "error", autoClose: 2000 });
    }

    const promises = [];
    if (values.email !== currentUser.email) {
      promises.push(updateEmail(values.email));
    }
    if (values.password) {
      promises.push(updatePassword(values.password));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        toast("Failed to update account", { type: "error", autoClose: 2000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (currentUser) {
      setValues({ ...values, email: currentUser.email });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <i className="material-icons">mail</i>
            </div>
            <input
              type="email"
              onChange={handleInputChange}
              className="form-control"
              placeholder="email@gmail.com"
              name="email"
              required
              value={values.email}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <i className="material-icons">password</i>
            </div>
            <input
              type="password"
              onChange={handleInputChange}
              className="form-control"
              name="password"
              placeholder="Leave blank to keep the same"
              value={values.password}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <i className="material-icons">password</i>
            </div>
            <input
              type="password"
              onChange={handleInputChange}
              className="form-control"
              name="passwordConfirm"
              placeholder="Leave blank to keep the same"
              value={values.passwordConfirm}
            />
          </div>

          <button disabled={loading} className="btn btn-primary btn-block">
            Update
          </button>

          <div className="p-2 text-center">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
