export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const darkMode = "media";
export const theme = {
  extend: {
    colors: {
      emptyInput: "#F6F6F9", // empty input background
      writingGrey: "#9499A6", // writing color grey
      main: "#006233", // the main color
      mainHover: '#004d26', // the main color hover
      greyBorder: "#E5E5E5", // grey border color
      creme: "#f8f8f8" // used in inbox list items
    },
    borderRadius: {
      10: "10px",
      20: "20px",
      30: "30px",
      40: "40px",
      50: "50%",
      60: "60px",
    },
    borderWidth: {
      1: "1px",
      2: "2px",
    },
    boxShadow: {
      // mainShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // main shadow
        mainShadow: "0px 2px 5px rgba(0, 0, 0, 0.05), 0px -2px 5px rgba(0, 0, 0, 0.05), 2px 0px 5px rgba(0, 0, 0, 0.05), -2px 0px 5px rgba(0, 0, 0, 0.05)",      hoverShadow: "0px 1px 4px rgba(0, 0, 0, 0.24)", // when hover shadow
      hardShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", // used in the main pc and mobile search bar
      smallShadow: "2px 0px 4px rgba(0, 0, 0, 0.2)", // used in boat owner card
      smallHoverShadow: "4px -1px 4px rgba(0, 0, 0, 0.2)", // used in boat owner card hover
      bottomShadow: "0 5px 7px -5px rgba(0, 0, 0, 0.2)", // shadow only from bottom
    },
     margin: {
       60: "60px",
       80: "80px",
    },
     height: {
        'svh': '100svh',
        'lvh': '100lvh',
        'dvh': '100dvh',
      },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];
