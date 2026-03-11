import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Connexion/Login.jsx"; 
import ListeEmployes from "../pages/Employe/ListeEmployes.jsx";
import Register from "../pages/Connexion/Register.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/employes" element={<ListeEmployes />} />

    </Routes>
  );
}

export default App;