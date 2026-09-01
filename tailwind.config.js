/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0037B0',    // Deep Cobalt Blue
          'primary-dark': '#002270',
          'primary-light': '#EFF6FF',
          price: '#DE2626',      // Automotive Red (Webmotors)
          'price-light': '#FEF2F2',
          accent: '#16A34A',     // Trust Green (Localiza)
          'accent-light': '#DCFCE7',
        },
        surface: {
          canvas: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#F1F5F9',
        },
        typography: {
          heading: '#0F172A',
          body: '#334155',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
