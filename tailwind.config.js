/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15d178",
        primary2: "#03a47b",
        accent: "#DA6317",
        dark: "#1a1a1a",
        accent2: "#FDF7EA"
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "&:hover > *");
    }
  ]
};
