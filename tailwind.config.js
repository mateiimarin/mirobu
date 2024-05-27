import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
          50: '#eef7ff',
          100: '#d8ecff',
          200: '#b9deff',
          300: '#89cbff',
          400: '#52aeff',
          500: '#0f67fd',
          600: '#0c53e9',
          700: '#1143bc',
          800: '#143c94',
          900: '#11265a',
      },
      
        'ui': {
          50:  '#F2F4F4',
          100: '#EDF0F0',
          150: '#E7EBEB',
          200: '#E2E7E7',
          250: '#DCE2E2',
          300: '#D7DEDE',
          400: '#E6EAEA',
          500: '#E0E5E5',
          600: '#DAE0E0',
          700: '#D4DBDB',
          800: '#C5CECE',
          900: '#AEBBBB',
        }
      
      },
      fontFamily: {
        'title': ['Ubuntu', 'serif'],
        'main': ['Rubik', 'sans-serif'],
        'sec': ['Roboto', 'sans-serif'],
      }
    },
  },
}