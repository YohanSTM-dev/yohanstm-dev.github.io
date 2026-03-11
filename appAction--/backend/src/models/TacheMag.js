import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class TacheMag extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomTache: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    couleur_tache_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CouleurTache',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'TacheMag',
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
        name: "IDX_652793C3C7D3F628",
        using: "BTREE",
        fields: [
          { name: "couleur_tache_id" },
        ]
      },
    ]
  });
  }
}
