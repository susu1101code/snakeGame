export default function randomPosition(min = 0, max = 99) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
