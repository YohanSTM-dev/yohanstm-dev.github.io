import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'login_screen.dart'; // Pour la déconnexion

class ResolutionListScreen extends StatefulWidget {
  final String currentUserPseudo;

  const ResolutionListScreen({
    super.key,
    required this.currentUserPseudo,
  });

  @override
  State<ResolutionListScreen> createState() => _ResolutionListScreenState();
}

class _ResolutionListScreenState extends State<ResolutionListScreen> {
  // Variable qui retient dans quel groupe on est actuellement
  // Par défaut, on commence dans l'espace PERSO de l'utilisateur
  late String currentGroupCode;
  late String currentGroupName;
  late List<Map<String,String>> mesGroupesVisites = [];

  @override
  void initState() {
    super.initState();
    // Au lancement, on construit le code perso : "PERSO_Yohan"
    currentGroupCode = "PERSO_${widget.currentUserPseudo}";
    currentGroupName = "Mon Espace Perso";
  }

  // Fonction pour creer un groupe
  void _createGroup(String name, String code){
    setState(() {
      currentGroupName = name;
      currentGroupCode = code;
    });

  }


  // Fonction pour rejoindre un groupe
  void _joinGroup(String name, String code){
    setState(() {
      currentGroupName = name;
      currentGroupCode = code;
    });

  }



  // Fonction pour changer de groupe
  void _changeGroup(String name, String code) {
    setState(() {
      // 1. On change le groupe actuel
      currentGroupName = name;
      currentGroupCode = code;

      // ET SI on ne l'a pas déjà dans la liste
      bool estDejaDansLaListe = mesGroupesVisites.any((element) => element['code'] == code);
      bool estLeGroupePerso = code.startsWith("PERSO_");

      if (!estDejaDansLaListe && !estLeGroupePerso) {
        mesGroupesVisites.add({
          'name': name,
          'code': code,
        });
      }
    });
    // Navigator.pop(context); // On ferme le drawer après le changement
  }



  // Fonction pour afficher la boîte de dialogue "Rejoindre un groupe"
void _showJoinDialog() {
    String nameSaisi = ""; // C'est le nom, qui sert aussi de code
    String passwordSaisi = "";

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Rejoindre un groupe"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              autofocus: true,
              decoration: const InputDecoration(
                labelText: "Nom du groupe exact", // Plus de "code"
                border: OutlineInputBorder(),
              ),
              onChanged: (val) => nameSaisi = val.trim(),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: const InputDecoration(
                labelText: "Mot de passe",
                border: OutlineInputBorder(),
              ),
              obscureText: true,
              onChanged: (val) => passwordSaisi = val,
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Annuler")),
          ElevatedButton(
            onPressed: () async {
              if (nameSaisi.isNotEmpty && passwordSaisi.isNotEmpty) {
                
                // 1. ON CHERCHE LE GROUPE PAR SON NOM
                var groupDoc = await FirebaseFirestore.instance
                    .collection('groups')
                    .doc(nameSaisi) // Le nom EST l'identifiant
                    .get();

                if (context.mounted) {
                  // CAS 1 : INTROUVABLE
                  if (!groupDoc.exists) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Aucun groupe ne porte ce nom !"), backgroundColor: Colors.red),
                    );
                    return;
                  }

                  // CAS 2 : MAUVAIS MOT DE PASSE
                  if (groupDoc['password'] != passwordSaisi) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Mot de passe incorrect !"), backgroundColor: Colors.red),
                    );
                    return;
                  }

                  // CAS 3 : SUCCÈS
                  Navigator.pop(context);
                  _changeGroup(nameSaisi, nameSaisi); // Nom = Code
                  
                  ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Bienvenue dans $nameSaisi !"), backgroundColor: Colors.green),
                  );
                }
              }
            },
            child: const Text("Rejoindre"),
          )
        ],
      ),
    );
  }

  // Fonction pour afficher la boîte de dialogue "Créer un groupe"
  void _showCreateDialog() {
    String groupName = "";
    String password = "";

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Nouveau Groupe"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ON A ENLEVÉ LE CHAMP CODE ! IL RESTE QUE LE NOM.
            TextField(
              autofocus: true,
              decoration: const InputDecoration(
                labelText: "Nom du groupe (Unique)",
                hintText: "ex: LesSportifsDuDimanche", // Pas d'espace c'est mieux pour un ID
              ),
              onChanged: (val) => groupName = val.trim(), // .trim() enlève les espaces avant/après
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: const InputDecoration(labelText: "Mot de passe secret"),
              obscureText: true,
              onChanged: (val) => password = val,
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Annuler")),
          ElevatedButton(
            onPressed: () async {
              if (groupName.isNotEmpty && password.isNotEmpty) {
                
                // 1. LE TEST D'UNICITÉ : On vérifie si ce NOM est déjà pris
                // On utilise le nom directement comme ID
                var docCheck = await FirebaseFirestore.instance.collection('groups').doc(groupName).get();
                
                if (docCheck.exists) {
                   // AÏE, le nom est pris !
                   if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Le nom '$groupName' est déjà pris ! Ajoute un chiffre ou change de nom."),
                          backgroundColor: Colors.orange
                        ),
                      );
                   }
                   return; // On arrête tout, on ne crée pas.
                }

                // 2. C'EST LIBRE ! ON CRÉE
                // Note : group_code devient égal à groupName, c'est la même chose maintenant.
                await FirebaseFirestore.instance.collection('groups').doc(groupName).set({
                  'name': groupName,
                  'password': password,
                  'createdBy': widget.currentUserPseudo,
                  'createdAt': FieldValue.serverTimestamp(),
                });

                if (context.mounted) {
                  Navigator.pop(context);
                  // On entre dans le groupe (le code est le nom)
                  _changeGroup(groupName, groupName); 
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Groupe créé avec succès !'), backgroundColor: Colors.green),
                  );
                }
              }
            },
            child: const Text("Valider"),
          )
        ],
      ),
    );
  }

  // Fonction d'ajout (modifiée pour utiliser le groupe actuel)
  void _openAddResolutionDialog() {
    String newResolutionTitle = "";
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Ajouter dans : $currentGroupName'), // On rappelle où on ajoute
          content: TextField(
            autofocus: true,
            decoration: const InputDecoration(hintText: "Ex: Lire 10 pages"),
            onChanged: (value) => newResolutionTitle = value,
          ),
          actions: [  
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Annuler')),
            ElevatedButton(
              onPressed: () {
                if (newResolutionTitle.isNotEmpty) {
                  FirebaseFirestore.instance.collection('resolutions').add({
                    "title": newResolutionTitle,
                    "isDone": false,
                    "createdAt": FieldValue.serverTimestamp(),
                    "author": widget.currentUserPseudo,
                    "group_code": currentGroupCode, // <--- On utilise le groupe ACTUEL
                  });
                  Navigator.pop(context);
                }
              },
              child: const Text('Ajouter'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 1. L'AppBar change de titre selon le groupe
      appBar: AppBar(
        title: Text(currentGroupName), 
        backgroundColor: Colors.deepPurple.shade100,
        actions: [
          // Bouton Déconnexion
           IconButton(
            icon: const Icon(Icons.logout),
            color: Colors.deepPurple,
            tooltip: "Se déconnecter",
            onPressed: () {
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
          ),
        ],
      ),

      // 2. LE MENU LATÉRAL (DRAWER) 
drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            // --- EN-TÊTE ---
            UserAccountsDrawerHeader(
              accountName: Text(widget.currentUserPseudo, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              accountEmail: const Text("Membre actif"),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.white,
                child: Text(widget.currentUserPseudo[0].toUpperCase(), style: const TextStyle(fontSize: 30)),
              ),
              decoration: const BoxDecoration(color: Colors.deepPurple),
            ),
            
            // --- MON ESPACE (Fixe) ---
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Mon Espace Perso'),
              selected: currentGroupName == "Mon Espace Perso", // Surligne si on est dessus
              selectedColor: Colors.deepPurple,
              onTap: () {
                Navigator.pop(context);
                _changeGroup("Mon Espace Perso", "PERSO_${widget.currentUserPseudo}");
              },
            ),
            
            const Divider(), 

            // --- LISTE DES GROUPES VISITÉS (La Boucle Magique) ---
            // Si la liste n'est pas vide, on affiche un petit titre "RÉCENTS"
            if (mesGroupesVisites.isNotEmpty)
               const Padding(
                 padding: EdgeInsets.only(left: 16, top: 10, bottom: 5),
                 child: Text("GROUPES RÉCENTS", style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),
               ),

            // Pour chaque groupe dans ma mémoire, je crée un bouton
            for (var groupe in mesGroupesVisites)
              ListTile(
                leading: const Icon(Icons.group_outlined),
                title: Text(groupe['name']!), // Le point d'exclamation affirme que le nom existe
                selected: currentGroupCode == groupe['code'], // Surligne si actif
                selectedColor: Colors.deepPurple,
                onTap: () {
                  Navigator.pop(context);
                  _changeGroup(groupe['name']!, groupe['code']!);
                },
              ),
    
            const Divider(),

            // --- ACTIONS (Rejoindre / Créer) ---
            ListTile(
              leading: const Icon(Icons.add_circle_outline, color: Colors.deepPurple),
              title: const Text('Créer un nouveau groupe'),
              onTap: () {
                Navigator.pop(context);
                _showCreateDialog();
              },
            ),

            ListTile(
              leading: const Icon(Icons.login, color: Colors.deepPurple), // Icône "Entrer"
              title: const Text('Rejoindre avec un code'),
              onTap: () {
                Navigator.pop(context);
                _showJoinDialog();
              },
            ),
          ],
        ),
      ),

      // 3. LE CONTENU (La liste filtrée)
body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection('resolutions')
            .where('group_code', isEqualTo: currentGroupCode)
            .orderBy('createdAt', descending: true)
            .snapshots(),
        builder: (context, snapshot) {
          // 1. Cas : Ça charge
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          // 2. Cas : Il y a une ERREUR (C'est souvent ça l'écran blanc !)
          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Text(
                  "Oups ! Erreur : ${snapshot.error}",
                  style: const TextStyle(color: Colors.red),
                  textAlign: TextAlign.center,
                ),
              ),
            );
          }

          // 3. Cas : C'est VIDE (Le groupe est nouveau)
          if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.meeting_room_outlined, size: 80, color: Colors.deepPurple.shade200),
                  const SizedBox(height: 20),
                  Text(
                    "Bienvenue dans $currentGroupName !",
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  const Text("C'est encore vide ici..."),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    icon: const Icon(Icons.add),
                    label: const Text("lance ton premier objectif"),
                    onPressed: _openAddResolutionDialog, // Le bouton ouvre direct la création
                  )
                ],
              ),
            );
          }

          // 4. Cas : Il y a des données (Le code normal)
          final resolutions = snapshot.data!.docs;

          return ListView.builder(
            itemCount: resolutions.length,
            itemBuilder: (context, index) {
              final resolutionDoc = resolutions[index];
              final data = resolutionDoc.data() as Map<String, dynamic>;
              final docId = resolutionDoc.id;

              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                child: ListTile(
                  title: Text(
                    data['title'] ?? "Sans titre",
                    style: TextStyle(
                      decoration: (data['isDone'] == true) ? TextDecoration.lineThrough : null,
                      color: (data['isDone'] == true) ? Colors.grey : Colors.black,
                    ),
                  ),
                  subtitle: Text("Par : ${data['author'] ?? 'Inconnu'}", style: const TextStyle(color: Colors.deepPurple)),
                  leading: Checkbox(
                    value: data['isDone'] ?? false,
                    onChanged: (bool? newValue) {
                      FirebaseFirestore.instance.collection('resolutions').doc(docId).update({"isDone": newValue});
                    },
                  ),
                  trailing: (data['author'] == widget.currentUserPseudo)
                      ? IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () => FirebaseFirestore.instance.collection('resolutions').doc(docId).delete(),
                        )
                      : null,
                ),
              );
            },
          );
        },
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: _openAddResolutionDialog,
        backgroundColor: Colors.deepPurple,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}