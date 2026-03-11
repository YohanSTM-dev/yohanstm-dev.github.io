import 'package:flutter/material.dart';
import 'resolution_list_screen.dart'; // <--- On importe l'écran suivant pour pouvoir y aller

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String pseudo = ""; // La variable pour stocker le nom

  void _enterApp() {
    if (pseudo.isNotEmpty) {
      // C'est ICI qu'on navigue vers la liste
      // On va devoir changer ResolutionListScreen pour qu'il accepte le pseudo !
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => ResolutionListScreen(currentUserPseudo: pseudo),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Bienvenue')),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Qui es-tu ?",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Ton Pseudo',
                hintText: 'Ex: Yohan',
              ),
              onChanged: (value) {
                pseudo = value; // On enregistre ce que l'utilisateur tape
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _enterApp,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                foregroundColor: Colors.white,
              ),
              child: const Text('Entrer dans le groupe'),
            ),
          ],
        ),
      ),
    );
  }
}