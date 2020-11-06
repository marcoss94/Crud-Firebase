import React from "react";
import { Links } from "./Links";
import Signup from "./Signup";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      return toast("Failed to log out", { type: "error", autoClose: 2000 });
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4 p-2">
          <div className="card card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4>Hi, {currentUser.email}</h4>
                <Link to="/update-profile">Update</Link>
              </div>
              <div>
                <i className="material-icons" onClick={handleLogout}>
                  logout
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Links />
      </div>
    </>
  );
}

export default Dashboard;
