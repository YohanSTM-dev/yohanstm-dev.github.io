import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/utils/date_utils.dart';
import '../../../../core/widgets/app_error_view.dart';
import '../../../../core/widgets/app_loading_view.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../domain/entities/goal_entity.dart';
import '../controllers/goals_controller.dart';
import 'create_goal_page.dart';
import 'goal_detail_page.dart';
import '../widgets/goal_card.dart';

enum GoalFilter { personal, group }

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  GoalFilter _filter = GoalFilter.personal;

  @override
  Widget build(BuildContext context) {
    final type =
        _filter == GoalFilter.personal ? GoalType.personal : GoalType.group;
    final goalsAsync = ref.watch(goalsStreamProvider(type: type));
    final isWide = MediaQuery.of(context).size.width >= 900;
    final today = DateTime.now();

    return Scaffold(
      appBar: AppBar(
        title: const Text('GoalMate'),
        actions: [
          IconButton(
            onPressed: () {
              ref.read(authControllerProvider.notifier).signOut();
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      floatingActionButton: isWide
          ? FloatingActionButton.extended(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const CreateGoalPage()),
                );
              },
              icon: const Icon(Icons.add),
              label: const Text('Nouvel objectif'),
            )
          : FloatingActionButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const CreateGoalPage()),
                );
              },
              child: const Icon(Icons.add),
            ),
      body: Align(
        alignment: Alignment.topCenter,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 980),
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: isWide ? 32 : 16,
              vertical: 16,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Mes objectifs',
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(fontWeight: FontWeight.w700),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            AppDateUtils.formatYmd(today),
                            style: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.copyWith(
                                  color: Theme.of(context)
                                      .colorScheme
                                      .onSurfaceVariant,
                                ),
                          ),
                        ],
                      ),
                    ),
                    if (isWide)
                      FilledButton.icon(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => const CreateGoalPage(),
                            ),
                          );
                        },
                        icon: const Icon(Icons.add),
                        label: const Text('Nouvel objectif'),
                      ),
                  ],
                ),
                const SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerLeft,
                  child: SegmentedButton<GoalFilter>(
                    segments: const [
                      ButtonSegment(
                        value: GoalFilter.personal,
                        label: Text('Moi'),
                      ),
                      ButtonSegment(
                        value: GoalFilter.group,
                        label: Text('Groupe'),
                      ),
                    ],
                    selected: {_filter},
                    onSelectionChanged: (values) {
                      setState(() => _filter = values.first);
                    },
                  ),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: AnimatedSwitcher(
                    duration: const Duration(milliseconds: 250),
                    child: KeyedSubtree(
                      key: ValueKey(_filter),
                      child: goalsAsync.when(
                        data: (goals) {
                          if (goals.isEmpty) {
                            return Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(
                                    Icons.flag_outlined,
                                    size: 72,
                                    color: Theme.of(context)
                                        .colorScheme
                                        .primary
                                        .withValues(alpha: 0.5),
                                  ),
                                  const SizedBox(height: 12),
                                  const Text('Aucun objectif pour le moment.'),
                                  const SizedBox(height: 6),
                                  Text(
                                    'Cree le premier pour demarrer.',
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodySmall
                                        ?.copyWith(
                                          color: Theme.of(context)
                                              .colorScheme
                                              .onSurfaceVariant,
                                        ),
                                  ),
                                ],
                              ),
                            );
                          }

                          return ListView.separated(
                            itemCount: goals.length,
                            separatorBuilder: (context, index) =>
                                const SizedBox(height: 12),
                            itemBuilder: (context, index) {
                              final goal = goals[index];

                              return GoalCard(
                                goal: goal,
                                date: today,
                                onOpen: () {
                                  Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_) =>
                                          GoalDetailPage(goal: goal),
                                    ),
                                  );
                                },
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
