export const randomColor = () => {
  const num = Math.floor(Math.random() * 11);
  switch (true) {
    case num < 2:
      return "red";
    case num >= 2 && num < 4:
      return "blue";
    case num >= 4 && num < 6:
      return "green";
    case num >= 6 && num < 8:
      return "yellow";
    case num >= 8:
      return "magenta";
    default:
      return "error";
  }
};

export const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;
