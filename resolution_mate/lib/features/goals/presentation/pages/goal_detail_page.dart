import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/utils/date_utils.dart';
import '../../../../core/widgets/app_loading_view.dart';
import '../../domain/entities/goal_entity.dart';
import '../../domain/entities/progress_log_entity.dart';
import '../controllers/goals_controller.dart';
import '../../../social/presentation/pages/group_progress_page.dart';

class GoalDetailPage extends ConsumerWidget {
  final GoalEntity goal;

  const GoalDetailPage({super.key, required this.goal});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen(goalsControllerProvider, (prev, next) {
      next.whenOrNull(
        error: (err, _) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(err.toString())),
          );
        },
      );
    });

    final controllerState = ref.watch(goalsControllerProvider);
    final isLoading = controllerState.isLoading;
    final isWide = MediaQuery.of(context).size.width >= 900;

    final today = DateTime.now();
    final progressAsync =
        ref.watch(userProgressForDateProvider(goal: goal, date: today));
    final periodLabel = switch (goal.frequency) {
      GoalFrequency.daily => 'Aujourd\'hui',
      GoalFrequency.weekly => 'Cette semaine',
      GoalFrequency.once => 'Avancement',
    };
    final checkLabel = switch (goal.frequency) {
      GoalFrequency.daily => 'Objectif valide aujourd\'hui',
      GoalFrequency.weekly => 'Objectif valide cette semaine',
      GoalFrequency.once => 'Objectif termine',
    };
    final skipStatusLabel = switch (goal.frequency) {
      GoalFrequency.daily => 'Statut: ignore aujourd\'hui',
      GoalFrequency.weekly => 'Statut: ignore cette semaine',
      GoalFrequency.once => 'Statut: ignore',
    };

    return Scaffold(
      appBar: AppBar(title: Text(goal.title)),
      body: Stack(
        children: [
          Align(
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
                    child: ListView(
                      shrinkWrap: true,
                      children: [
                        Text(
                          goal.description.isEmpty
                              ? 'Aucune description.'
                              : goal.description,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 16),
                        Wrap(
                          spacing: 12,
                          runSpacing: 8,
                          children: [
                            _InfoChip(
                              icon: Icons.flag_outlined,
                              label: goal.type.label,
                            ),
                            _InfoChip(
                              icon: Icons.repeat,
                              label: goal.frequency.label,
                            ),
                            _InfoChip(
                              icon: Icons.calendar_today,
                              label: AppDateUtils.formatYmd(goal.deadline),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Text(
                          periodLabel,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 8),
                        progressAsync.when(
                          data: (progress) {
                            final status = progress?.status;
                            final isDone = status == ProgressStatus.done;
                            final isSkipped = status == ProgressStatus.skipped;

                            return Column(
                              children: [
                                CheckboxListTile(
                                  value: isDone,
                                  title: Text(checkLabel),
                                  controlAffinity:
                                      ListTileControlAffinity.leading,
                                  onChanged: isLoading
                                      ? null
                                      : (value) {
                                          if (value == true) {
                                            ref
                                                .read(goalsControllerProvider
                                                    .notifier)
                                                .setProgressStatus(
                                                  goal: goal,
                                                  status: ProgressStatus.done,
                                                  date: today,
                                                );
                                          } else {
                                            ref
                                                .read(goalsControllerProvider
                                                    .notifier)
                                                .clearProgressStatus(
                                                  goal: goal,
                                                  date: today,
                                                );
                                          }
                                        },
                                ),
                                if (isSkipped)
                                  Align(
                                    alignment: Alignment.centerLeft,
                                    child: Text(skipStatusLabel),
                                  ),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: TextButton.icon(
                                    onPressed: isLoading
                                        ? null
                                        : () {
                                            ref
                                                .read(goalsControllerProvider
                                                    .notifier)
                                                .setProgressStatus(
                                                  goal: goal,
                                                  status: ProgressStatus.skipped,
                                                  date: today,
                                                );
                                          },
                                    icon: const Icon(Icons.pause_circle_outline),
                                    label: const Text('Marquer comme ignore'),
                                  ),
                                ),
                              ],
                            );
                          },
                          loading: () =>
                              const Center(child: CircularProgressIndicator()),
                          error: (e, _) => Text(e.toString()),
                        ),
                        const SizedBox(height: 16),
                        if (goal.type == GoalType.group)
                          FilledButton.icon(
                            onPressed: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (_) => GroupProgressPage(goal: goal),
                                ),
                              );
                            },
                            icon: const Icon(Icons.groups_outlined),
                            label: const Text('Voir le groupe'),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          if (isLoading) const AppLoadingView(message: 'Mise a jour...'),
        ],
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;

  const _InfoChip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Chip(
      avatar: Icon(icon, size: 18),
      label: Text(label),
      backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
      labelStyle: Theme.of(context).textTheme.labelMedium,
      padding: const EdgeInsets.symmetric(horizontal: 8),
    );
  }
}
