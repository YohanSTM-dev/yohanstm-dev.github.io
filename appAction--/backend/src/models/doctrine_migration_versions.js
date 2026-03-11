import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class doctrine_migration_versions extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    version: {
      type: DataTypes.STRING(191),
      allowNull: false,
      primaryKey: true
    },
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    execution_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'doctrine_migration_versions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
  }
}
