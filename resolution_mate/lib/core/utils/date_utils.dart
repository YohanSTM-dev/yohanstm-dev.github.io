class AppDateUtils {
  static DateTime startOfDay(DateTime date) {
    return DateTime(date.year, date.month, date.day);
  }

  static DateTime nextDay(DateTime date) {
    return startOfDay(date).add(const Duration(days: 1));
  }

  static DateTime startOfWeek(DateTime date) {
    final day = startOfDay(date);
    return day.subtract(Duration(days: day.weekday - DateTime.monday));
  }

  static DateTime nextWeek(DateTime date) {
    return startOfWeek(date).add(const Duration(days: 7));
  }

  static String dateKey(DateTime date) {
    final d = startOfDay(date);
    return '${d.year}${_two(d.month)}${_two(d.day)}';
  }

  static String progressLogId(String userId, DateTime date) {
    return '${userId}_${dateKey(date)}';
  }

  static String formatYmd(DateTime date) {
    final d = date;
    return '${d.year}-${_two(d.month)}-${_two(d.day)}';
  }

  static String _two(int v) => v.toString().padLeft(2, '0');
}
