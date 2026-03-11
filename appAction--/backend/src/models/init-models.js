import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Caisse from  "./Caisse.js";
import _CouleurTache from  "./CouleurTache.js";
import _DeclarationCasse from  "./DeclarationCasse.js";
import _DemandeReapro from  "./DemandeReapro.js";
import _Emplacement from  "./Emplacement.js";
import _Employe from  "./Employe.js";
import _Magasin from  "./Magasin.js";
import _Messagerie from  "./Messagerie.js";
import _MotifCasse from  "./MotifCasse.js";
import _Planning from  "./Planning.js";
import _Produit from  "./Produit.js";
import _Role from  "./Role.js";
import _TacheMag from  "./TacheMag.js";
import _TypeCaisse from  "./TypeCaisse.js";
import _TypeContrat from  "./TypeContrat.js";
import _Vehicule from  "./Vehicule.js";
import _declaration_motif from  "./declaration_motif.js";
import _doctrine_migration_versions from  "./doctrine_migration_versions.js";
import _employe_role from  "./employe_role.js";
import _magasin_produit from  "./magasin_produit.js";
import _messenger_messages from  "./messenger_messages.js";
import _stock from  "./stock.js";
import _tache_planning from  "./tache_planning.js";

export default function initModels(sequelize) {
  const Caisse = _Caisse.init(sequelize, DataTypes);
  const CouleurTache = _CouleurTache.init(sequelize, DataTypes);
  const DeclarationCasse = _DeclarationCasse.init(sequelize, DataTypes);
  const DemandeReapro = _DemandeReapro.init(sequelize, DataTypes);
  const Emplacement = _Emplacement.init(sequelize, DataTypes);
  const Employe = _Employe.init(sequelize, DataTypes);
  const Magasin = _Magasin.init(sequelize, DataTypes);
  const Messagerie = _Messagerie.init(sequelize, DataTypes);
  const MotifCasse = _MotifCasse.init(sequelize, DataTypes);
  const Planning = _Planning.init(sequelize, DataTypes);
  const Produit = _Produit.init(sequelize, DataTypes);
  const Role = _Role.init(sequelize, DataTypes);
  const TacheMag = _TacheMag.init(sequelize, DataTypes);
  const TypeCaisse = _TypeCaisse.init(sequelize, DataTypes);
  const TypeContrat = _TypeContrat.init(sequelize, DataTypes);
  const Vehicule = _Vehicule.init(sequelize, DataTypes);
  const declaration_motif = _declaration_motif.init(sequelize, DataTypes);
  const doctrine_migration_versions = _doctrine_migration_versions.init(sequelize, DataTypes);
  const employe_role = _employe_role.init(sequelize, DataTypes);
  const magasin_produit = _magasin_produit.init(sequelize, DataTypes);
  const messenger_messages = _messenger_messages.init(sequelize, DataTypes);
  const stock = _stock.init(sequelize, DataTypes);
  const tache_planning = _tache_planning.init(sequelize, DataTypes);

  DeclarationCasse.belongsToMany(MotifCasse, { as: 'motif_casse_id_MotifCasses', through: declaration_motif, foreignKey: "declaration_casse_id", otherKey: "motif_casse_id" });
  Emplacement.belongsToMany(Produit, { as: 'produit_id_Produit_stocks', through: stock, foreignKey: "emplacement_id", otherKey: "produit_id" });
  Employe.belongsToMany(Role, { as: 'role_id_Roles', through: employe_role, foreignKey: "employe_id", otherKey: "role_id" });
  Magasin.belongsToMany(Produit, { as: 'produit_id_Produits', through: magasin_produit, foreignKey: "magasin_id", otherKey: "produit_id" });
  MotifCasse.belongsToMany(DeclarationCasse, { as: 'declaration_casse_id_DeclarationCasses', through: declaration_motif, foreignKey: "motif_casse_id", otherKey: "declaration_casse_id" });
  Planning.belongsToMany(TacheMag, { as: 'tache_id_TacheMags', through: tache_planning, foreignKey: "planning_id", otherKey: "tache_id" });
  Produit.belongsToMany(Emplacement, { as: 'emplacement_id_Emplacements', through: stock, foreignKey: "produit_id", otherKey: "emplacement_id" });
  Produit.belongsToMany(Magasin, { as: 'magasin_id_Magasins', through: magasin_produit, foreignKey: "produit_id", otherKey: "magasin_id" });
  Role.belongsToMany(Employe, { as: 'employe_id_Employes', through: employe_role, foreignKey: "role_id", otherKey: "employe_id" });
  TacheMag.belongsToMany(Planning, { as: 'planning_id_Plannings', through: tache_planning, foreignKey: "tache_id", otherKey: "planning_id" });
  TacheMag.belongsTo(CouleurTache, { as: "couleur_tache", foreignKey: "couleur_tache_id"});
  CouleurTache.hasMany(TacheMag, { as: "TacheMags", foreignKey: "couleur_tache_id"});
  Produit.belongsTo(DeclarationCasse, { as: "declaration_casse", foreignKey: "declaration_casse_id"});
  DeclarationCasse.hasMany(Produit, { as: "Produits", foreignKey: "declaration_casse_id"});
  declaration_motif.belongsTo(DeclarationCasse, { as: "declaration_casse", foreignKey: "declaration_casse_id"});
  DeclarationCasse.hasMany(declaration_motif, { as: "declaration_motifs", foreignKey: "declaration_casse_id"});
  stock.belongsTo(Emplacement, { as: "emplacement", foreignKey: "emplacement_id"});
  Emplacement.hasMany(stock, { as: "stocks", foreignKey: "emplacement_id"});
  DeclarationCasse.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasMany(DeclarationCasse, { as: "DeclarationCasses", foreignKey: "employe_id"});
  DemandeReapro.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasMany(DemandeReapro, { as: "DemandeReapros", foreignKey: "employe_id"});
  Messagerie.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasMany(Messagerie, { as: "Messageries", foreignKey: "employe_id"});
  Planning.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasMany(Planning, { as: "Plannings", foreignKey: "employe_id"});
  Vehicule.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasOne(Vehicule, { as: "Vehicule", foreignKey: "employe_id"});
  employe_role.belongsTo(Employe, { as: "employe", foreignKey: "employe_id"});
  Employe.hasMany(employe_role, { as: "employe_roles", foreignKey: "employe_id"});
  Caisse.belongsTo(Magasin, { as: "magasin", foreignKey: "magasin_id"});
  Magasin.hasMany(Caisse, { as: "Caisses", foreignKey: "magasin_id"});
  Employe.belongsTo(Magasin, { as: "magasin", foreignKey: "magasin_id"});
  Magasin.hasMany(Employe, { as: "Employes", foreignKey: "magasin_id"});
  magasin_produit.belongsTo(Magasin, { as: "magasin", foreignKey: "magasin_id"});
  Magasin.hasMany(magasin_produit, { as: "magasin_produits", foreignKey: "magasin_id"});
  declaration_motif.belongsTo(MotifCasse, { as: "motif_casse", foreignKey: "motif_casse_id"});
  MotifCasse.hasMany(declaration_motif, { as: "declaration_motifs", foreignKey: "motif_casse_id"});
  tache_planning.belongsTo(Planning, { as: "planning", foreignKey: "planning_id"});
  Planning.hasMany(tache_planning, { as: "tache_plannings", foreignKey: "planning_id"});
  DemandeReapro.belongsTo(Produit, { as: "produit", foreignKey: "produit_id"});
  Produit.hasMany(DemandeReapro, { as: "DemandeReapros", foreignKey: "produit_id"});
  magasin_produit.belongsTo(Produit, { as: "produit", foreignKey: "produit_id"});
  Produit.hasMany(magasin_produit, { as: "magasin_produits", foreignKey: "produit_id"});
  stock.belongsTo(Produit, { as: "produit", foreignKey: "produit_id"});
  Produit.hasMany(stock, { as: "stocks", foreignKey: "produit_id"});
  employe_role.belongsTo(Role, { as: "role", foreignKey: "role_id"});
  Role.hasMany(employe_role, { as: "employe_roles", foreignKey: "role_id"});
  tache_planning.belongsTo(TacheMag, { as: "tache", foreignKey: "tache_id"});
  TacheMag.hasMany(tache_planning, { as: "tache_plannings", foreignKey: "tache_id"});
  Caisse.belongsTo(TypeCaisse, { as: "type_caisse", foreignKey: "type_caisse_id"});
  TypeCaisse.hasMany(Caisse, { as: "Caisses", foreignKey: "type_caisse_id"});
  Employe.belongsTo(TypeContrat, { as: "type_contrat", foreignKey: "type_contrat_id"});
  TypeContrat.hasMany(Employe, { as: "Employes", foreignKey: "type_contrat_id"});

  return {
    Caisse,
    CouleurTache,
    DeclarationCasse,
    DemandeReapro,
    Emplacement,
    Employe,
    Magasin,
    Messagerie,
    MotifCasse,
    Planning,
    Produit,
    Role,
    TacheMag,
    TypeCaisse,
    TypeContrat,
    Vehicule,
    declaration_motif,
    doctrine_migration_versions,
    employe_role,
    magasin_produit,
    messenger_messages,
    stock,
    tache_planning,
  };
}
