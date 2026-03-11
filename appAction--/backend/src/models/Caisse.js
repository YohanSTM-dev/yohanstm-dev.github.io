import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Caisse extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_caisse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TypeCaisse',
        key: 'id'
      }
    },
    magasin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Magasin',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Caisse',
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
        name: "IDX_B50F56FE9372BFAF",
        using: "BTREE",
        fields: [
          { name: "type_caisse_id" },
        ]
      },
      {
        name: "IDX_B50F56FE20096AE3",
        using: "BTREE",
        fields: [
          { name: "magasin_id" },
        ]
      },
    ]
  });
  }
}
