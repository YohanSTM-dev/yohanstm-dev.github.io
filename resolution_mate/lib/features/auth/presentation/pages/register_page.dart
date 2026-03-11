import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/widgets/app_loading_view.dart';
import '../controllers/auth_controller.dart';
import '../widgets/auth_shell.dart';

class RegisterPage extends ConsumerStatefulWidget {
  const RegisterPage({super.key});

  @override
  ConsumerState<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends ConsumerState<RegisterPage> {
  final _displayName = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  void dispose() {
    _displayName.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(authControllerProvider, (prev, next) {
      next.whenOrNull(
        error: (err, _) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(err.toString())),
          );
        },
      );
    });

    final authState = ref.watch(authControllerProvider);
    final isLoading = authState.isLoading;

    return AuthShell(
      title: 'Creer un compte',
      subtitle: 'Un profil simple pour suivre tes objectifs.',
      showBack: true,
      child: Stack(
        children: [
          Column(
            children: [
              TextField(
                controller: _displayName,
                decoration: const InputDecoration(labelText: 'Pseudo'),
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _email,
                decoration: const InputDecoration(labelText: 'Email'),
                keyboardType: TextInputType.emailAddress,
                textInputAction: TextInputAction.next,
                autofillHints: const [AutofillHints.email],
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _password,
                decoration: const InputDecoration(
                  labelText: 'Mot de passe',
                  helperText: 'Minimum 6 caracteres.',
                ),
                obscureText: true,
                textInputAction: TextInputAction.done,
                autofillHints: const [AutofillHints.newPassword],
                onSubmitted: (_) async {
                  if (!isLoading) {
                    await ref
                        .read(authControllerProvider.notifier)
                        .registerWithEmail(
                          email: _email.text.trim(),
                          password: _password.text,
                          displayName: _displayName.text.trim(),
                        );
                    if (context.mounted &&
                        !ref.read(authControllerProvider).hasError) {
                      Navigator.of(context).pop();
                    }
                  }
                },
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: isLoading
                      ? null
                      : () async {
                          await ref
                              .read(authControllerProvider.notifier)
                              .registerWithEmail(
                                email: _email.text.trim(),
                                password: _password.text,
                                displayName: _displayName.text.trim(),
                              );
                          if (context.mounted &&
                              !ref.read(authControllerProvider).hasError) {
                            Navigator.of(context).pop();
                          }
                        },
                  child: const Text('Creer'),
                ),
              ),
            ],
          ),
          if (isLoading)
            Positioned.fill(
              child: Container(
                color: Colors.white.withValues(alpha: 0.7),
                child: const AppLoadingView(message: 'Creation...'),
              ),
            ),
        ],
      ),
    );
  }
}
