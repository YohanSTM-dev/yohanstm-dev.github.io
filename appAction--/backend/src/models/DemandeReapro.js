import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DemandeReapro extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateDemande: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    statut: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    priorite: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    produit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Produit',
        key: 'id'
      }
    },
    employe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employe',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'DemandeReapro',
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
        name: "IDX_79A14BA9F347EFB",
        using: "BTREE",
        fields: [
          { name: "produit_id" },
        ]
      },
      {
        name: "IDX_79A14BA91B65292",
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
    ]
  });
  }
}
