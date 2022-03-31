const getAvailable = (ctx) => {
  const boxes = document.querySelectorAll(".box");

  return [...boxes].filter((el) => {
    if (counter > 2) return false;
    const allPossible = ["p1", "p2"];
    index = allPossible.findIndex((el) => el === `p${counter}`);
    if (ctx === "piece") allPossible.splice(index, 1);
    const pieceCondition =
      !el.classList.contains(allPossible[0]) && el.children.length === 0;
    return ctx === "piece"
      ? pieceCondition
      : pieceCondition && !el.classList.contains(allPossible[1]);
  });
};
