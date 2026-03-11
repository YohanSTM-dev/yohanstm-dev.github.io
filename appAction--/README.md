# appAction

Projet organisé en 2 parties:

- `front`: interface React + Vite
- `backend`: API Node.js + Sequelize

## Arborescence

```text
appAction--
|-- front/
|   |-- public/
|   |-- src/
|   |-- index.html
|   |-- eslint.config.js
|   |-- package.json
|   `-- vite.config.js
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |   `-- db.config.js
|   |   `-- db/
|   |       `-- connexionBdd.js
|   |-- connexionBdd.js
|   `-- package.json
`-- README.md
```

## Notes

- `backend/connexionBdd.js` est conservé comme alias de compatibilité vers `backend/src/db/connexionBdd.js`.
- La config base de données est centralisée dans `backend/src/config/db.config.js`.
