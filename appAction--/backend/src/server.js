import expres from "express";
import db from "./db/connexionBdd.js";
import cors from "cors";
import employeRoutes from "./routes/employe.routes.js";

const app = expres();

app.use(cors());
app.use(expres.json());

db.sequelize.authenticate()
  .then(() => {console.log("Connexion à la base de données réussie.");})
  .catch(err => {console.error("Erreur de connexion à la base de données :", err);});
app.use("/api/employes", employeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur API démarré sur http://localhost:${PORT}.`);
});