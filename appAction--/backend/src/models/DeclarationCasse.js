import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DeclarationCasse extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateDeclaration: {
      type: DataTypes.DATEONLY,
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
    tableName: 'DeclarationCasse',
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
        name: "IDX_F67BC7771B65292",
        using: "BTREE",
        fields: [
          { name: "employe_id" },
        ]
      },
    ]
  });
  }
}
