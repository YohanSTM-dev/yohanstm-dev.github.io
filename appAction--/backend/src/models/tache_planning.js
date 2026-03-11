import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tache_planning extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tache_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'TacheMag',
        key: 'id'
      }
    },
    planning_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Planning',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tache_planning',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tache_id" },
          { name: "planning_id" },
        ]
      },
      {
        name: "IDX_6F58AECBD2235D39",
        using: "BTREE",
        fields: [
          { name: "tache_id" },
        ]
      },
      {
        name: "IDX_6F58AECB3D865311",
        using: "BTREE",
        fields: [
          { name: "planning_id" },
        ]
      },
    ]
  });
  }
}
