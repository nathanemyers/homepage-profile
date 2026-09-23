import Gradient from "javascript-color-gradient";

const BASE_COLOR = "#1f6b5c";

const gradient = new Gradient()
  .setColorGradient(BASE_COLOR, '#ffffff')
  .setMidpoint(10);

const colors = gradient.getColors();

export const CELL_COLOR_NEW = colors[4];
export const CELL_COLOR_MID = colors[3];
export const CELL_COLOR_OLD = colors[2];
export const BACKGROUND_COLOR = colors[1]
