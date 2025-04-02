import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        treehouse: '#93B74C',  // Tree House
        leaves: '#657749',      // Leaves
        bark: '#8A6438',        // Bark
        purewhite: '#FFFFFF',   // Pure White
        burn: '#FFA743',       // Burn
        ash: '#D57A42',        // Ash
        darkgrey: '#FAFAFA',   // Dark Grey
        halfgrey: '#838589',   // Half Grey
        softgrey: '#EDEDED',   // Soft Grey
        offgrey: '#FAFAFA',    // Off Grey
        labelblue: '#EFF5FB',  // Off Blue
        labelgreen: '#EFFAF6', // Off Green
        labelred: '#FCECEF',   // Off Red
      }
    },
  },
  plugins: [],
}

export default config
