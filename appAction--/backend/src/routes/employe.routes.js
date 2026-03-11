import express from "express";
import { getAllEmployes, createEmploye } from "../controller/employe.controller.js";

const router = express.Router();

router.get("/employes", getAllEmployes); // -> info get pour récupérer tous les employés
router.post("/employes", createEmploye); // -> info post pour créer un nouvel employé

export default router;