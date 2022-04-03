const getAvailable = (ctx) => {
  const boxes = document.querySelectorAll(".box");

  return [...boxes].filter((el) => {
    const allPossible = ["p1", "p2"];
    index = allPossible.indexOf(`p${counter}`);
    if (ctx === "piece") allPossible.splice(index, 1);
    const pieceCondition =
      !el.classList.contains(allPossible[0]) &&
      el.children.length === 0 &&
      !el.classList.contains("hidden");
    return ctx === "piece"
      ? pieceCondition
      : pieceCondition && !el.classList.contains(allPossible[1]);
  });
};
