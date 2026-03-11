import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class declaration_motif extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    declaration_casse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DeclarationCasse',
        key: 'id'
      }
    },
    motif_casse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'MotifCasse',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'declaration_motif',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "declaration_casse_id" },
          { name: "motif_casse_id" },
        ]
      },
      {
        name: "IDX_9436180D436D222D",
        using: "BTREE",
        fields: [
          { name: "declaration_casse_id" },
        ]
      },
      {
        name: "IDX_9436180D6B417F12",
        using: "BTREE",
        fields: [
          { name: "motif_casse_id" },
        ]
      },
    ]
  });
  }
}
