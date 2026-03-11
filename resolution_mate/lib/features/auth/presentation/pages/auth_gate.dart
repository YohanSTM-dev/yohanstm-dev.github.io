import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/widgets/app_error_view.dart';
import '../../../../core/widgets/app_loading_view.dart';
import '../../../goals/presentation/pages/home_page.dart';
import '../controllers/auth_controller.dart';
import 'login_page.dart';

class AuthGate extends ConsumerWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authStateChangesProvider);

    return authState.when(
      data: (user) => user == null ? const LoginPage() : const HomePage(),
      loading: () => const AppLoadingView(message: 'Chargement...'),
      error: (e, _) => AppErrorView(message: e.toString()),
    );
  }
}
