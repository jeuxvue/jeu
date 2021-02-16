/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('windicss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: colors.trueGray,
      },
    },
  },
}
