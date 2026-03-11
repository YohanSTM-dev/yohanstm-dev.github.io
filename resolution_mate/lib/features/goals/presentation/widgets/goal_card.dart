import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/utils/date_utils.dart';
import '../../domain/entities/goal_entity.dart';
import '../../domain/entities/progress_log_entity.dart';
import '../controllers/goals_controller.dart';

class GoalCard extends ConsumerWidget {
  final GoalEntity goal;
  final DateTime date;
  final VoidCallback onOpen;

  const GoalCard({
    super.key,
    required this.goal,
    required this.date,
    required this.onOpen,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progressAsync =
        ref.watch(userProgressForDateProvider(goal: goal, date: date));
    final controllerState = ref.watch(goalsControllerProvider);
    final isBusy = controllerState.isLoading;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: progressAsync.when(
          data: (progress) => _GoalCardBody(
            goal: goal,
            progress: progress,
            date: date,
            isBusy: isBusy,
            onOpen: onOpen,
          ),
          loading: () => const SizedBox(
            height: 120,
            child: Center(child: CircularProgressIndicator()),
          ),
          error: (e, _) => Text(e.toString()),
        ),
      ),
    );
  }
}

class _GoalCardBody extends ConsumerWidget {
  final GoalEntity goal;
  final ProgressLogEntity? progress;
  final DateTime date;
  final bool isBusy;
  final VoidCallback onOpen;

  const _GoalCardBody({
    required this.goal,
    required this.progress,
    required this.date,
    required this.isBusy,
    required this.onOpen,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final status = progress?.status;
    final isDone = status == ProgressStatus.done;
    final isSkipped = status == ProgressStatus.skipped;
    final isOnce = goal.frequency == GoalFrequency.once;

    final statusLabel = isOnce
        ? (isDone
            ? 'Termine'
            : isSkipped
                ? 'Ignore'
                : 'A faire')
        : (isDone
            ? 'Valide'
            : isSkipped
                ? 'Ignore'
                : 'A faire');

    final statusColor = isDone
        ? Colors.green
        : isSkipped
            ? Colors.orange
            : Theme.of(context).colorScheme.primary;

    final leadingIcon = goal.type == GoalType.personal
        ? Icons.person_outline
        : Icons.groups_outlined;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor:
                  Theme.of(context).colorScheme.primaryContainer,
              foregroundColor:
                  Theme.of(context).colorScheme.onPrimaryContainer,
              child: Icon(leadingIcon, size: 18),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                goal.title,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: statusColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                statusLabel,
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                      color: statusColor,
                      fontWeight: FontWeight.w700,
                    ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Text(
          goal.description.isEmpty ? 'Aucune description.' : goal.description,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 6,
          children: [
            _InfoPill(
              icon: Icons.repeat,
              label: goal.frequency.label,
            ),
            _InfoPill(
              icon: Icons.calendar_today,
              label: AppDateUtils.formatYmd(goal.deadline),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: FilledButton(
                onPressed: isBusy
                    ? null
                    : () {
                        if (isDone) {
                          ref
                              .read(goalsControllerProvider.notifier)
                              .clearProgressStatus(
                                goal: goal,
                                date: date,
                              );
                        } else {
                          ref
                              .read(goalsControllerProvider.notifier)
                              .setProgressStatus(
                                goal: goal,
                                status: ProgressStatus.done,
                                date: date,
                              );
                        }
                      },
                child: Text(isOnce
                    ? (isDone ? 'Annuler' : 'Terminer')
                    : isDone
                        ? 'Annuler'
                        : 'Valider'),
              ),
            ),
            const SizedBox(width: 8),
            OutlinedButton(
              onPressed: isBusy
                  ? null
                  : () {
                      if (isSkipped) {
                        ref
                            .read(goalsControllerProvider.notifier)
                            .clearProgressStatus(
                              goal: goal,
                              date: date,
                            );
                      } else {
                        ref
                            .read(goalsControllerProvider.notifier)
                            .setProgressStatus(
                              goal: goal,
                              status: ProgressStatus.skipped,
                              date: date,
                            );
                      }
                    },
              child: Text(isSkipped ? 'Remettre' : 'Ignorer'),
            ),
            IconButton(
              onPressed: onOpen,
              icon: const Icon(Icons.chevron_right),
              tooltip: 'Details',
            ),
          ],
        ),
      ],
    );
  }
}

class _InfoPill extends StatelessWidget {
  final IconData icon;
  final String label;

  const _InfoPill({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14),
          const SizedBox(width: 6),
          Text(
            label,
            style: Theme.of(context).textTheme.labelMedium,
          ),
        ],
      ),
    );
  }
}
