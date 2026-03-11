import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import initModels from "../models/init-models.js"; 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// on charge les 17 tables et leurs relations en une seule commande
db.models = initModels(sequelize); 

export default db;

// Note -> commande à utiliser pour le model : npx sequelize-auto -h 192.168.56.102 -d appAction -u userAction -x userAction -p 3306 --dialect mysql -o "./src/models" -l esm