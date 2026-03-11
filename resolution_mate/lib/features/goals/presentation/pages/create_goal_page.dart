import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/utils/date_utils.dart';
import '../../../../core/widgets/app_loading_view.dart';
import '../../domain/entities/goal_entity.dart';
import '../controllers/goals_controller.dart';

class CreateGoalPage extends ConsumerStatefulWidget {
  const CreateGoalPage({super.key});

  @override
  ConsumerState<CreateGoalPage> createState() => _CreateGoalPageState();
}

class _CreateGoalPageState extends ConsumerState<CreateGoalPage> {
  final _title = TextEditingController();
  final _description = TextEditingController();
  final _inviteEmails = TextEditingController();

  GoalType _type = GoalType.personal;
  GoalFrequency _frequency = GoalFrequency.daily;
  DateTime _deadline = DateTime.now();

  @override
  void dispose() {
    _title.dispose();
    _description.dispose();
    _inviteEmails.dispose();
    super.dispose();
  }

  List<String> _parseEmails(String raw) {
    return raw
        .split(RegExp(r'[\s,;]+'))
        .map((e) => e.trim().toLowerCase())
        .where((e) => e.contains('@') && e.contains('.'))
        .toSet()
        .toList();
  }

  @override
  Widget build(BuildContext context) {
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

    return Scaffold(
      appBar: AppBar(title: const Text('Creer un objectif')),
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
                        TextField(
                          controller: _title,
                          decoration: const InputDecoration(labelText: 'Titre'),
                        ),
                        const SizedBox(height: 12),
                        TextField(
                          controller: _description,
                          decoration:
                              const InputDecoration(labelText: 'Description'),
                          maxLines: 3,
                        ),
                        const SizedBox(height: 16),
                        SegmentedButton<GoalType>(
                          segments: const [
                            ButtonSegment(
                              value: GoalType.personal,
                              label: Text('Personnel'),
                            ),
                            ButtonSegment(
                              value: GoalType.group,
                              label: Text('Groupe'),
                            ),
                          ],
                          selected: {_type},
                          onSelectionChanged: (values) {
                            setState(() => _type = values.first);
                          },
                        ),
                        const SizedBox(height: 16),
                        DropdownButtonFormField<GoalFrequency>(
                          initialValue: _frequency,
                          items: GoalFrequency.values
                              .map(
                                (f) => DropdownMenuItem(
                                  value: f,
                                  child: Text(f.label),
                                ),
                              )
                              .toList(),
                          onChanged: (value) {
                            if (value != null) {
                              setState(() => _frequency = value);
                            }
                          },
                          decoration:
                              const InputDecoration(labelText: 'Frequence'),
                        ),
                        const SizedBox(height: 16),
                        ListTile(
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Date limite'),
                          subtitle: Text(AppDateUtils.formatYmd(_deadline)),
                          trailing: const Icon(Icons.calendar_month),
                          onTap: () async {
                            final picked = await showDatePicker(
                              context: context,
                              initialDate: _deadline,
                              firstDate: DateTime.now(),
                              lastDate:
                                  DateTime.now().add(const Duration(days: 3650)),
                            );
                            if (picked != null) {
                              setState(() => _deadline = picked);
                            }
                          },
                        ),
                        if (_type == GoalType.group) ...[
                          const SizedBox(height: 12),
                          TextField(
                            controller: _inviteEmails,
                            decoration: const InputDecoration(
                              labelText: 'Inviter par email',
                              hintText: 'ex: a@b.com, c@d.com',
                            ),
                            maxLines: 2,
                          ),
                        ],
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          child: FilledButton(
                            onPressed: isLoading
                                ? null
                                : () async {
                                    if (_title.text.trim().isEmpty) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                          content:
                                              Text('Le titre est obligatoire.'),
                                        ),
                                      );
                                      return;
                                    }

                                    await ref
                                        .read(goalsControllerProvider.notifier)
                                        .createGoal(
                                          title: _title.text,
                                          description: _description.text,
                                          type: _type,
                                          frequency: _frequency,
                                          deadline: _deadline,
                                          inviteEmails:
                                              _parseEmails(_inviteEmails.text),
                                        );

                                    if (context.mounted &&
                                        !ref
                                            .read(goalsControllerProvider)
                                            .hasError) {
                                      Navigator.of(context).pop();
                                    }
                                  },
                            child: const Text('Creer'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          if (isLoading) const AppLoadingView(message: 'Creation...'),
        ],
      ),
    );
  }
}
