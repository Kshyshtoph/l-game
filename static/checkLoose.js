const checkLoose = (verbose = false) => {
  const all = [...document.querySelectorAll(".box")];
  const available = getAvailable("piece");

  const loose = !available.some((box) => {
    const i = all.indexOf(box);
    return possibleShapes.some((shape) => {
      const valid = shape.every((point) => {
        const increaseToMatch = i - shape[0];
        return (
          available.includes(all[point + increaseToMatch]) &&
          JSON.stringify(shape.map((p) => p + increaseToMatch)) !==
            JSON.stringify(prev)
        );
      });
      if (verbose)
        console.log({
          i,
          valid,
          shape: shape.map((point) => point + i - shape[0]),
        });

      return valid;
    });
  });
  if (verbose) console.log({ loose });
  return loose;
};
