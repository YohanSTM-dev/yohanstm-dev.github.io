import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

import 'core/theme/theme.dart';
import 'features/auth/presentation/pages/auth_gate.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GoalMate',
      debugShowCheckedModeBanner: false,
      scrollBehavior: const AppScrollBehavior(),
      theme: AppTheme.light,
      home: const AuthGate(),
    );
  }
}

class AppScrollBehavior extends MaterialScrollBehavior {
  const AppScrollBehavior();

  @override
  Set<PointerDeviceKind> get dragDevices => {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.trackpad,
      };
}
