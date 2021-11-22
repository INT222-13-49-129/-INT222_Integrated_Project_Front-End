module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      dropShadow: {
        'all': '0 0 4px rgba(0, 0, 0, 0.15)',
        'r': '10px 6px 4px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        salmon: '#d9795f',
        lightsalmon: '#df9C7b',
        brightsalmon: '#fcc090',
        tomato: '#f08080',
        lightorange: '#eb9775',
        orange: '#f08734',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
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
      scale: {
        '100': '1',
        '105': '1.05',
        '110': '1.1',
        '113': '1.13',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
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
