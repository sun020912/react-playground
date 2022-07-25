const basicColors = [
  "Silver",
  "Gray",
  "Silver",
  "Maroon",
  "Red",
  "Purple",
  "Fuchsia",
  "Green",
  "Lime",
  "Olive",
  "Yellow",
  "Navy",
  "Blue",
  "Teal",
  "Aqua",
];

const randomColor = () =>
  basicColors[Math.floor(Math.random() * basicColors.length)];

export default randomColor;
