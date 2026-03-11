import 'dart:math';

List<List<T>> chunkList<T>(List<T> items, int size) {
  final result = <List<T>>[];
  for (var i = 0; i < items.length; i += size) {
    result.add(items.sublist(i, min(i + size, items.length)));
  }
  return result;
}
