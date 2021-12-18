module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': "1600px",
        '4xl': "1700px",
        '5xl': "1800px",
        '6xl': "1900px",
        '7xl': "2000px"
      },
      colors: {
        'midnight': '#312E81',
        'bg-arrow': '#323082'
      },
      fontFamily: {
        'raleway-sf': ['Raleway', 'sans-serif'],
        'inconsolata': ['Inconsolata', 'monospace'],
        'fuzzy' : ['Fuzzy Bubbles', 'cursive', 'bold']
      },
      height: {
        '92vh': '92vh'
      }
    },
  },
  plugins: [],
}
