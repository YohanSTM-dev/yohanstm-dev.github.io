import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/widgets/app_error_view.dart';
import '../../../../core/widgets/app_loading_view.dart';
import '../../../goals/domain/entities/goal_entity.dart';
import '../../../goals/presentation/controllers/goals_controller.dart';

class GroupProgressPage extends ConsumerWidget {
  final GoalEntity goal;

  const GroupProgressPage({super.key, required this.goal});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final today = DateTime.now();
    final progressAsync =
        ref.watch(groupProgressProvider(goal: goal, date: today));
    final isWide = MediaQuery.of(context).size.width >= 900;

    return Scaffold(
      appBar: AppBar(title: const Text('Progression du groupe')),
      body: Align(
        alignment: Alignment.topCenter,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 760),
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: isWide ? 32 : 16,
              vertical: 16,
            ),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: progressAsync.when(
                  data: (entries) {
                    if (entries.isEmpty) {
                      return const Center(
                        child: Text('Aucun membre dans ce groupe.'),
                      );
                    }

                    return ListView.separated(
                      itemCount: entries.length,
                      separatorBuilder: (context, index) =>
                          const SizedBox(height: 8),
                      itemBuilder: (context, index) {
                        final entry = entries[index];
                        final statusText = entry.isDone
                            ? 'Valide'
                            : entry.isSkipped
                                ? 'Ignore'
                                : 'En attente';

                        final statusIcon = entry.isDone
                            ? const Icon(Icons.check_circle,
                                color: Colors.green)
                            : entry.isSkipped
                                ? const Icon(Icons.pause_circle,
                                    color: Colors.orange)
                                : const Icon(Icons.radio_button_unchecked,
                                    color: Colors.grey);

                        return ListTile(
                          leading: CircleAvatar(
                            backgroundColor: Theme.of(context)
                                .colorScheme
                                .primaryContainer,
                            foregroundColor: Theme.of(context)
                                .colorScheme
                                .onPrimaryContainer,
                            child: Text(entry.user.displayName.isEmpty
                                ? entry.user.uid.substring(0, 1).toUpperCase()
                                : entry.user.displayName
                                    .substring(0, 1)
                                    .toUpperCase()),
                          ),
                          title: Text(entry.user.displayName.isEmpty
                              ? entry.user.uid
                              : entry.user.displayName),
                          subtitle: Text(statusText),
                          trailing: statusIcon,
                        );
                      },
                    );
                  },
                  loading: () =>
                      const AppLoadingView(message: 'Chargement...'),
                  error: (e, _) => AppErrorView(message: e.toString()),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
