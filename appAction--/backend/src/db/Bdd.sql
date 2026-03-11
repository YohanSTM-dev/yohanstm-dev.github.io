CREATE TABLE Role (
   id INT AUTO_INCREMENT,
   nomRole VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE TypeContrat (
   id INT AUTO_INCREMENT,
   heureContrat VARCHAR(50),
   nomTypeContrat VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE Magasin (
   id INT AUTO_INCREMENT,
   ville VARCHAR(255),
   rue VARCHAR(255),
   adresse VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE TypeCaisse (
   id INT AUTO_INCREMENT,
   PRIMARY KEY(id)
);

CREATE TABLE MotifCasse (
   id INT AUTO_INCREMENT,
   PRIMARY KEY(id)
);

CREATE TABLE Emplacement (
   id INT AUTO_INCREMENT,
   nomZone VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE CouleurTache (
   id INT AUTO_INCREMENT,
   couleur VARCHAR(50),
   nomCouleurRep VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE Employe (
   id INT AUTO_INCREMENT,
   nomEmploye VARCHAR(50),
   prenomEmploye VARCHAR(50),
   matriculeEmploye VARCHAR(50),
   mdpEmploye VARCHAR(255), -- Augmenté à 255 pour le hashage du mot de passe (obligatoire en sécurité)
   date_embauche DATE,
   emailEmploye VARCHAR(100),
   magasin_id INT,
   type_contrat_id INT,
   PRIMARY KEY(id),
   FOREIGN KEY(magasin_id) REFERENCES Magasin(id),
   FOREIGN KEY(type_contrat_id) REFERENCES TypeContrat(id)
);

CREATE TABLE TacheMag (
   id INT AUTO_INCREMENT,
   nomTache VARCHAR(255),
   couleur_tache_id INT NOT NULL, -- Changé en INT pour correspondre à la PK de CouleurTache
   PRIMARY KEY(id),
   FOREIGN KEY(couleur_tache_id) REFERENCES CouleurTache(id)
);

CREATE TABLE Caisse (
   id INT AUTO_INCREMENT,
   type_caisse_id INT NOT NULL,
   magasin_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(type_caisse_id) REFERENCES TypeCaisse(id),
   FOREIGN KEY(magasin_id) REFERENCES Magasin(id)
);

CREATE TABLE Vehicule (
   id INT AUTO_INCREMENT,
   marque VARCHAR(50),
   immatriculation VARCHAR(50), -- Remplacement de 'Immatricule'
   puissanceFisc INT,
   employe_id INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(employe_id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id)
);

CREATE TABLE Planning (
   id INT AUTO_INCREMENT,
   dateDebut DATE,
   dateFin DATE,
   statut VARCHAR(50),
   employe_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id)
);

CREATE TABLE Messagerie (
   id INT AUTO_INCREMENT,
   texteMessagerie TEXT,
   dateEnvoi DATE,
   est_lu BOOLEAN, -- Remplacement de LOGICAL
   employe_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id)
);

CREATE TABLE DeclarationCasse (
   id INT AUTO_INCREMENT,
   dateDeclaration DATE,
   employe_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id)
);

CREATE TABLE Produit (
   id INT AUTO_INCREMENT,
   code25 VARCHAR(50),
   codeBarre VARCHAR(50),
   libelleProduit VARCHAR(50),
   prixVente INT, -- À passer en DECIMAL(10,2) si tu as des centimes
   seuilAlerteStock VARCHAR(50),
   colisage INT,
   declaration_casse_id INT, -- Retrait du NOT NULL, un produit n'est pas forcément cassé
   PRIMARY KEY(id),
   FOREIGN KEY(declaration_casse_id) REFERENCES DeclarationCasse(id)
);

CREATE TABLE DemandeReapro (
   id INT AUTO_INCREMENT,
   dateDemande DATE,
   statut VARCHAR(50),
   priorite VARCHAR(50),
   produit_id INT NOT NULL,
   employe_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(produit_id) REFERENCES Produit(id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id)
);

-- TABLES D'ASSOCIATION (Anciennement Asso_XX et rolesEmployer)

CREATE TABLE employe_role (
   employe_id INT,
   role_id INT,
   PRIMARY KEY(employe_id, role_id),
   FOREIGN KEY(employe_id) REFERENCES Employe(id),
   FOREIGN KEY(role_id) REFERENCES Role(id)
);

CREATE TABLE tache_planning (
   tache_id INT,
   planning_id INT,
   PRIMARY KEY(tache_id, planning_id),
   FOREIGN KEY(tache_id) REFERENCES TacheMag(id),
   FOREIGN KEY(planning_id) REFERENCES Planning(id)
);

CREATE TABLE declaration_motif (
   declaration_casse_id INT,
   motif_casse_id INT,
   PRIMARY KEY(declaration_casse_id, motif_casse_id),
   FOREIGN KEY(declaration_casse_id) REFERENCES DeclarationCasse(id),
   FOREIGN KEY(motif_casse_id) REFERENCES MotifCasse(id)
);

CREATE TABLE magasin_produit (
   magasin_id INT,
   produit_id INT,
   PRIMARY KEY(magasin_id, produit_id),
   FOREIGN KEY(magasin_id) REFERENCES Magasin(id),
   FOREIGN KEY(produit_id) REFERENCES Produit(id)
);

CREATE TABLE stock (
   produit_id INT,
   emplacement_id INT,
   quantite INT,
   PRIMARY KEY(produit_id, emplacement_id),
   FOREIGN KEY(produit_id) REFERENCES Produit(id),
   FOREIGN KEY(emplacement_id) REFERENCES Emplacement(id)
);