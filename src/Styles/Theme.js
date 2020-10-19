const BOX_BORDER = "3px solid #003589";
const RADIUS = "5px";
const BACKGROUND_FILL_COLOR = "#d9b2ce";
const BACKGROUND_GRID_COLOR = "rgba(70, 41, 64, 0.3)";

const size = {
	mobile: "770px",
	tabletS: "1023px",
	tabletM: "1220px",
	tabletL: "1280px",
	laptop: "1460px",
	desktop: "1700px"
}

export default {
  mobile: `(max-width: ${size.mobile})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
  maxWidth: "935px",
  bgColor: "#f6eee2",
  bgPinkColor: "#d9b2ce",
  bgGrayColor: "#C9C9C9",
  bgLightGreyColor: "#f6f6f6",
  blue: "#003589",
  opacityBlue: "rgba(1, 54, 137, 0.1)",
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
  followBtn: `background-color: #f6f6f6;
              color: #003589;
              border: 3px solid #003589;
              box-shadow: 4px 4px 0 0 #003589;
  `,
  unfollowBtn: `background-color: #d9b2ce;
                color: #003589;
                border: 3px solid #003589;
                box-shadow: 4px 4px 0 0 #003589;
  `,
  grid: `background-color: ${BACKGROUND_FILL_COLOR};
        background-image: linear-gradient(${BACKGROUND_GRID_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BACKGROUND_GRID_COLOR} 1px, transparent 1px);
        background-size: 28px 28px;
  `
};
