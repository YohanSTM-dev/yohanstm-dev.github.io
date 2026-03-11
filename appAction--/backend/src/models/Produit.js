import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Produit extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code25: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    codeBarre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    libelleProduit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prixVente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seuilAlerteStock: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    colisage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    declaration_casse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DeclarationCasse',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Produit',
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
        name: "IDX_E618D5BB436D222D",
        using: "BTREE",
        fields: [
          { name: "declaration_casse_id" },
        ]
      },
    ]
  });
  }
}
