import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class magasin_produit extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    magasin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Magasin',
        key: 'id'
      }
    },
    produit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Produit',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'magasin_produit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "magasin_id" },
          { name: "produit_id" },
        ]
      },
      {
        name: "IDX_5E1A357B20096AE3",
        using: "BTREE",
        fields: [
          { name: "magasin_id" },
        ]
      },
      {
        name: "IDX_5E1A357BF347EFB",
        using: "BTREE",
        fields: [
          { name: "produit_id" },
        ]
      },
    ]
  });
  }
}
