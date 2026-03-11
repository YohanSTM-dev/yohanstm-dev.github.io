import {useState, useEffect} from "react";

export default function Register(){

    const [nomEmploye, setNomEmploye] = useState("");
    const [prenomEmploye, setPrenomEmploye] = useState("");
    const [matriculeEmploye, setMatriculeEmploye] = useState("");
    const [mdpEmploye, setMdpEmploye] = useState("");
    const [emailEmploye, setEmailEmploye] = useState("");
    const [dateEmbauche, setDateEmbauche] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // on empêche ici le rechargement brutal de la page 

        const nouvelEmploye = {
            nomEmploye: "nomEmploye",
            prenomEmploye: "prenomEmploye",
            matriculeEmploye: "matriculeEmploye",
            mdpEmploye: "mdpEmploye",
            dateEmbauche: "dateEmbauche",
            emailEmploye: "emailEmploye"
        };

        try{
            fetch("http:localhost:5000/api/employes",{
                method: "POST", // ici on met POST car on veut creer pas lire 
                headers: {
                    "Content-Type": "application/json" // ici on dit a l'api qu'on envoie du json
                }, 
                body:Json.stringify(nouvelEmploye) // ici on transforme notre objet JS en texte pour l'envoyer au back-end
        });
            if(!response.ok){
                throw new error("Errur lors de l'inscription")
            }

            alert("Employé inscrit avec succès !");
            setEmailEmploye("");
            setPrenomEmploye("");
            setNomEmploye("");
            setMdpEmploye("");
            setMatriculeEmploye("");
            setDateEmbauche("");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
        }

    }
    
   return(
    <>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Page d'inscription</h1>
            <p>Ceci est la page d'inscription.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-containerInscription" style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "0 auto", gap: "10px" }}>            
            <input type="text" placeholder="Nom" class="input-field" value={nomEmploye} onChange={(e) => setNomEmploye(e.target.value)} />
            <input type="text" placeholder="Prénom" class="input-field" value={prenomEmploye} onChange={(e) => setPrenomEmploye(e.target.value)} />
            <input type="text" placeholder="Matricule" class="input-field" value={matriculeEmploye} onChange={(e) => setMatriculeEmploye(e.target.value)} />
            <input type="password" placeholder="Mot de passe" class="input-field" value={mdpEmploye} onChange={(e) => setMdpEmploye(e.target.value)} />
            <input type="email" placeholder="Email" class="input-field" value={emailEmploye} onChange={(e) => setEmailEmploye(e.target.value)} />
            <input type="date" placeholder="Date d'embauche" class="input-field" value={dateEmbauche} onChange={(e) => setDateEmbauche(e.target.value)} />
            <button type="submit" className="submit-button">Inscrire l'employé</button>
        </form>
    </>
   );
}

