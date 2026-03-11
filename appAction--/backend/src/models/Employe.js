import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Employe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomEmploye: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prenomEmploye: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    matriculeEmploye: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mdpEmploye: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_embauche: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    emailEmploye: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    magasin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Magasin',
        key: 'id'
      }
    },
    type_contrat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TypeContrat',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Employe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IDX_37B9EA2520096AE3",
        using: "BTREE",
        fields: [
          { name: "magasin_id" },
        ]
      },
      {
        name: "IDX_37B9EA25520D03A",
        using: "BTREE",
        fields: [
          { name: "type_contrat_id" },
        ]
      },
    ]
  });
  }
}
