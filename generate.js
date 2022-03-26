const generateGame = () => {
  const row = new Array(4).fill(0);
  const map = new Array(4).fill(row);
  map[0] = [3, 1, 1, 0];
  map[1] = [0, 1, 2, 0];
  map[2] = [0, 1, 2, 0];
  map[3] = [0, 2, 2, 3];
  return { map };
};

module.exports = generateGame;
