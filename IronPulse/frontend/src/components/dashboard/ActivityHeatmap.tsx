import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../ui/Card';
import { format, subDays, startOfWeek, addDays, isSameDay } from 'date-fns';

interface ActivityData {
  activity_date: string;
  intensity_level: number;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  weeks?: number;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  weeks = 12,
}) => {
  const today = new Date();
  const startDate = subDays(today, weeks * 7);

  // Generate grid data
  const generateGrid = () => {
    const grid: { date: Date; intensity: number }[][] = [];
    let currentDate = startOfWeek(startDate, { weekStartsOn: 0 });

    while (currentDate <= today) {
      const week: { date: Date; intensity: number }[] = [];
      
      for (let i = 0; i < 7; i++) {
        const dayDate = addDays(currentDate, i);
        const activity = data.find((a) =>
          isSameDay(new Date(a.activity_date), dayDate)
        );
        week.push({
          date: dayDate,
          intensity: activity?.intensity_level || 0,
        });
      }
      
      grid.push(week);
      currentDate = addDays(currentDate, 7);
    }

    return grid;
  };

  const getIntensityColor = (intensity: number) => {
    const colors = [
      '#1E293B', // 0 - no activity
      '#064E3B', // 1 - low
      '#047857', // 2
      '#059669', // 3
      '#10B981', // 4
      '#34D399', // 5 - high
    ];
    return colors[Math.min(intensity, 5)];
  };

  const grid = generateGrid();
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Activité</Text>
        <Text style={styles.subtitle}>
          {data.length} jours actifs sur {weeks} semaines
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Day labels */}
          <View style={styles.dayLabels}>
            <View style={styles.dayLabelSpacer} />
            {days.map((day, i) => (
              <Text key={i} style={styles.dayLabel}>
                {i % 2 === 1 ? day : ''}
              </Text>
            ))}
          </View>

          {/* Grid */}
          <View style={styles.gridContainer}>
            {grid.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekColumn}>
                {week.map((day, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      { backgroundColor: getIntensityColor(day.intensity) },
                      day.date > today && styles.futureCell,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>Moins</Text>
        {[0, 1, 2, 3, 4, 5].map((level) => (
          <View
            key={level}
            style={[
              styles.legendCell,
              { backgroundColor: getIntensityColor(level) },
            ]}
          />
        ))}
        <Text style={styles.legendText}>Plus</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },
  dayLabels: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayLabelSpacer: {
    width: 0,
  },
  dayLabel: {
    width: 12,
    height: 12,
    color: '#64748B',
    fontSize: 9,
    textAlign: 'center',
    marginVertical: 1,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  weekColumn: {
    marginRight: 3,
  },
  cell: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginVertical: 1,
  },
  futureCell: {
    opacity: 0.3,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 4,
  },
  legendText: {
    color: '#64748B',
    fontSize: 11,
    marginHorizontal: 4,
  },
  legendCell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
