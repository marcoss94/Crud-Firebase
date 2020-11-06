import "./App.css";
import { LinkForm } from "./components/LinkForm";
import { Links } from "./components/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="container p-4">
        <div className="row">
          <Signup />
        </div>
        <div className="row">
          <Links />
        </div>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
