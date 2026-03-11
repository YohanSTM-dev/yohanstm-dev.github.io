import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/widgets/app_loading_view.dart';
import '../controllers/auth_controller.dart';
import '../widgets/auth_shell.dart';
import 'register_page.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _showResetDialog() async {
    final controller = TextEditingController(text: _email.text.trim());
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Reinitialiser le mot de passe'),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.emailAddress,
          decoration: const InputDecoration(labelText: 'Email'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Envoyer'),
          ),
        ],
      ),
    );

    if (!mounted) {
      controller.dispose();
      return;
    }

    if (result == true) {
      final email = controller.text.trim();
      if (email.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Entre ton email.')),
        );
      } else {
        await ref
            .read(authControllerProvider.notifier)
            .sendPasswordReset(email: email);
        if (mounted && !ref.read(authControllerProvider).hasError) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Email de reinitialisation envoye.')),
          );
        }
      }
    }

    controller.dispose();
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
    final showGoogle = kIsWeb ||
        defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS;

    return AuthShell(
      title: 'Connexion',
      subtitle: 'Reprends tes objectifs et avance avec ton groupe.',
      child: Stack(
        children: [
          Column(
            children: [
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
                decoration: const InputDecoration(labelText: 'Mot de passe'),
                obscureText: true,
                textInputAction: TextInputAction.done,
                autofillHints: const [AutofillHints.password],
                onSubmitted: (_) {
                  if (!isLoading) {
                    ref.read(authControllerProvider.notifier).signInWithEmail(
                          email: _email.text.trim(),
                          password: _password.text,
                        );
                  }
                },
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: isLoading
                      ? null
                      : () {
                          ref.read(authControllerProvider.notifier).signInWithEmail(
                                email: _email.text.trim(),
                                password: _password.text,
                              );
                        },
                  child: const Text('Se connecter'),
                ),
              ),
              const SizedBox(height: 12),
              if (showGoogle)
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: isLoading
                        ? null
                        : () {
                            ref
                                .read(authControllerProvider.notifier)
                                .signInWithGoogle();
                          },
                    child: const Text('Continuer avec Google'),
                  ),
                ),
              if (!showGoogle)
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    'Google Sign-In est disponible sur mobile et web.',
                    textAlign: TextAlign.center,
                    style: Theme.of(context)
                        .textTheme
                        .bodySmall
                        ?.copyWith(
                          color:
                              Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                  ),
                ),
              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: isLoading ? null : _showResetDialog,
                  child: const Text('Mot de passe oublie ?'),
                ),
              ),
              const Divider(height: 28),
              SizedBox(
                width: double.infinity,
                child: TextButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const RegisterPage()),
                    );
                  },
                  child: const Text('Creer un compte'),
                ),
              ),
            ],
          ),
          if (isLoading)
            Positioned.fill(
              child: Container(
                color: Colors.white.withValues(alpha: 0.7),
                child: const AppLoadingView(message: 'Connexion...'),
              ),
            ),
        ],
      ),
    );
  }
}
