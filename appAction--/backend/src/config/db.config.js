export default {
  HOST: "192.168.56.102",
  USER: "userAction",
  PASSWORD: "userAction",
  DB: "appAction",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
