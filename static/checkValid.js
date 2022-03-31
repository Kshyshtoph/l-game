const possibleShapes = [
  [7, 8, 9, 15],
  [8, 14, 19, 20],
  [7, 13, 14, 15],
  [7, 8, 13, 19],
  [7, 13, 19, 20],
  [7, 8, 9, 13],
  [7, 8, 14, 20],
  [9, 13, 14, 15],
];

const checkValid = (selected) => {
  return possibleShapes.some((shape) => {
    const decreaseToMatch = selected[0] - shape[0];
    selected.map((e) => e - decreaseToMatch);
    return shape.every(
      (point, index) =>
        selected[index] - decreaseToMatch === point && selected.length === 4
    );
  });
};
