module.exports = {
  theme: {
    extend: {
      spacing: {
        '80': '20rem',
        '108': '27rem',
      },
      borderWidth: {
        '14': '14px',
      },
      container: {
        padding: '1rem'
      },
      colors: {
        background: {
          primary: 'var(--bg-background-primary)',
          secondary: 'var(--bg-background-secondary)',
          tertiary: 'var(--bg-background-tertiary)',

          form: 'var(--bg-background-form)',
          border: 'var(--color-ui-border)'
        },
        primary: 'var(--text-primary)',
        copy: {
          primary: 'var(--text-copy-primary)',
          secondary: 'var(--text-copy-secondary)',
        },
        'border-color': {
          primary: 'var(--border-border-color-primary)',
        },
        transparent: 'transparent',
        black: '#111',
      },
      fontFamily: {
        sans: [
          'Nunito Sans',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ]
      }
    }
  },
  variants: {
    // Some useful comment
  },
  plugins: [
    // Some useful comment
  ],
  purge: false
}
