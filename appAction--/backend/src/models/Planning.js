import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Planning extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateDebut: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    statut: {
      type: DataTypes.STRING(50),
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
    tableName: 'Planning',
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
        name: "IDX_2DEFDDA01B65292",
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
    ]
  });
  }
}
