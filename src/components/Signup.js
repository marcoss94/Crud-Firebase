import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const initialStateValue = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [values, setValues] = useState(initialStateValue);
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    if (values.password !== values.passwordConfirm) {
      return toast("Password do not math", { type: "error", autoClose: 2000 });
    }
    try {
      setLoading(true);
      await signup(values.email, values.password);
    } catch (error) {
      toast("Filed to create account", { type: "error", autoClose: 2000 });
    }

    setLoading(false);
  };

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
              placeholder="password"
              required
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
              placeholder="password confirm"
              required
              value={values.passwordConfirm}
            />
          </div>

          <button disabled={loading} className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
