module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        salmon: '#d9795f',
        lightsalmon: '#df9C7b',
        brightsalmon: '#fcc090',
        tomato: '#f08080',
        lightorange: '#eb9775',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '256': '64rem',
        '272': '68rem',
        '288': '72rem',
        '304': '76rem',
        '320': '80rem',
        '336': '84rem',
        '352': '88rem',
        '368': '92rem',
      },
      animation: {
        bouncex: 'bouncex 1s infinite',
        bouncexl: 'bouncexl 1s infinite'
      },
      keyframes: {
        bouncex: {
          '100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '0%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        bouncexl: {
          '100%': {
            transform: 'translateX(0%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '0%': {
            transform: 'translateX(0%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    }
  },
  plugins: [],
}
