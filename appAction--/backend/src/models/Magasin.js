import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Magasin extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ville: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Magasin',
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
    ]
  });
  }
}
