export function RoomBinarySearch(start, end, vector, element) {
  var guess = Math.floor((start+end) / 2)

  if (end < start) {
    return -1
  }

  if (vector[guess].room == element) {
    return guess
  }

  if (vector[guess] < element) {
    return RoomBinarySearch(guess+1, end, vector, element)
  }

  return RoomBinarySearch(start, guess-1, vector, element)

}
