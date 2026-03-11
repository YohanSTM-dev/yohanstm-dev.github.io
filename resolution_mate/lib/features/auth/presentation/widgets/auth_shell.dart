import 'package:flutter/material.dart';

class AuthShell extends StatelessWidget {
  final String title;
  final String subtitle;
  final Widget child;
  final Widget? footer;
  final bool showBack;

  const AuthShell({
    super.key,
    required this.title,
    required this.subtitle,
    required this.child,
    this.footer,
    this.showBack = false,
  });

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isWide = width >= 900;
    final horizontalPadding = isWide ? 56.0 : 20.0;
    final maxWidth = isWide ? 900.0 : 520.0;

    return Scaffold(
      appBar: showBack ? AppBar() : null,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFF9F7F4), Color(0xFFEFF6FF)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(
              horizontal: horizontalPadding,
              vertical: 28,
            ),
            child: Center(
              child: ConstrainedBox(
                constraints: BoxConstraints(maxWidth: maxWidth),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'GoalMate',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      title,
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      subtitle,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                    const SizedBox(height: 20),
                    Card(
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: isWide ? 32 : 20,
                          vertical: isWide ? 28 : 20,
                        ),
                        child: child,
                      ),
                    ),
                    if (footer != null) ...[
                      const SizedBox(height: 16),
                      footer!,
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
