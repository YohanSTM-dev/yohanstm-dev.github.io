// Les identifiants de la base ne sont pas dans le dépôt : ils sont lus dans
// l'environnement. Copier .env.example en .env et le renseigner, puis lancer :
//   node --env-file=.env src/server.js
const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name} (voir .env.example)`);
  }
  return value;
};

export default {
  HOST: required("DB_HOST"),
  USER: required("DB_USER"),
  PASSWORD: required("DB_PASSWORD"),
  DB: required("DB_NAME"),
  PORT: Number(process.env.DB_PORT || 3306),
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
