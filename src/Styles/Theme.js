const BOX_BORDER = "3px solid #003589";
const RADIUS = "5px";
const BACKGROUND_FILL_COLOR = "#d9b2ce";
const BACKGROUND_GRID_COLOR = "rgba(70, 41, 64, 0.6)";

export default {
  maxWidth: "935px",
  bgColor: "#f6eee2",
  bgPinkColor: "#d9b2ce",
  bgGrayColor: "#C9C9C9",
  bgLightGreyColor: "#f6f6f6",
  blue: "#003589",
  deepBlue: "#253167",
  lightBlue: "#0446E3",
  pink: "#EE719E",
  black: "#121212",
  gray: "#c9c9c9",
  deepGray: "#8e8e8e",
  box: `border: ${BOX_BORDER};
        border-radius: ${RADIUS};
        background-color: #f6f6f6;
        box-shadow: 8px 8px 0 0 #003489;
  `,
  toneBox: `border-radius: ${RADIUS};
            background-color: #f6f6f6;
            box-shadow: 8px 8px 0 0 #d9b2ce;
  `,
  grid: `background-color: ${BACKGROUND_FILL_COLOR};
         background-image:
          repeating-linear-gradient(
            to right,
            ${BACKGROUND_GRID_COLOR} 0,
            ${BACKGROUND_GRID_COLOR} 1px,
            transparent 1px,
            transparent 28px
          ),
          repeating-linear-gradient(
            to bottom,
            ${BACKGROUND_GRID_COLOR} 0,
            ${BACKGROUND_GRID_COLOR} 1px,
            transparent 1px,
            transparent 28px
          )
        ;
         background-position: 100px 0, 0 0;
         background-size: 28px;
  `
};
