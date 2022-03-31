const moveToken = (source, target, map) => {
  if (!source || !target) return;
  map[Math.floor(target / 6)][target % 6] = 3;
  map[Math.floor(source / 6)][source % 6] = 0;
};

module.exports = moveToken;
