export default function getPositionFromRowIndexAndColIndex(
  rowIndex,
  colIndex,
  colLength,
) {
  return rowIndex * colLength + colIndex;
}
