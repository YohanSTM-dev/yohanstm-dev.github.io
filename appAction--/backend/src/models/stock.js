import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stock extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    produit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Produit',
        key: 'id'
      }
    },
    emplacement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Emplacement',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'stock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "produit_id" },
          { name: "emplacement_id" },
        ]
      },
      {
        name: "IDX_4B365660F347EFB",
        using: "BTREE",
        fields: [
          { name: "produit_id" },
        ]
      },
      {
        name: "IDX_4B365660C4598A51",
        using: "BTREE",
        fields: [
          { name: "emplacement_id" },
        ]
      },
    ]
  });
  }
}
