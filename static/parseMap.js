const parseMap = (res) => {
  const map = document.createElement("div");
  map.classList.add("map");
  res.forEach((row, i) => {
    const hor = document.createElement("div");
    hor.classList.add("row");
    row.forEach((cell, j) => {
      const box = document.createElement("div");
      box.classList.add("box");
      switch (cell) {
        case 1:
          box.classList.add("p1");
          break;
        case 2:
          box.classList.add("p2");
          break;
        case 3:
          const token = document.createElement("div");
          token.classList.add("token");
          box.appendChild(token);
          break;
        default:
          if (
            i === 0 ||
            j === 0 ||
            i === res.length - 1 ||
            j === row.length - 1
          )
            box.classList.add("hidden");
          break;
      }
      hor.appendChild(box);
    });
    map.appendChild(hor);
  });
  root.innerHTML = map.outerHTML;
};
