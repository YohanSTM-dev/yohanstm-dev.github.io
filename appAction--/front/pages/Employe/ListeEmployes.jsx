import { useState, useEffect } from "react";

export default function ListeEmployes() {
  const [employes, setEmployes] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/employes")
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error("Impossible de joindre l'API");
        }
        return reponse.json(); 
      })
      .then((donnees) => {
        setEmployes(donnees); 
      })
      .catch((err) => {
        console.error(err);
        setErreur(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Liste du Personnel</h1>
      
      {erreur && <p style={{ color: "red", fontWeight: "bold" }}>Erreur : {erreur}</p>}

      {employes.length === 0 && !erreur ? (
        <p>Chargement des employés depuis la base de données...</p>
      ) : (
        <ul style={{ lineHeight: "1.8" }}>
          {employes.map((employe) => (
            <li key={employe.id}>
              <strong>{employe.nomEmploye} {employe.prenomEmploye}</strong> - 
              Matricule : {employe.matriculeEmploye || "Non renseigné"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}