import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Messagerie extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    texteMessagerie: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateEnvoi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    est_lu: {
      type: DataTypes.TINYINT,
      allowNull: true
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
    tableName: 'Messagerie',
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
        name: "IDX_5BB5F5DC1B65292",
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
    ]
  });
  }
}
