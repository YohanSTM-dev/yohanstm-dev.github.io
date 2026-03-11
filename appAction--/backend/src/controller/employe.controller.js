import db from "../db/connexionBdd.js";

const Employe = db.models.Employe;

export const getAllEmployes = async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.status(200).json(employes);
    } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des employés." });
    }
};

export const createEmploye = async (req, res) => {
    try {
        const newEmplye =  await Employe.create(req.body);
        res.status(201).json(newEmplye);
    } catch (error) {
        console.error("Erreur lors de la création de l'employé :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de l'employé." });
    }
}