import Gradient from "javascript-color-gradient";

const BASE_COLOR = "#1f6b5c";

const gradient = new Gradient()
  .setColorGradient(BASE_COLOR, "#6fe7c0", "#f4fff9")
  .setMidpoint(5);

const colors = gradient.getColors();

export const CELL_COLOR_NEW = colors[0];
export const CELL_COLOR_MID = colors[2];
export const CELL_COLOR_OLD = colors[4];
