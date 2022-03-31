const changeMap = ({ counter, selected }, map) => {
  map.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row === counter) map[i][j] = 0;
      if (selected.map(({ index }) => index).includes(i * 6 + j))
        map[i][j] = counter;
    });
  });
  JSON.stringify(map), selected, counter;
};

module.exports = changeMap;
