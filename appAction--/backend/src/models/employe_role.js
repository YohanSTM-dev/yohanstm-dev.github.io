import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employe_role extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    employe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Employe',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employe_role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employe_id" },
          { name: "role_id" },
        ]
      },
      {
        name: "IDX_F816450A1B65292",
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
      {
        name: "IDX_F816450AD60322AC",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
