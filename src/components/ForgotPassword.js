import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const initialStateValue = {
    email: "",
  };

  const [values, setValues] = useState(initialStateValue);
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      setLoading(true);
      await resetPassword(values.email);
      toast("Check your inbox for further instructions", {
        type: "success",
        autoClose: 2000,
      });
    } catch (error) {
      toast("Filed to reset password", { type: "error", autoClose: 2000 });
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
          <button disabled={loading} className="btn btn-primary btn-block">
            Reset Password
          </button>
          <div className="p-2 text-center">
            <Link to="/login">Login </Link>
          </div>
          <div className="p-2 text-center">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
