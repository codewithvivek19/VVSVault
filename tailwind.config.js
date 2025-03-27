/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 0.9 },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(10px, -10px)' },
          '66%': { transform: 'translate(-5px, 5px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'float-medium': {
          '0%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-8px, 8px)' },
          '66%': { transform: 'translate(4px, -4px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'float-fast': {
          '0%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(6px, 6px)' },
          '66%': { transform: 'translate(-3px, -3px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 15s ease-in-out infinite',
        'float-medium': 'float-medium 12s ease-in-out infinite',
        'float-fast': 'float-fast 9s ease-in-out infinite',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
