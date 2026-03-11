import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Vehicule extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marque: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    immatriculation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    puissanceFisc: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employe',
        key: 'id'
      },
      unique: "FK_D0599D4B1B65292"
    }
  }, {
    sequelize,
    tableName: 'Vehicule',
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
        name: "UNIQ_D0599D4B1B65292",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
    ]
  });
  }
}
