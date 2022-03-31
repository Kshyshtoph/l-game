const generateGame = () => {
  const row = new Array(6).fill(0);
  const map = new Array(6).fill(row);
  map[0] = [0, 0, 0, 0, 0, 0];
  map[1] = [0, 3, 1, 1, 0, 0];
  map[2] = [0, 0, 1, 2, 0, 0];
  map[3] = [0, 0, 1, 2, 0, 0];
  map[4] = [0, 0, 2, 2, 3, 0];
  map[5] = [0, 0, 0, 0, 0, 0];
  return map;
};

module.exports = generateGame;
