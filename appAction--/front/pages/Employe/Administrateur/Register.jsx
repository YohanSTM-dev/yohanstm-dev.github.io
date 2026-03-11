import {useState , useEffect } from "react";

export default function Register(){

    // champs pour Magasin
    const [villeMagasin, setVilleMagasin] = useState("");
    const [rueMagasin, setRueMagasin] = useState("");
    const [adresseMagasin, setAdresseMagasin] = useState("");

    // champs pour Employé
    const [nomEmploye, setNomEmploye] = useState("");
    const [prenomEmploye, setPrenomEmploye] = useState("");
    const [matriculeEmploye, setMatriculeEmploye] = useState("");
    const [mdpEmploye, setMdpEmploye] = useState("");
    const [emailEmploye, setEmailEmploye] = useState("");
    const [dateEmbauche, setDateEmbauche] = useState("");

    // champs pour type de contrat 
    const [heureContrat, setHeureContrat] = useState("");
    const [nomTypeContrat, setNomTypeContrat] = useState("");

    // button d'envoi pour la creation d'un type de contrat
    const handleSubmitContrat = (e) => {
        e.preventDefault();
        const nouveauContrat = {
            heureContrat: "heureContrat",
            nomTypeContrat: "nomTypeContrat"
        };
        try{
            fetch("http:localhost:5000/api/typeContrats", {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nouveauContrat)
            });
        if(!response.ok){
            throw new error("Erreur lors de la recup avec l'api");
        } 
        alert("Contrat créé avec succès !!");
        setsetHeureContrat("");
        setNomTypeContrat("");

        } catch (error) {
            console.error("Erreur lors de la creation du contrat:", error);
        }
    }

    const handleSubmitEmploye = (e) => {
        e.preventDefault();
        const nouveauEmploye = {
            nomEmploye: "nomEmploye",
            prenomEmploye: "prenomEmploye",
            matriculeEmploye: "matriculeEmploye",
            mdpEmploye: "mdpEmploye",
            dateEmbauche: "dateEmbauche",
            emailEmploye: "emailEmploye"
        };

        try{
            fetch("http:localhost:5000/api/employes", {
                method: "POST",
                header:{
                     "content-Type": "application/json"
                },
                body: Json.stringify(nouveauEmploye);
        });
        if(!response.ok){
            throw new error("Erreur lors de la recup avec l'api");
        }

        alert("Employé créé avec succès !!");
        setEmailEmploye("");
        setPrenomEmploye("");
        setNomEmploye("");
        setMdpEmploye("");
        setMatriculeEmploye("");
        setDateEmbauche("");

        }catch (error) {
            console.error("Erreur lors de la creation de l'employé:", error);
        }
    }

    const handleSubmitMagasin = (e) => {
        e.preventDefault();
        const nouveauMagasin = {
            villeMagasin: "villeMagasin",
            rueMagasin: "rueMagasin",
            adresseMagasin: "adresseMagasin"
        };
        try{
            fetch("http:localhost:5000/api/magasins", {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nouveauMagasin)
            });
        if(!response.ok){
            throw new error("Erreur lors de la recup avec l'api");
        }
        alert("Magasin créé avec succès !!");
        setVilleMagasin("");
        setRueMagasin("");
        setAdresseMagasin("");
        } catch (error) {
            console.error("Erreur lors de la creation du magasin:", error);
        }
    }   

    return(
        <>
        <h1> niveau Administrateur </h1>
        <p> En Tant que Administrateur vous avez la capacité de crée des types de contrats, Magasin, et Employer</p>

        <h2> Creation</h2>
        <h3> Nouveau type de contrat </h3>

        <form onSubmit={handleSubmitContrat} className="form-containerInscription" style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "0 auto", gap: "10px" }}>
            <input text="heureContrat" holder="heure " value={heureContrat} onChange={(e) => setHeureContrat(e.target.value)} />
            <input text="nomTypeContrat" holder="nom du type de contrat" value={nomTypeContrat} onChange={(e) => setNomTypeContrat(e.target.value)} />
            <button type="submit">Créer le type de contrat</button>
        </form>

        </>

        
    )



}

