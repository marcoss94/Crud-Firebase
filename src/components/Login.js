import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const initialStateValue = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialStateValue);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      setLoading(true);
      await login(values.email, values.password);
      history.push("/");
    } catch (error) {
      toast("Filed to sign in", { type: "error", autoClose: 2000 });
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
          <button disabled={loading} className="btn btn-primary btn-block">
            Log In
          </button>
          <div className="p-2 text-center">
            <Link to="/forgot-password">Forgot Password? </Link>
          </div>
          <div className="p-2 text-center">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
